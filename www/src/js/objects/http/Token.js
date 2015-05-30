export default [ 'moment', function( moment ) {
  return class Token {
    /**
     * @param {String} value
     */
    constructor( value ) {
      this.body = JSON.parse( atob( value.split( '.' )[1] ) );
      this.value = value;
      this.expiresAt = this.body.exp && moment.unix( this.body.exp ) || null;
    }
  };
}];
