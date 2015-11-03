'use strict';

var models = require('../models/'),
    bcrypt = require('bcryptjs'),
    logger = require('winston');

var user = {
  new: function(req, res) {
    var attrs = _.pick(
      req.body,
      'email','name',
      'known_as'
    );
    console.log(attrs);
    models.User.create(attrs).then(function(user) {
      res.status(200).json(user);
    }).catch(function(err) {
      logger.error(err);
      res.status(500).json(err);
    });
  },

  index: function(req, res) {
    models.User.findById(req.params.id).then(function(user) {
      if(user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({message: "User does not exist"});
      }
    }).catch(function(err) {
      logger.error(err);
      res.status(500).json(err);
    });
  },
  
  update: function(req, res) {
    models.User.findById(req.params.id).then(function(user) {
      if(user) {
        user.update(req.body).then(function(user) {
          res.status(200).json(user);
        }).catch(function(err) {
          res.status(500).json(err.original.detail);
        });
      } else {
        res.status(404).json({
          message: 'User does not exist.'
        });
      }
    }).catch(function(err) {
      logger.error(err);
      res.status(500).json(err);
    });

  }
};

module.exports = user;