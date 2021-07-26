'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'Demo-licious',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: faker.internet.email(),
        username: 'FakeUser',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
      {
        email: faker.internet.email(),
        username: 'FauxUser',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
      {
        email: 'shamrock@greenman.maple',
        username: 'lucky',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: 'gilbo@me.com',
        username: 'The Creator',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: 'thomas@thomas.com',
        username: 'Thomas',
        hashedPassword: bcrypt.hashSync('thomas'),
      },
      {
        email: 'bl@wood.com',
        username: 'Lil Renard',
        hashedPassword: bcrypt.hashSync('password'),
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
