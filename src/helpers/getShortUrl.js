const urlShortner = require('./urlShortner');
const Models = require('../../models');

const getShortUrl = longurl => new Promise((resolve) => {
  let start = 0;
  let end = 6;
  let shorturl = urlShortner(longurl, start, end);

  let x = true;
  Models.urldb.createObject({
    longurl,
    shorturl,
  }).then((result) => {
    while (x) {
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
    resolve(shorturl);
  });
  // return shorturl;
});


module.exports = getShortUrl;
