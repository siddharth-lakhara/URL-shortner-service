const urlShortner = require('../src/helpers/urlShortner');

const changeObjectToArray = (shortURLObject) => {
  const ArrayToReturn = Object.keys(shortURLObject).map((index) => {
    const longurl = shortURLObject[index];
    const shorturl = index;
    return ({
      longurl,
      shorturl,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });
  return ArrayToReturn;
};

const seedFn = () => {
  const shortURLObject = {};
  for (let i = 0; i < 100000; i += 1) {
    let start = 0;
    let end = 6;
    let x = true;
    while (x) {
      const longurl = `http://mypersonalurl${i}.com`;
      const shortURL = urlShortner(longurl, start, end);
      if (shortURLObject[shortURL] === undefined) {
        shortURLObject[shortURL] = longurl;
        x = false;
      } else {
        start += 6;
        end += 6;
      }
    }
  }
  const ArrayToInsert = changeObjectToArray(shortURLObject);
  return ArrayToInsert;
};

module.exports = {
  up: (queryInterface, Sequelize) => {
    const seedArray = seedFn();
    return queryInterface.bulkInsert('urldbs', seedArray, {});
  },

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('urldbs'),
};
