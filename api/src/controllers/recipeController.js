///RECIPE ROUTES CONTROLLERS//////////////////////////////////////////
const axios = require("axios");
const { Recipe, Diet } = require("../db");
require("dotenv").config();
const { YOUR_API_KEY } = process.env;

//GET API INFO/////////////////////
async function getApiRecipes() {
  try {
    apidata = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100`
    );
    //--format apidata--
    const apiRecipes = apidata.data.results.map((recipe) => ({
      id: recipe.id,
      title: recipe.title,
      diets: recipe.diets.map((diets) => diets),
      summary: recipe.summary,
      healthScore: recipe.healthScore,
      analyzedInstructions: recipe.analyzedInstructions.map(
        (analyzedInstructions) => analyzedInstructions.steps
      ),
      image: recipe.image,
    }));
    return apiRecipes;
  } catch (error) {
    throw new Error("getApiRecipes controller Error");
  }
}
//GET DB INFO/////////////////////
async function getDBRecipes() {
  try {
    const dBRecipesToMap = await Recipe.findAll({
      include: {
        model: Diet,

        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    const mappedFood = dBRecipesToMap.map((recipe) => recipe.toJSON());
    return mappedFood;
  } catch (error) {
    throw new Error("getDBRecipes controller Error");
  }
}
//MIX ALL INFO IN ONE FX/////////
async function getAllRecipes() {
  const apiRecipes = await getApiRecipes();
  const dBRecipes = await getDBRecipes();
  const allRecipes = [...dBRecipes, ...apiRecipes];
  return allRecipes;
}
//FILTER BY NAME FOR SEARCH//////
async function searchRecipes(value) {
  const allFood = await getAllRecipes();
  const filteredFood = [];
  //if a search input is passed, filter the array//
  if (value) {
    allFood.map((recipe) => {
      if (recipe.title.toLowerCase().includes(value.toLowerCase()))
        filteredFood.push(recipe);
    });
    if (!filteredFood.length) {
      throw new Error(
        `Oops! 🤭 It looks like ${value} it's not on the menu 😅`
      );
    }
    return filteredFood;
  } else return allFood;
}

module.exports = {
  getAllRecipes,
  searchRecipes,
};
