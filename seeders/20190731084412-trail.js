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
    let dataset = [
      {reader:'1281b6',tag:'0000020C94AEC002',epc:'E2801170'},
      {reader:'12cee7',tag:'0000020C94AEC012',epc:'E2801171'},
      {reader:'12cee6',tag:'0000020C94AEC022',epc:'E2801172'},
      {reader:'12cee4',tag:'0000020C94AEC032',epc:'E2801173'},
      {reader:'12cee3',tag:'0000020C94AEC042',epc:'E2801174'},
      {reader:'12ce3e',tag:'0000020C94AEC052',epc:'E2801175'},
      {reader:'12ce99',tag:'0000020C94AEC062',epc:'E2801176'},
      {reader:'12ceb2',tag:'0000020C94AEC072',epc:'E2801177'},
      {reader:'12cead',tag:'0000020C94AEC082',epc:'E2801178'},
      {reader:'12cee5',tag:'0000020C94AEC092',epc:'E2801179'},
    ],records = [];
    for(let i=0;i<5;i++){
      let rdm = Math.floor(Math.random() * 10), stamp = new Date().toLocaleString("ja-JP",{hour12:false});
      records.push({
        settime: stamp,
        timems: Math.floor(new Date().getMilliseconds() / 10),
        reader:dataset[rdm]['reader'],
        tag:dataset[rdm]['tag'],
        epc:dataset[rdm]['epc'],
        createdAt: stamp,
        updatedAt: stamp
      });
    }

    return queryInterface.bulkInsert('Trails', records, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Trails', null, {});
  }
};
