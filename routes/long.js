const Models = require('../models');
const redis = require('redis');

const client = redis.createClient();

module.exports = [{
  method: 'GET',
  path: '/long',
  handler: (req, reply) => {
    const shorturl = req.query.shortUrl;
    client.get(shorturl, (err, data) => {
      if (err) {
        console.log('Error: ', err);
      }
      if (data) {
        reply(data);
      } else {
        Models.urldb.findOne({ where: { shorturl } })
          .then((searchResult) => {
            if (searchResult === null) {
              reply('Invalid URL');
            } else {
              // client.set(shorturl, searchResult.longurl, redis.print);
              reply(searchResult.longurl);
            }
          });
      }
    });
  },
}];
