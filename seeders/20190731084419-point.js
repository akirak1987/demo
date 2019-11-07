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
    let sql = "INSERT INTO Points (name, status, point, createdAt, updatedAt) values ";
    for(let i = 0;i < 1000;i++){
      let stamp = new Date().toLocaleString('ja-JP',{hour12:false}),
      lat = Math.random() * 180,
      lon = Math.random() * 90,
      rand = Math.floor(Math.random() * 10) + 1;
      if(Math.random() > 0.5){
        lat *= -1;
      }
      if(Math.random() > 0.5){
        lon *= -1;
      }
      if(i !== 0){
        sql += ',';
      }
      sql += "('test" + i + "','" + rand + "'," + "GeomFromText('POINT(" + lat + " " + lon + ")')" + ",'" + stamp + "','" + stamp + "')";
    }
    return queryInterface.sequelize.query(sql);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Points', null, {});
  }
};
