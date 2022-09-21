const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const RecipesRoutes = require('./recipes')
const DietRoutes = require("./diets")
const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/',(req,res)=>{
    res.send('GET de prueba / sola')
})


router.use('/recipes', RecipesRoutes)
router.use('/diets', DietRoutes)



module.exports = router;