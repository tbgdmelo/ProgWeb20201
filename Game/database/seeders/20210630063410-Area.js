'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('Areas', [{
        nome: 'Ciencias Exatas',
        createdAt: new Date(),
        updatedAt: new Date()
     },
     {
        nome: 'Ciencias Humanas',
        createdAt: new Date(),
        updatedAt: new Date()
     },
     {
        nome: 'Ciencias Biologicas',
        createdAt: new Date(),
        updatedAt: new Date()
     }
    ], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Areas', null, {});
  }
};
