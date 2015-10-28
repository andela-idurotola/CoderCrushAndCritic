
"use strict";

module.exports = function(sequelize, DataTypes) {
  var Nomimation = sequelize.define('Nomimation', {
    title:       { type: DataTypes.TEXT   },
    image:       { type: DataTypes.STRING },
    hashtag:     { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
    nominee:     { type: DataTypes.STRING },
    nominator:   { type: DataTypes.STRING }
  }, {
    underscored: true,
    classMethods : {
      associate: function(models) {
        Nomimation.belongsTo(models.User, {foreignkey : 'user_id'});
      }
    }
  });

  return Nomimation;
};