import angular from 'angular';
import _ from 'lodash';
import jQuery from 'jQuery';
import path from '@stephenbunch/path';
import matchMedia from 'matchMedia';
import URI from 'URIjs';
import event from '@stephenbunch/event';
import pathToRegexp from 'path-to-regexp';
import moment from 'moment';

var app = angular.module( 'helpfulsam', [] );

app.constant( 'matchMedia', matchMedia );
app.constant( 'fetch', fetch );
app.constant( '$', jQuery );
app.constant( '_', _ );
app.constant( 'path', path );
app.constant( 'URI', URI );
app.constant( '@event', event );
app.constant( 'pathToRegexp', pathToRegexp );
app.constant( 'moment', moment );
app.constant( 'config', {
  apiServer: '/api'
});

var modules = require( './**/*.js', { hash: 'path' } );
var groups = Object.keys( modules ).reduce( ( groups, path ) => {
  if ( modules[ path ] ) {
    for ( let name in groups ) {
      if ( path.indexOf( name + '/' ) === 0 ) {
        groups[ name ][ path.substr( name.length + 1 ) ] = modules[ path ];
        break;
      }
    }
  }
  return groups;
}, {
  components: {},
  config: {},
  controllers: {},
  directives: {},
  filters: {},
  objects: {},
  run: {},
  services: {},
});

modules.registerComponents( app, groups.components );

for ( let name in groups.config ) {
  app.config( groups.config[ name ] );
}

for ( let name in groups.controllers ) {
  app.controller( name, groups.controllers[ name ] );
}

for ( let name in groups.directives ) {
  app.directive( name.split( '/' ).slice( -1 ), groups.directives[ name ] );
}

for ( let name in groups.filters ) {
  app.filter( name, groups.filters[ name ] );
}

for ( let name in groups.objects ) {
  app.factory( name, groups.objects[ name ] );
}

for ( let name in groups.run ) {
  app.run( groups.run[ name ] );
}

for ( let name in groups.services ) {
  app.factory( name, groups.services[ name ] );
}
