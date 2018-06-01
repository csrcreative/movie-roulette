'use strict';
module.exports = (sequelize, DataTypes) => {
  var WantToSee = sequelize.define('WantToSee', {
    movieid: DataTypes.INTEGER,
    title: DataTypes.STRING,
    image: DataTypes.STRING
  }, {});
  WantToSee.associate = function(models) {
    WantToSee.belongsTo(models.List, {
      foreignKey: "listId",
      onDelete: "CASCADE"
    });
  };
  return WantToSee;
};