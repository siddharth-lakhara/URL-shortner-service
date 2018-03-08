const urlShortner = require('../src/helpers/urlShortner');
const getShortURL = require('../src/helpers/getShortUrl');
const insertIntoDB = require('../src/helpers/insertIntoDB');
const Models = require('../models');

beforeAll((done) => { // destroying all entries which are used in tests
  Models.urldb.destroy({
    where: {
      longurl: [
        'http://someURL.com',
        'http://anotherURL.com',
        'http://somenewURL.com',
        'http://someurlagain.com',
        'http://insertUrl1.com',
        'http://insertUrl2.com',
        'http://firstTestUrl.com',
        'http://secondTestUrl.com',
      ],
    },
  })
    .then(() => { done(); });
});

describe('tests for hashing function: ', () => {
  test('Returns hash of six digit', () => {
    const longURL = 'http://someURL.com';
    const hash = urlShortner(longURL, 0, 6);
    expect(hash.length).toBe(6);
  });

  test('Returns same hash for same url', () => {
    const longURL = 'http://someURL.com';
    const hash1 = urlShortner(longURL, 0, 6);
    const hash2 = urlShortner(longURL, 0, 6);
    expect(hash1).toEqual(hash2);
  });

  test('Returns different hash for different URL', () => {
    const longURL1 = 'http://someURL.com';
    const longURL2 = 'http://anotherURL.com';
    const hash1 = urlShortner(longURL1, 0, 6);
    const hash2 = urlShortner(longURL2, 0, 6);
    expect(hash1 === hash2).toBeFalsy();
  });
});

describe('Tests for getShortURL in helpers', () => {
  test('return expected shortURL with length 6', (done) => {
    const longURL = 'http://someURL.com';
    getShortURL(longURL).then((shortURL) => {
      expect(shortURL).toEqual('d705e5');
      done();
    });
  });

  test('returns different short URL for different url', (done) => {
    const longURL1 = 'http://someURL.com';
    const longURL2 = 'http://anotherURL.com';
    getShortURL(longURL1).then((shortURL1) => {
      getShortURL(longURL2).then((shortURL2) => {
        expect(shortURL1 === shortURL2).toBeFalsy();
        done();
      });
    });
  });
});

describe('createObject in models', () => {
  test('Creates new Object for new URL', (done) => {
    const longURL = 'http://somenewURL.com';
    const shortURL = 'abbdef';
    Models.urldb.createObject({
      longurl: longURL,
      shorturl: shortURL,
    }).then((returnObject) => {
      // console.log('Checking return Object: ', returnObject);
      expect(returnObject.created).toBeTruthy();
      expect(returnObject.newObject.shorturl).toEqual(shortURL);
      expect(returnObject.newObject.longurl).toEqual(longURL);
      done();
    });
  });

  test('Doesn\'t create new Object for same long URl', (done) => {
    const longURL = 'http://someurlagain.com';
    const shortURL = 'abcdee';
    Models.urldb.createObject({
      longurl: longURL,
      shorturl: shortURL,
    }).then(() => {
      Models.urldb.createObject({ // creating the same object again
        longurl: longURL,
        shorturl: shortURL,
      }).then((returnObject) => {
        expect(returnObject.created).toBeFalsy();
        expect(returnObject.newObject.shorturl).toEqual(shortURL);
        expect(returnObject.newObject.longurl).toEqual(longURL);
        done();
      });
    });
  });

  test('Doesn\'t create new Object for same short URL', (done) => {
    const longURL1 = 'http://firstTestUrl.com';
    const longURL2 = 'http://secondTestUrl.com';
    const shortURL = 'abqwer';
    Models.urldb.createObject({
      longurl: longURL1,
      shorturl: shortURL,
    }).then(() => {
      Models.urldb.createObject({ // creating object with same short URL
        longurl: longURL2,
        shorturl: shortURL,
      }).then((returnObject) => {
        // console.log('shortURL: ', returnObject.newObject.shorturl);
        // console.log('longURL: ', returnObject.newObject.longurl);
        // console.log('created: ', returnObject.created);

        // returns object for longURL1
        expect(returnObject.created).toBeFalsy();
        expect(returnObject.newObject.shorturl).toEqual(shortURL);
        expect(returnObject.newObject.longurl).toEqual(longURL1);
        done();
      });
    });
  });
});

describe('tests for insertIntoDB helper', () => {
  test('Testing for collisions', (done) => {
    const longURL1 = 'http://insertUrl1.com';
    const longURL2 = 'http://insertUrl2.com';
    const shortURL = 'poiuyt';
    const obj1 = { longurl: longURL1, shorturl: shortURL };
    const obj2 = { longurl: longURL2, shorturl: shortURL };

    insertIntoDB(obj1, 0, 6).then((newShortURL1) => {
      insertIntoDB(obj2, 0, 6).then((newShortURL2) => {
        // console.log('ShortURL1: ', newShortURL1);
        // console.log('ShortURL2: ', newShortURL2);
        expect(newShortURL1 === newShortURL2).toBeFalsy();
        done();
      });
    });
  });
});
