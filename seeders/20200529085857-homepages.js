"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Homepages",
      [
        {
          title: "My test homepage :)",
          description: "This homepage is for testing stuff",
          backgroundColor: "#F1C40F",
          color: "#2C3E50",
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 1,
        },
        {
          title: "Wow this is great! (Homepage)",
          description: "This homepage is for being great",
          backgroundColor: "#AF7AC5",
          color: "#FBFCFC",
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 2,
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Homepages", null, {});
  },
};
