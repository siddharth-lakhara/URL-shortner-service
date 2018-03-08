const Joi = require('joi');
const getShortUrl = require('../src/helpers/getShortUrl');

module.exports = [{
  method: 'POST',
  path: '/short',
  config: {
    validate: {
      payload: Joi.object({
        url: Joi.string().regex(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/|www\.)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/),
      }),
    },
  },
  handler: (req, reply) => {
    const longURL = req.payload.url;
    getShortUrl(longURL).then((shortURL) => {
      reply(`Short URL is ${shortURL}`);
    });
  },
}];
