const crypto = require('crypto');
const seedFn = require('../src/getURL');
const helper = require('../src/helpers/urlSeeder');
// console.log(seedArray);

module.exports = {
  up: (queryInterface, Sequelize) => {
    const seedArray = seedFn();
    return queryInterface.bulkInsert('urldbs', seedArray, {});
  },

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('urldbs'),
};
