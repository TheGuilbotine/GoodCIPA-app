'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('CrackOpens', [
      {
        userId: 1,
        ipaId: 11,
        comment: 'What a scrumptuous beer',
      },
      {
        userId: 5,
        ipaId: 13,
        comment: 'So Good',
      },
      {
        userId: 4,
        ipaId: 9,
        comment: 'I have never had such a hoppy beer',
      },
      {
        userId: 5,
        ipaId: 2,
        comment: 'Never knew an IPA could taste so good',
      },
      {
        userId: 4,
        ipaId: 22,
        comment: 'The most refreshing thing',
      },
      {
        userId: 1,
        ipaId: 23,
        comment: 'So SO GOOD!',
      },
    ], {});

  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('CrackOpens', null, {});

  }
};
