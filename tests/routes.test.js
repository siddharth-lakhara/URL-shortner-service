const server = require('../src/server');
const client = require('redis').createClient();

beforeAll((done) => { // delet all pre stored keys
  client.flushdb((err, success) => {
    done();
  });
});

describe('Test for shortner api', () => {
  test('/short gives 200 statusCode', (done) => {
    const options = {
      url: '/short',
      method: 'POST',
      payload: JSON.stringify({
        url: 'http://mypersonalurl0.com',
      }),
    };
    server.inject(options, (res) => {
      expect(res.statusCode).toBe(200);
      done();
    });
  });
});

describe('Test for /long and redis', () => {
  test('/long gives 200 status code', (done) => {
    server.inject('/long?shortUrl=100400', (res) => {
      expect(res.statusCode).toBe(200);
      done();
    });
  });

  test('/long gives desired long url', (done) => {
    server.inject('/long?shortUrl=100400', (res) => {
      expect(res.payload).toEqual('http://mypersonalurl603060.com');
      done();
    });
  });

  test('redis stores the key 10400', (done) => {
    const shortUrl = 100400;
    client.get(shortUrl, (err, data) => {
      expect(data).toEqual('http://mypersonalurl603060.com');
      done();
    });
  });

  test('A key if redis doesn\'t have, it will create a new one', () => {
    const shortUrl = 101328;
    client.get(shortUrl, (err, data) => { // before ping, redis didnt had key
      expect(data).toBe(null);
      server.inject('/long?shortUrl=101328', (res) => { // now making an entry in redis
        client.get(shortUrl, (err, data) => { // test for available key
          expect(data).toBe('http://mypersonalurl96536.com');
          done();
        });
      });
    });
  });
});
