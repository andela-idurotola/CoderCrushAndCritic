
"use strict";

module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define('Comment', {
    title:       { type: DataTypes.TEXT },
    hashtag:     { type: DataTypes.STRING },
    description: { type: DataTypes.STRING }
  }, {
    underscored: true,
    classMethods : {
      associate: function(models) {
        Comment.belongsTo(models.User, {foreignkey : 'user_id'});
      }
    }
  });

  return Comment;
};