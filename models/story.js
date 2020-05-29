"use strict";
module.exports = (sequelize, DataTypes) => {
  const Story = sequelize.define(
    "Story",
    {
      name: DataTypes.STRING,
      content: DataTypes.TEXT,
      imgUrl: DataTypes.STRING,
    },
    {}
  );
  Story.associate = function (models) {
    Story.belongsTo(models.Homepage);
  };
  return Story;
};
