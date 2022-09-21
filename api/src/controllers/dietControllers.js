//////////DIET ROUTES CONTROLLERS///////////////////////////////////////////////////////
const axios = require("axios");
const { Diet } = require("../db");
//PRELOAD DIET TYPES///////////////////
//ADD TO DB ALL TYPES FOR FIRST TIME/////////////////////////////////////////
async function getDiets() {
  const dietsApi = [
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
    "whole30",
  ];
  try {
    dietsApi.map((diet) => {
      Diet.findOrCreate({ where: { name: diet } });
    });

    const preloadDietModel = await Diet.findAll();
    return preloadDietModel;
  } catch (error) {
    throw new Error("controller Error");
  }
}
module.exports = {
  getDiets,
};

//--PRELOAD CON ↓↓↓BULKCREATE↓↓↓///
// const preloadDietModel = async () => {
//     const TypesOfDiets = [
//         {name: 'vegetarian'},
//         {name: 'lacto vegetarian'},
//         {name: 'ovo vegetarian'},
//         {name: 'vegan'},
//         {name: 'pescetarian'},
//         {name: 'paleolithic'},
//         {name: 'dairy free'},
//         {name: 'primal'},
//         {name: 'whole30'},
//         {name: 'gluten free'},
//         {name: 'lacto ovo vegetarian'}
//     ]

//     try {
//         const dietModel = await Diet.bulkCreate(TypesOfDiets);
//         return dietModel;
//     } catch (error) {
//        throw new Error("Diet DB is not correctly loaded")
//     }
//}
