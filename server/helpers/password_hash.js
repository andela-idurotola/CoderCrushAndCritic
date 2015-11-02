var bcrypt = require('bcryptjs');

var hashPassword = function(password, cb) {
  bcrypt.genSalt(10, function(err, salt) { 
    if(err) cb();
    bcrypt.hash(password, salt, function(err, hash) {
      if(err) cb();
      cb(hash);
    });
  });
};

module.exports = hashPassword;