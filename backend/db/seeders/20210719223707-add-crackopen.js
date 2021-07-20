'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('CrackOpens', [{
        userId: 1,
        ipaId: 11,
        comment: 'What a scrumptuous beer',
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});

  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('CrackOpens', null, {});

  }
};
