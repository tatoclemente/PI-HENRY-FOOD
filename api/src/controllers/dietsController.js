const axios = require("axios");
const { Diet } = require("../db");
const { baseUrl, flag } = require("../helpers/urls");
require("dotenv").config();

const API_KEY = process.env.API_KEY;

// En primera instancia, cuando no exista ninguna dieta, deberas precargar la base de datos con las dietas de la documentación
// Estas deben ser obtenidas de la API. Luego de obtenerlas deben ser guardadas en la base de datos para su posterior consumo desde

const saveDiets = async (uniqueDiets) => {
  return await Promise.all(
    uniqueDiets.map((diet) => Diet.create({ name: diet }))
  );
};

const getDiets = async () => {
  const dietsDB = await Diet.findAll();

  if (dietsDB.length === 0) {
    const apiKey = API_KEY;
    const pageSize = 5221;

    const { data } = await axios.get(baseUrl + flag, {
      params: {
        apiKey,
        number: pageSize,
      },
    });

    const dietasArr = data.results.map((recipe) => recipe.diets).flat();

    const uniqueDiets = [...new Set(dietasArr)];

    saveDiets(uniqueDiets);
    return uniqueDiets;
  }
  return dietsDB;
};

module.exports = {
  getDiets,
};
