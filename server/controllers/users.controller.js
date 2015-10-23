'use strict';

var models = require('../models/'),
    logger = require('winston');

var user = {
  new: function(req, res) {
    console.log('got this',req.body);
    res.json({name: 'this got here'});
  },

  index: function(req, res) {

  },
  
  update: function(req, res) {

  }
};

module.exports = user;