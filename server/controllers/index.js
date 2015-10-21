'use strict';

var users        = require('../controllers/users.controller'),
    nominations  = require('../controllers/nominations.controller'),
    comments     = require('../controllers/comments.controller');

module.exports = function (app) {
  app.post('/api/v1/users',  users.new);
  app.get('/api/v1/users',  users.index);
  app.get('/api/v1/users/:id',  users.update);

  app.post('/api/v1/nominations',  nominations.new);
  app.get('/api/v1/nominations',  nominations.index);
  app.get('/api/v1/nominations/:id',  nominations.show);
  app.put('/api/v1/nominations/:id',  nominations.update);
  app.delete('/api/v1/nominations/:id',  nominations.delete);

  app.post('/api/v1/comments',  comments.new);
  app.get('/api/v1/comments/:id',  comments.index);
  app.put('/api/v1/comments/:id',  comments.edit);
  app.delete('/api/v1/comments/:id',  comments.delete);

  app.get('/', function(req, res) {
    res.sendFile('index.html', {root: './public/views'});
  });
};
