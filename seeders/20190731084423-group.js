'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    let records = [],
    stamp = new Date().toLocaleString("ja-JP",{hour12:false}),
    munis = ["港","新宿","品川","目黒","大田","世田谷","渋谷","中野","杉並","練馬","台東","墨田","江東","荒川","足立","葛飾","江戸川","千代田","中央","文京","豊島","北","板橋"];
    for(let i = 0;i < 100; i++){
      records.push({
        name: "Group" + parseInt(i + 1),
        deputy_name:"代表" + (i + 1),
        area: parseInt(i % 3) + 1,
        municipality: "東京都" + munis[Math.floor(Math.random() * 23)] + "区",
        outline: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        expense: Math.floor(Math.random() * 9 + 1) * 100000,
        image_path: "image" + Math.floor(Math.random() * 11 + 1) + ".jpg",
        createdAt: stamp,
        updatedAt: stamp
      });
    }

    return queryInterface.bulkInsert('Groups', records, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Groups', null, {});
  }
};
