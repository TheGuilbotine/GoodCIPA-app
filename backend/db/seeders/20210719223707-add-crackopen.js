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
        ipaId: 14,
        comment: 'Tried this beer in Northern Ireland for the first time. Always brings back the memories of that one special night.',
      },
      {
        userId: 5,
        ipaId: 13,
        comment: 'So Good',
      },
      {
        userId: 6,
        ipaId: 14,
        comment: 'Holy yuminess so freaking good.',
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
      {
        userId: 1,
        ipaId: 14,
        comment: 'So SO GOOD!',
      },
      {
        userId: 3,
        ipaId: 19,
        comment: 'Wow I loved it!',
      },
      {
        userId: 2,
        ipaId: 14,
        comment: 'A really easy IPA. Full of flavor and a really fun label!',
      },
      {
        userId: 6,
        ipaId: 9,
        comment: 'All I can say is yum!',
      },
      {
        userId: 4,
        ipaId: 22,
        comment: 'This is my nex go to!',
      },
      {
        userId: 3,
        ipaId: 14,
        comment: 'Had this in Paris and it was such a nice beer to have on the Seine!',
      },
      {
        userId: 5,
        ipaId: 4,
        comment: 'I will be serving this at my wedding!',
      },
      {
        userId: 6,
        ipaId: 18,
        comment: 'Great fathers day gift!',
      },
      {
        userId: 3,
        ipaId: 20,
        comment: 'WOW that was a taste bud exploration!',
      },
      {
        userId: 4,
        ipaId: 14,
        comment: 'Absolutely love this beer, would have it again any time.',
      },
      {
        userId: 7,
        ipaId: 14,
        comment: 'Had this with my boyfriend the other night. It was such a good flavorful beer to enjoy while sitting on the beach.',
      },
    ], {});

  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('CrackOpens', null, {});

  }
};
