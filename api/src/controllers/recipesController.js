const { Recipe, Diet } = require("../db");
const { baseUrlID } = require("../helpers/urls");
const axios = require("axios");
require("dotenv").config();
const API_KEY = process.env.API_KEY;


const getRecipeById = async (id, source) => {

    if (source === "bdd") {
    // traigo la receta de la base de datos
      const recipeDB = await Recipe.findByPk(id, {
        include: {
          model: Diet,
          attributes: ["name"],
          through: {
            attributes: []
          }
        }
      });
      return recipeDB
    } else{
        // traigo la receta de la api
        const { data } = await axios.get(
            `${baseUrlID}${id}/information?apiKey=${API_KEY}`
          );
      
          // Tengo que filtrar la informacion que me trae la API, necesito id, name, image, summary, healtScore, steps, diets
      
        const recipeApi = {
        id: data.id,
        name: data.title,
        image: data.image,
        sumary: data.summary,
        healtScore: data.healthScore,
        steps: data.analyzedInstructions[0].steps.map((step) => 
        {
            return {
            number: step.number,
            step: step.step,
            };
        }),
        diets: data.diets,
        };
        return recipeApi
    }
  }

  const createRecipe = async (name, image, summary, healthScore, steps, diets) => {
      const recipe = await Recipe.create({
        name,
        image,
        summary,
        healthScore,
        steps,
      });
      
      const dietDB = await Diet.findAll({
        where: { name: diets },
      });
      recipe.addDiet(dietDB);
      return recipe;
  
  }

  module.exports = {
    getRecipeById,
    createRecipe,
  }