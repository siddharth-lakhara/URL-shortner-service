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
    server.inject(options).then((res) => {
      expect(res.statusCode).toBe(200);
    });
  });
});
