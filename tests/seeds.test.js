const Models = require('../models');

describe('tests for seeds', () => {
  test('size of seeded table', (done) => {
    Models.urldb.findAll().then((table) => {
      expect(table.length).toBe(1000000);
      done();
    });
  });
});

