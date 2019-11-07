'use strict';
module.exports = (sequelize, DataTypes) => {
  const Point = sequelize.define('Point', {
    name: DataTypes.STRING,
    status: DataTypes.TINYINT.UNSIGNED,
    point: DataTypes.GEOMETRY('POINT', 4326)
  }, {});
  Point.associate = function(models) {
    // associations can be defined here
  };
  return Point;
};
