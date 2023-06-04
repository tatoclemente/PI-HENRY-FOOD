const { Recipe, Diet } = require("../db");
const { baseUrlID, baseUrl, flag } = require("../helpers/urls");
const axios = require("axios");
require("dotenv").config();
const API_KEY = process.env.API_KEY;
const {Op} = require('sequelize');

const getRecipeById = async (id, source) => {
  if(id <= 0) throw Error('No existen recetas con ids menores a 1')
  if(id > 5221) throw Error('No existen recetas con ids superiores a 5221')

  //* PRIMERO_____valido que el id sea de mi base de datos
  if (source === "bdd") {
    //? traigo la receta de la base de datos
    const recipeDB = await Recipe.findByPk(id, {
      include: {
        model: Diet,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    // extraigo las dietas de mi receta y las transformo a un array de strings

    const diets = recipeDB.Diets.map((diet) => diet.name);
    // creo un nuevo objeto con las propidades que me interesan con el array de dietas modificado
    const recipe = {
      id: recipeDB.id,
      name: recipeDB.name,
      image: recipeDB.image,
      summary: recipeDB.summary,
      healtScore: recipeDB.healtScore,
      steps: recipeDB.steps,
      diets: diets,
    };
    
    return recipe;
  } else {
    //? SEGUNDO____ en el caso que el id sea un numero entero, traigo la receta de la api
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
      steps: data.analyzedInstructions[0]?.steps.map((step) => {
        return {
          number: step.number,
          step: step.step,
        };
      }),
      diets: data.diets,
    };

    //* ULTIMO___ devuelvo la receta filtrada
    return recipeApi;
  }
};

const getRecipesByName = async (name) => {
  if(name.length === 0) throw Error('La query está vacia')
  
  const apiKey = API_KEY;
  const pageSize = 5221;

  // traigo las recetas de mi Base de Datos
  const recipesDB = await Recipe.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name.toLowerCase()}%`,
      }
    }
  })

  // traigo las recetas de mi API
  const { data } = await axios.get(baseUrl + flag, {
    params: {
      apiKey,
      number: pageSize,
    },
  });
  if (name) {
    const recipesApi = data.results.map((recipe) => {
      return {
        id: recipe.id,
        name: recipe.title,
        image: recipe.image,
        sumary: recipe.summary,
        healtScore: recipe.healthScore,
        steps: recipe.analyzedInstructions[0]?.steps.map((step) => {
          return {
            number: step.number,
            step: step.step,
          };
        }),
        diets: recipe.diets,
      };
    });
    const filteredRecipesApi = recipesApi.filter((recipe) =>{
      return recipe.name.toLowerCase().includes(name.toLowerCase())
    
    })
    const allDiets = [...recipesDB, ...filteredRecipesApi ];
    if(allDiets.length === 0) return {message: 'Lo siento, no existen recetas con ese nombre'}
    return allDiets;
  }

  
};

const createRecipe = async (
  name,
  image,
  summary,
  healthScore,
  steps,
  diets
) => {
  if(!name || !image || !summary || !healthScore || !steps || !diets) throw Error('Faltan datos para crear la receta')

  const recipe = await Recipe.create({
    name,
    image,
    summary,
    healthScore,
    steps,
  });
  // busco las dietas que tengo en mi base de datos y filtro las que coinciden con las que me llegan por body
  const dietDB = await Diet.findAll({
    where: { name: diets },
  });
  // agrego las dietas a mi receta con el metodo addDiet que me proporciona sequelize al relacionar mis modelos
  recipe.addDiet(dietDB);
  return recipe;
};

module.exports = {
  getRecipeById,
  createRecipe,
  getRecipesByName,
};
