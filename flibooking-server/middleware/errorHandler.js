const errorHandler = (err, req, res, next) => {
    console.error(`[ERROR] ${err.message}`);
    res.status(err.statusCode || 500).json({
      error: err.message || 'Something went wrong',
    });
  };
  
  module.exports = errorHandler;
  