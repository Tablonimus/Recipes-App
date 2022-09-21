const { Router } = require("express");
const {
  getAllRecipes,
  searchRecipes,
} = require("../controllers/recipeController");

const router = Router();

router.get("/", async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const searchFood = await searchRecipes(name);
      res.status(201).json(searchFood);
    } else {
      const getFood = await getAllRecipes();
      res.status(201).json(getFood);
    }
  } catch (error) {
    res.status(404).json(error.message);
  }
});

router.post("/", async (req, res) => {});

router.get("/:id", async (req, res) => {});

module.exports = router;
