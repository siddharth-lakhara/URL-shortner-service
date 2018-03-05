const Models = require('../models');
const getShortUrl = require('../src/helpers/getShortUrl');

module.exports = [{
  method: 'POST',
  path: '/short',
  handler: (req, reply) => {
    const longURL = req.payload.url;
    getShortUrl(longURL).then((shortURL) => {
      reply(`Short URL is ${shortURL}`);
    });
  },
}];
