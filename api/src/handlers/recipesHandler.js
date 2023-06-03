const { getRecipeById, createRecipe } = require("../controllers/recipesController");


const recipesByIdHandler = async (req, res) => {
  // Esta ruta obtiene el detalle de una receta específica. Es decir que devuelve un objeto con la información pedida en el detalle de una receta.
  // Debe incluir los datos de tipo de dieta
  // Debe funcionar tanto para los datos de la API como para los de la DB
  const { id } = req.params;

  const source = isNaN(id) ? "bdd" : "api";

  try {

    const recipe = await getRecipeById(id, source);

    res.status(200).json(recipe);

  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};


const createRecipeHandler = async (req, res) => {
  // Esta ruta recibira todos los datos para crear una receta y relacionarla con los tipos de dieta que se soliciten
  //Toda la informacion debe ser recibida por el body
  // Debe crear la receta en la base de datos, y debe estar relacionada con los tipos de dieta que se solicitan(al menos uno)
  const { name, image, summary, healthScore, steps, diets } = req.body;
  console.log(name, image, summary, healthScore, steps);
  try {
    const newRecipe = await createRecipe(name, image, summary, healthScore, steps, diets);
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}
module.exports = {
  recipesByIdHandler,
  createRecipeHandler,
};
