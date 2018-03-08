const server = require('../src/server');

describe('basic server functionality', () => {
  test('server is running, ping route is working', (done) => {
    server.inject('/ping', (res) => {
      expect(res.statusCode).toBe(200);
      done();
    });
  });

  test('server is running, ping route gives desired response', (done) => {
    server.inject('/ping', (res) => {
      expect(res.payload).toBe('pong');
      done();
    });
  });
});
