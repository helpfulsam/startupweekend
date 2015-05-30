export default [ function() {
  return class HttpError extends Error {
    constructor( status, message ) {
      super();
      this.name = 'HttpError';
      this.statusCode = status;
      this.message = message;
    }
  };
}];
