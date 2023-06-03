const { Router } = require("express");

const {recipesByIdHandler, createRecipeHandler} = require('../handlers/recipesHandler')


const recipesRouter = Router();

recipesRouter.get("/recipes/:id", recipesByIdHandler);


recipesRouter.get("/recipes", (req, res) => {
  // Debe obtener los datos de todas la recetas que coincidan con el query name, (no es necesario que haya coincidencia exacta)
  // Debe poder buscarlo independientemente de mayuscula o minuscula
  // Si no existe la receta debe mostrar el mensaje adecuado
  // Debe buscar tanto por los datos de la API como por los de la DB
  res.send(
    "NIY: Aca muestro todas las recetas que coincidan con el query name"
  );
});

recipesRouter.post("/recipes", createRecipeHandler);

module.exports = {
  recipesRouter,
};
