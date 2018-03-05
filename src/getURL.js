const crypto = require('crypto');


const seedFn = () => {
  const PromiseArray = [];
  for (let i = 0; i < 1000000; i += 1) {
    const longurl = `http://mypersonalurl${i}.com`;
    const shorturl = crypto.createHash('md5').update(longurl).digest('hex').slice(0, 6);
    PromiseArray.push({
      longurl,
      shorturl,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  return PromiseArray;
};

module.exports = seedFn;
