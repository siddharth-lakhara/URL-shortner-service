const crypto = require('crypto');

const urlShortner = (longURL, start, end) => {
  const hash = crypto.createHash('md5').update(longURL).digest('hex');
  const shortURL = hash.substring(start, end);
  return shortURL;
};

module.exports = urlShortner;
