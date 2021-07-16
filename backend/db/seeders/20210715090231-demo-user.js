'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Users', [
        {
          email: 'demo@user.io',
          username: 'Demo-lition',
          hashedPassword: bcrypt.hashSync('password'),
        },
        {
          email: faker.internet.email(),
          username: 'FakerUser',
          hashedPassword: bcrypt.hashSync(faker.internet.password()),
        },
        {
          email: faker.internet.email(),
          username: 'FauxUser',
          hashedPassword: bcrypt.hashSync(faker.internet.password()),
        },
    ], {});

  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkInsert('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser', 'FauxUser'] }
    }, {});
  }
};
