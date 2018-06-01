'use strict';
module.exports = (sequelize, DataTypes) => {
  var ThumbUp = sequelize.define('ThumbUp', {
    movieid: DataTypes.INTEGER,
    title: DataTypes.STRING,
    image: DataTypes.STRING
  }, {});
  ThumbUp.associate = function(models) {
    ThumbUp.belongsTo(models.List, {
      foreignKey: "listId",
      onDelete: "CASCADE"
    });
  };
  return ThumbUp;
};