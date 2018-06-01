'use strict';
module.exports = (sequelize, DataTypes) => {
  var List = sequelize.define('List', {
    listkey: DataTypes.BIGINT
  }, {});
  List.associate = function(models) {
    List.hasMany(models.ThumbUp, {as: 'ThumbUp', foreignKey: 'listId'});
    List.hasMany(models.WantToSee, {as: 'WantToSee', foreignKey: 'listId'});
    List.hasMany(models.Rated, {as: 'Rated', foreignKey: 'listId'});
  };
  return List;
};