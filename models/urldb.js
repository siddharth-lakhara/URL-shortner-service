'use strict';
module.exports = (sequelize, DataTypes) => {
  var urldb = sequelize.define('urldb', {
    longurl: DataTypes.STRING,
    shorturl: DataTypes.STRING
  }, {});
  urldb.associate = function(models) {
    // associations can be defined here
  };
  return urldb;
};