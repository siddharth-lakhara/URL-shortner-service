const Models = require('../models');
const getShortUrl = require('../src/helpers/getShortUrl');

module.exports = [{
  method: 'POST',
  path: '/short',
  handler: (req, reply) => {
    const longURL = req.payload.url;
    const shortURL = getShortUrl(longURL);
    reply(`Short URL is ${shortURL}`);
  },
}];
