const { Router } = require("express");
const { getDiets } = require("../controllers/dietControllers");

const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/", async (req, res) => {
  try {
    const diets = await getDiets();
    res.send(diets);
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;
