"use strict";
module.exports = (sequelize, DataTypes) => {
  const Homepage = sequelize.define(
    "Homepage",
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      backgroundColor: DataTypes.STRING,
      color: DataTypes.STRING,
    },
    {}
  );
  Homepage.associate = function (models) {
    Homepage.belongsTo(models.user);
    Homepage.hasMany(models.Story);
  };
  return Homepage;
};
