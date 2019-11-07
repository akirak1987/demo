'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Trails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      settime: {
        type: Sequelize.DATE
      },
      timems: {
        type: Sequelize.TINYINT.UNSIGNED
      },
      epc: {
        type: Sequelize.STRING
      },
      tag: {
        type: Sequelize.STRING
      },
      reader: {
        type: Sequelize.STRING
      },
      size: {
        type: Sequelize.TINYINT.UNSIGNED
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Trails');
  }
};
