"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Stories",
      [
        {
          name: "Why testing is good for you...",
          content: "Because then you can see if stuff works! Duh..!",
          imgUrl:
            "https://files.realpython.com/media/Getting-Started-with-Testing-in-Python_Watermarked.9f22be97343d.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
          HomepageId: 1,
        },
        {
          name: "How to test good!",
          content: "You check yoself, before you wreck yoself",
          imgUrl:
            "https://lh3.googleusercontent.com/proxy/WhyMWIRWnwSFgynUApLi3lw0d6DOmWTJ9_8sCkwpc5nFzpi6RX2Mc3EeWzzAnh0Kew",
          createdAt: new Date(),
          updatedAt: new Date(),
          HomepageId: 1,
        },
        {
          name: "The 3 best examples of greatness",
          content: "Me, myself and I",
          imgUrl:
            "https://maken.wikiwijs.nl/userfiles/e8e4fafaa88375d24c7fc8d48c7093c5be32ba31.png",
          createdAt: new Date(),
          updatedAt: new Date(),
          HomepageId: 2,
        },
        {
          name: "How to become great, like me: Dummy",
          content: "You focus really hard, and then do like me",
          imgUrl:
            "https://dorlfinweb.com/wp-content/uploads/2020/01/greatness.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
          HomepageId: 2,
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  },
};
