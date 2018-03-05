const Hapi = require('hapi');
const Route = require('../routes');

const server = new Hapi.Server();
server.connection({
  host: 'localhost',
  port: 8080,
});

server.route(Route);
server.start((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('server started at port: ', server.info.uri);
  }
});
