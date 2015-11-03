"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    id:         { type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true},
    uid:        { type: DataTypes.STRING },
    email:      { type: DataTypes.STRING },
    first_name: { type: DataTypes.STRING },
    last_name:  { type: DataTypes.STRING },
    name:       { type: DataTypes.STRING },
    known_as:   { type: DataTypes.STRING },
    picture:    { type: DataTypes.STRING }
  }, {
    underscore: true,
    classMethods:{
      associate:function(models) {
        User.hasMany(models.Nomimation);
      }
    } 
  });

  return User;
};
