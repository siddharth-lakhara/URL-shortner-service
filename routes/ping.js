
module.exports = [{
  method: 'GET',
  path: '/ping',
  handler: (req, reply) => {
    reply('pong');
  },
}];
