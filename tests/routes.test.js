const server = require('../src/server');

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

describe('Test for /long', () => {
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
});

// describe('Test for redis', ()=>{

// })
