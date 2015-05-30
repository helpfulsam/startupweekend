export default [
  '@bind', '$templateRequest', '$compile', '@event', '$rootScope',
  '$immediate', 'path',
function(
  bind, $templateRequest, $compile, event, $rootScope, $immediate, path
) {

  var views = new Map();

  return class View {
    constructor( element ) {
      this._template = null;
      this._pending = 0;
      this._disposed = false;

      this.element = element;
      views.set( this.element[0], this );

      this.src = null;
      this.scope = null;
      this.parent = views.get( this.element.parents( 'view' ).first()[0] ) || null;

      path( 'src' ).watch( this, this._src_didChange );
    }

    @event beforeLoad
    @event afterLoad
    @event beforeEnter
    @event afterEnter
    @event beforeLeave
    @event afterLeave

    dispose() {
      views.delete( this.element[0] );
      this._disposed = true;
    }

    _reset() {
      this._pending = 1;
      if ( this.parent )  {
        this.parent._pending++;
      }
    }

    _finish() {
      if ( --this.pending === 0 ) {
        this._afterLoad.raise();
        this.element.triggerHandler( 'load' );
        if ( this.parent ) {
          this.parent.set();
        }
      }
    }

    _isTemplateInViewHierarchy( template ) {
      var parent = this.parent;
      while ( parent ) {
        if ( parent.template === template ) {
          return true;
        }
        parent = parent.parent;
      }
      return false;
    }

    @bind _src_didChange() {
      this._reset();
      this._beforeLoad.raise();
      $templateRequest( this.src, true ).then( html => {
        $immediate( () => {
          if ( !this._disposed && !this._isTemplateInViewHierarchy( html ) ) {
            this._template = html;

            if ( this.scope !== null ) {
              this._beforeLeave.raise();
              this.scope.$destroy();
              this.element.contents().remove();
              this._afterLeave.raise();
            }

            this._beforeEnter.raise();
            this.scope = $rootScope.$new( true );
            var container = angular.element( '<div>' ).html( html );
            $compile( container.contents().appendTo( this.element ) )( this.scope );
            this.scope.$apply();
            this._afterEnter.raise();
          }
          this._finish();
        });
      });
    }
  };
}];
