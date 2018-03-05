
module.exports = (sequelize, DataTypes) => {
  const urldb = sequelize.define('urldb', {
    longurl: DataTypes.STRING,
    shorturl: DataTypes.STRING(6),
  }, {});
  urldb.createObject = (obj) => {
    const promise = urldb.findOrCreate({
      where: {
        shorturl: obj.shorturl,
      },
      defaults: {
        longurl: obj.longurl,
      },
    }).spread((newObject, created) => ({
      newObject,
      created,
    }));
    return promise;
  };
  return urldb;
};

