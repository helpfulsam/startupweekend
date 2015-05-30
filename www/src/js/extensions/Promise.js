Promise.prototype.finally = function( callback ) {
  return this.then( result => {
    callback();
    return result;
  }).catch( err => {
    callback();
    throw err;
  });
};
