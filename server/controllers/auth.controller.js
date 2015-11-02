'use strict';

var models   = require('../models/'),
    logger   = require('winston'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

var auth = {
    login: function(req, res, next) {
      // ask passport to authenticate
      passport.authenticate('local', function(err, user, info) {
        if (err) {
          // if error happens
          return next(err);
        }
        
        if (!user) {
          // if authentication fail, get the error message that we set
          // from previous (info.message) step, assign it into to
          // req.session and redirect to the login page again to display
          req.session.messages = info.message;
          return res.redirect('/login');
        }

        // if everything's OK
        req.logIn(user, function(err) {
          if (err) {
            req.session.messages = "Error";
            return next(err);
          }

          // set the message
          req.session.messages = "Login successfully";
          return res.redirect('/');
        });
        
      })(req, res, next);
    },

    logout: function(req, res){
      if(req.isAuthenticated()){
        req.logout();
        req.session.messages = req.i18n.__("Log out successfully");
      }
      res.redirect('/');
    },

    uniqueUser: function(req, res, next) {
      models.User.findOne({ 
        where: {
          email: req.body.email
        }
      }).then(function(user) {
        if(user) res.status(404).send('This Email already exist!');
        else next();
      }).catch(function(err) {
        return done(err);
      });
    },

    requireLogin: function(req, res, next) {
      if(!req.isAuthenticated()) { console.log('SESSION', req.session);
        req.session.messages = "You need to login to view this page";
        res.redirect('/login');
      }
      next();
    }
};

module.exports = auth;