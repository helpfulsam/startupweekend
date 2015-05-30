/*if ( !Object.getOwnPropertyDescriptor( Response.prototype, 'ok' ) ) {

  Object.defineProperty( Response.prototype, 'ok', {
    get() {
      return this.status >= 200 && this.status < 300;
    }
  });
}

*/