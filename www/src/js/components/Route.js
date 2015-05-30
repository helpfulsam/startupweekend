export default [
  '$compile', '$router', '@terminal', '@priority', '@bind', 'http/RouteParser',
  '$', 'path',
function( $compile, $router, terminal, priority, bind, RouteParser, $, path ) {
  return (
    @terminal( true )
    @priority( -1 )
    class Route {
      constructor( element, scope ) {
        this._element = element;
        this._scope = scope;
        this._params = {};
        this._active = false;
        this._viewScope = null;
        this._contents = this._element.contents().remove();
        this._viewContents = null;
        this._lastUrl = null;

        this.path = null;
        this.view = null;

        path( 'path' ).watch( this, this._path_didChange );
        path( 'view' ).watch( this, this._view_didChange );
        $router.onNavigate += this._router_onNavigate;
      }

      get params() {
        return this._params;
      }

      dispose() {
        $router.onNavigate -= this._router_onNavigate;
      }

      _activate() {
        if ( !this._active ) {
          this._active = true;
          this._viewScope = this._scope.$new();
          $compile( ( this._viewContents || this._contents ).clone().appendTo( this._element ) )( this._viewScope );
        }
      }

      _deactivate() {
        if ( this._active ) {
          this._active = false;
          this._viewScope.$destroy();
          this._element.contents().remove();
        }
      }

      @bind _path_didChange() {
        var path = this.path;
        if ( !/^\//.test( path ) ) {
          var base = $router.path;
          if ( !/\/$/.test( base ) ) {
            base += '/';
          }
          path = base + path;
        }

        this._routeParser = new RouteParser( path );
        this._router_onNavigate();
      }

      @bind _view_didChange() {
        if ( this.view ) {
          this._viewContents = $( `<view [src]="'${ this.view }'"></view>` );
        } else {
          this._viewContents = null;
        }
        if ( this._active ) {
          this._deactivate();
          this._activate();
        }
      }

      @bind _router_onNavigate() {
        var url = $router.url;
        if ( url !== this._lastUrl ) {
          this._lastUrl = url;
          this._params = {};
          if ( this._routeParser.match( $router.path, this._params ) ) {
            this._activate();
          } else {
            this._params = {};
            this._deactivate();
          }
        }
      }
    }
  );
}];
