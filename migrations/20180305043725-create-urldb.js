

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('urldbs', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    longurl: {
      type: Sequelize.STRING,
    },
    shorturl: {
      type: Sequelize.STRING(6),
      unique: true,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('urldbs'),
};
