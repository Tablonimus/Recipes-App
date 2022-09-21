const { DataTypes, UUIDV1 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "diet",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV1,
        primaryKey: true,
      },
      name: {
        type: DataTypes.ENUM(
          "gluten free",
          "dairy free",
          "ketogenic",
          "lacto ovo vegetarian",
          "lacto-vegetarian",
          "ovo-vegetarian",
          "vegan",
          "pescetarian",
          "paleo",
          "primal",
          "low FODMAP",
          "whole30"
        ),
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
