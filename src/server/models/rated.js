'use strict';
module.exports = (sequelize, DataTypes) => {
  var Rated = sequelize.define('Rated', {
    movieid: DataTypes.INTEGER
  }, {});
  Rated.associate = function(models) {
    Rated.belongsTo(models.List, {
      foreignKey: "listId",
      onDelete: "CASCADE"
    });
  };
  return Rated;
};