'use strict';
module.exports = (sequelize, DataTypes) => {
  const Trail = sequelize.define('Trail', {
    settime: DataTypes.DATE,
    timems: DataTypes.TINYINT.UNSIGNED,
    epc: DataTypes.STRING,
    tag: DataTypes.STRING,
    reader: DataTypes.STRING,
    size: DataTypes.TINYINT.UNSIGNED
  }, {});
  Trail.associate = function(models) {
    // associations can be defined here
  };
  return Trail;
};
