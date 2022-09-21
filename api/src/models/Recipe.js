const { DataTypes, UUIDV1 } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
   sequelize.define("recipe", {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV1,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    healthScore: {
      type: DataTypes.FLOAT,
      // allowNull: false,
    },
    analyzedInstructions: {
      type: DataTypes.TEXT,
    },
    image:{
      type: DataTypes.TEXT,    
      defaultValue: "api/images/original.jpg" 
    },
 
    // spoonacularScore: {
    //   type: DataTypes.FLOAT,
    // },

    myDataBase: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  },  {timestamps : false});
};