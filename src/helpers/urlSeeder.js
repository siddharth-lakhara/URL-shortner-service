const getShortUrl = require('./getShortUrl');

const seedFn = () => {
  for (let i = 0; i < 100000; i += 1) {
    const longurl = `http://mypersonalurl${i}.com`;
    getShortUrl(longurl);
  }
};


module.exports = seedFn;
