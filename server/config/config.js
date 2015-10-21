'use strict';

var development = {
  database: {
    url: 'postgres://localhost:5432/todo',
    port: '5432',
    host: 'localhost'
  },
};

var production = {
  database: {
    url: process.env.DATABASE_URL,
    port: process.env.DATABASE_PORT,
    host: process.env.DATABASE_HOST
  }
};

var config = {
  development: development,
  production: production
};

module.exports = config;
