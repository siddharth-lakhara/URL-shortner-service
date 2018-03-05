const crypto = require('crypto');
const seedFn = require('../src/getURL');

const seedArray = seedFn();
// console.log(seedArray);

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('urldbs', seedArray, {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('urldbs', null, {}),
};
