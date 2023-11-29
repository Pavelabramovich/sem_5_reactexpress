function errorHandler(err) {
  const isDev = (process.env.NODE_ENV || 'development') === 'development';
  
  const message = err.message;
  const status = (isDev && err.status) ? err.status : 500;
  const stack = isDev ? err.stack : null;

  return {message, status, stack}
}

module.exports = errorHandler;