const Models = require('../models');

module.exports = [{
  method: 'GET',
  path: '/long',
  handler: (req, reply) => {
    const shorturl = req.query.shortUrl;
    Models.urldb.findOne({ where: { shorturl } })
      .then((searchResult) => {
        if (searchResult === null) {
          reply('Invalid URL');
        } else {
          reply(searchResult.longurl);
        }
      });
  },
}];
