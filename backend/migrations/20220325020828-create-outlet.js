'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('outlet', {
      id_outlet: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tempat: {
        type: Sequelize.STRING
      },
      alamat: {
        type: Sequelize.STRING
      },
      id_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "user",
          key: "id_user"
        }
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('outlet');
  }
};
