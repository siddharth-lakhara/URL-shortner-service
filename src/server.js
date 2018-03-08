const Hapi = require('hapi');
const Route = require('../routes');
const Good = require('good');

const server = new Hapi.Server();
server.connection({
  host: 'localhost',
  port: 8080,
});

server.route(Route);

server.register({
  register: Good,
  options: {
    reporters: {
      console: [{
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{
          response: '*',
          log: '*',
        }],
      }, {
        module: 'good-console',
      }, 'stdout'],
    },
  },
}, (err) => {
  if (err) {
    throw err;
  }
});

if (!module.parent) {
  server.start((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('server started at port: ', server.info.uri);
    }
  });
}

module.exports = server;
