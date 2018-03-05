const urlShortner = require('./urlShortner');
const Models = require('../../models');

const getShortUrl = (longurl) => {
  let start = 0;
  let end = 6;
  let shorturl = urlShortner(longurl, start, end);

  let x = true;
  while (x) {
    const result = Models.urldb.createObject({
      longurl,
      shorturl,
    });
    if (result.created) {
      x = false;
    } else if (result.newObject.longurl === longurl) { // this url already exists
      x = false;
    } else {
      start += 6;
      end += 6;
      shorturl = urlShortner(longurl, start, end);
    }
  }
  return shorturl;
};


module.exports = getShortUrl;
