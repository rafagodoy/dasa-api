"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("users", {
            id_users: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: Sequelize.STRING(150),
            },
            email: {
                type: Sequelize.STRING(150),
            },
            password: {
                type: Sequelize.STRING(150),
            },
            status: {
                type: Sequelize.ENUM("active", "disabled"),
            },
        });
    },

    down: (queryInterface, Sequelize) => {
        /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    },
};
