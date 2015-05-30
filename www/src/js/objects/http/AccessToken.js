export default [ 'http/Token', function( Token ) {
  return class AccessToken extends Token {
    get claims() {
      return this.body;
    }
  };
}];
