import _ from 'lodash';

export default function registerComponents( app, components ) {
  components = Object.keys( components ).map( function( path ) {
    var tagName = _.last( path.split( '/' ) );
    tagName = tagName[0].toLowerCase() + tagName.substr( 1 );
    return {
      name: path,
      tagName: tagName,
      factory: components[ path ]
    };
  });

  components.forEach( function( component ) {
    app.factory( component.name, component.factory );
    app.directive( component.tagName, [
      '$parse', '$injector', component.name,
    function( $parse, $injector, componentClass ) {
      return {
        restrict: 'E',
        priority: componentClass.$priority || 0,
        terminal: componentClass.$terminal || false,
        link: function( scope, element, attrs ) {
          var make = makeComponent.bind( undefined, $parse, $injector, scope, element, attrs );
          if ( typeof componentClass.then === 'function' ) {
            componentClass.then( make );
          } else {
            make( componentClass );
          }
        }
      };
    }]);
  });
};

/**
 * @param {Function} $parse
 * @param {$injector} $injector
 * @param {$rootScope.Scope} scope
 * @param {jQuery} element
 * @param {$compile.directive.Attributes} attrs
 * @param {Function} Component
 */
function makeComponent( $parse, $injector, scope, element, attrs, Component ) {
  var component = new Component( element, scope );
  var plugins = makePluginsForComponent( $injector, attrs, component );
  var disposed;

  var binds = [];
  var bindProperty = bindPropertyExpression.bind( undefined, $parse, scope );
  var bindEvent = bindEventExpression.bind( undefined, $parse, scope );
  Object.keys( attrs.$attr ).forEach( function( attr ) {
    var prop = propertyFromAttribute.bind( undefined, component, plugins, attrs.$attr[ attr ] );
    if ( /^\[.+\]$/.test( attr ) ) {
      binds.push( bindProperty( attrs[ attr ], prop().set ) );
    } else if ( /^\(.+\)$/.test( attr ) ) {
      binds.push( bindEvent( attrs[ attr ], prop().get() ) );
    } else {
      prop().set( attrs[ attr ] );
    }
  });

  scope.$on( '$destroy', function() {
    if ( disposed ) {
      return;
    }
    disposed = true;

    binds.forEach( function( unbind ) {
      unbind();
    });
    binds = null;

    Object.keys( plugins ).forEach( function( name ) {
      var plugin = plugins[ name ];
      if ( typeof plugin.dispose === 'function' ) {
        plugin.dispose();
      }
    });
    plugins = null;

    if ( typeof component.dispose === 'function' ) {
      component.dispose();
    }
    component = null;
  });

  component.plugins = plugins;

  if ( attrs.name ) {
    $parse( attrs.name ).assign( scope, component );
  }
}

/**
 * @param {$injector} $injector
 * @param {$compile.directive.Attributes} attrs
 * @param {*} component
 * @returns {Object.<String, *>}
 */
function makePluginsForComponent( $injector, attrs, component ) {
  var plugins = {};
  if ( attrs.plugins ) {
    attrs.plugins.split( /,\s */ ).forEach( function( pluginName ) {
      pluginName = pluginName.trim();
      var Plugin = $injector.get( pluginName );
      plugins[ _.camelCase( _.last( pluginName.split( '/' ) ) ) ] = new Plugin( component );
    });
  }
  return plugins;
}

/**
 * @param {*} component
 * @param {Object.<String, *>} plugins
 * @param {String} attr
 */
function propertyFromAttribute( component, plugins, attr ) {
  var prop;
  if ( /^(\[.+\]|\(.+\))$/.test( attr ) ) {
    prop = attr.substr( 1, attr.length - 2 );
  } else {
    prop = attr;
  }
  var pluginName;
  if ( prop.indexOf( '--' ) > -1 ) {
    [ pluginName, prop ] = prop.split( '--' );
  }
  prop = _.camelCase( prop );
  pluginName = _.camelCase( pluginName );
  return {
    get() {
      if ( pluginName ) {
        return plugins[ pluginName ][ prop ];
      } else {
        return component[ prop ];
      }
    },

    set( value ) {
      if ( pluginName ) {
        plugins[ pluginName ][ prop ] = value;
      } else {
        component[ prop ] = value;
      }
    }
  };
}

/**
 * @param {Function} $parse
 * @param {$rootScope.Scope} scope
 * @param {String} expression
 * @param {Function} set
 * @returns {Function}
 */
function bindPropertyExpression( $parse, scope, expression, set ) {
  var unwatch = scope.$watch( expression, set );
  set( $parse( expression )( scope ) );
  return unwatch;
}

/**
 * @param {Function} $parse
 * @param {$rootScope.Scope} scope
 * @param {String} expression
 * @param {Event} event
 * @returns {Function}
 */
function bindEventExpression( $parse, scope, expression, event ) {
  var listener = $parse( expression ).bind( undefined, scope );
  event.addListener( listener );
  return function() {
    event.removeListener( listener );
  };
}
