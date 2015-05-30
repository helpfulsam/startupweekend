export default [ 'http/Token', function( Token ) {
  return class RefreshToken extends Token {
    constructor( value ) {
      super( value );
      this.refreshUrl = this.body.uri;
    }
  };
}];
