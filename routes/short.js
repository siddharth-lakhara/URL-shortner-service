const Joi = require('joi');
const Models = require('../models');
const getShortUrl = require('../src/helpers/getShortUrl');

// ^ (https ?| ftp | file)://[-a-zA-Z0-9+&@#/%?=~_|!:,.;]*[-a-zA-Z0-9+&@#/%=~_|]
module.exports = [{
  method: 'POST',
  path: '/short',
  config: {
    validate: {
      payload: Joi.object({
        url: Joi.string().regex(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/|www\.)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/),
        // url: Joi.string().regex(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/)
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
