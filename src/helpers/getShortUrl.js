const urlShortner = require('./urlShortner');
const insertIntoDB = require('./insertIntoDB');

const getShortUrl = (longurl) => {
  const start = 0;
  const end = 6;
  const shorturl = urlShortner(longurl, start, end);

  const insertIntoDBPromise = insertIntoDB({ longurl, shorturl }, start, end);
  return insertIntoDBPromise.then(newShorturl => (newShorturl));
};


module.exports = getShortUrl;
