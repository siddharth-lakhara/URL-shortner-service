const Models = require('../../models');
const urlShortner = require('./urlShortner');

const insertIntoDB = (obj, start, end) => {
  const { longurl } = obj;
  let { shorturl } = obj;
  return Models.urldb.createObject({
    longurl,
    shorturl,
  }).then((result) => {
    if (!result.created && result.newObject.longurl !== longurl) {
      console.log('***********************');
      console.log('collision found');
      console.log('***********************');
      shorturl = urlShortner(longurl, start + 6, end + 6);
      return insertIntoDB({ longurl, shorturl }, start + 6, end + 6);
    }
    return shorturl;
  });
};

module.exports = insertIntoDB;
