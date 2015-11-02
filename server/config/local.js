var passport = require('passport'),
    bcrypt   = require('bcryptjs'), 
    models   = require('../models/'),
    LocalStrategy = require('passport-local').Strategy;



module.exports = function() {

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    models.User.find({where: {id : id}})
    .then(function(user) {
      done(null, user);
    }, function(err){
      done(err, null);
    });
  });

  passport.use({
      usernameField: 'email',
      passwordField: 'password'
    }, new LocalStrategy(
    function(username, password, done) {  console.log('gold nfire',username, password);
      models.User.find({ username: username })
      .then(function(user) { console.log('this is the user : ', user);
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (user.password !== password) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      }, function(err) { console.log('could not find this user');
         return done(err);
      });
    }
  ));
}
