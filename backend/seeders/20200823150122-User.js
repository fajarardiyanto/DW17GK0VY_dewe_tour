"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    return queryInterface.bulkInsert("Users", [
      {
        fullName: "Fajar Ardiyanto",
        role: "User",
        email: "fajarardiyanto.web@gmail.com",
        password: "fajar",
        phone: "081382523731",
        address: "Bekasi",
        imgProfil: "imgProfile.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullName: "Admin",
        role: "Admin",
        email: "admin@admin.com",
        password: "admin",
        phone: "081382523731",
        address: "Bekasi",
        imgProfil: "imgProfile.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
