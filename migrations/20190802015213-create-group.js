'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Groups', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      deputy_name: {
        type: Sequelize.STRING
      },
      area: {
        type: Sequelize.TINYINT.UNSIGNED
      },
      municipality: {
        type: Sequelize.STRING
      },
      contact: {
        type: Sequelize.STRING
      },
      purpose: {
        type: Sequelize.STRING
      },
      activities: {
        type: Sequelize.STRING
      },
      project_name: {
        type: Sequelize.STRING
      },
      outline: {
        type: Sequelize.STRING
      },
      subject: {
        type: Sequelize.STRING
      },
      result: {
        type: Sequelize.STRING
      },
      expense: {
        type: Sequelize.BIGINT
      },
      fiscal: {
        type: Sequelize.STRING
      },
      image_path: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('Groups');
  }
};
