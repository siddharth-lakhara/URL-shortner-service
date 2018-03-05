const http = require('http');

describe('basic server functionality', () => {
  test('server is running, ping route is working', (done) => {
    http.get('http://localhost:8080/ping', (response) => {
      expect(response.statusCode).toBe(200);
      response.on('data', () => {
        done();
      });
    });
  });

  test('server is running, ping route gives desired response', (done) => {
    let str = '';
    http.get('http://localhost:8080/ping', (response) => {
      response.setEncoding('utf8');
      response.on('data', (data) => {
        str += data;
      });
      response.on('end', () => {
        expect(str).toBe('pong');
        done();
      });
    });
  });
});
