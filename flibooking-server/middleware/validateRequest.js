const { validationResult } = require('express-validator');

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const uniqueErrors = {};

    errors.array().map(error => {
      if (!uniqueErrors[error.path]) {
        uniqueErrors[error.path] = {
          field: error.path,
          message: error.msg
        };
      }
    })

    return res.status(400).json({
      errors: Object.values(uniqueErrors),
    });
  }
  next();
};

module.exports = validateRequest;
