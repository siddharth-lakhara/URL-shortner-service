const crypto = require('crypto');
const Models = require('../models');

module.exports = [{
  method: 'POST',
  path: '/short',
  handler: (req, reply) => {
    const longurl = req.payload.url;
    let start = 0;
    let shorturl = crypto.createHash('md5').update(longurl).digest('hex').slice(start, start + 6);
    while (1) {
      Models.urldb.findOrCreate({
        where: {
          longurl,
          shorturl,
        },
      }).spread((obj, bool) => {
        if (bool) { // object was created}
          reply(`Shortened url is ${shorturl}`);
        } else {
          start += 6;
          shorturl = crypto.createHash('md5').update(longurl).digest('hex').slice(start, start + 6);
        }
      });
    }
  },
}];
