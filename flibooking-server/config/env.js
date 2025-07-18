const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  port: process.env.PORT || 5500,
  env: process.env.NODE_ENV || 'development',
};