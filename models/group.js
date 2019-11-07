'use strict';
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    name: DataTypes.STRING,
    deputy_name: DataTypes.STRING,
    area: DataTypes.TINYINT.UNSIGNED,
    municipality: DataTypes.STRING,
    contact: DataTypes.STRING,
    purpose: DataTypes.STRING,
    activities: DataTypes.STRING,
    project_name: DataTypes.STRING,
    outline: DataTypes.STRING,
    subject: DataTypes.STRING,
    result: DataTypes.STRING,
    expense: DataTypes.BIGINT,
    fiscal: DataTypes.STRING,
    image_path: DataTypes.STRING
  }, {});
  Group.associate = function(models) {
    // associations can be defined here
  };
  return Group;
};
