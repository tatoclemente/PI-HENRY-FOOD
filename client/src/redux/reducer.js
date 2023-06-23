import {
  GET_RECIPES_BY_NAME,
  GET_ALL_RECIPES,
  GET_DIETS,
  CLEAR_RECIPE_BY_NAME,
  FILTER_BY_DIET,
  FILTER_BY_ORIGIN,
  ORDER_BY_NAME,
  ORDER_BY_SCORE,
  CLEAR_RECIPE_FILTERED,
  ADD_NEW_RECIPE
} from "./action-creators/types";

// import { recipes, dietTypes } from "../utils/data";

const initialState = {
  allRecipes: [],
  // allRecipes: recipes,
  filteredRecipes: [],
  // diets: dietTypes,
  diets: [],
  recipesByName: [],
};


const rootReducer = (state = initialState, { type, payload }) => {

  // GUARDO el valor de mi estado global de acuerdo a lo que estoy renderizando en ese momento
  const recipesToSort = state.filteredRecipes.length > 0
  ? state.filteredRecipes // Usar las recetas filtradas si existen
  : state.recipesByName.length > 0
  ? state.recipesByName // Usar las recetas filtradas por nombre si existen
  : state.allRecipes; // Usar todas las recetas si no hay filtrados

  switch (type) {
    case GET_ALL_RECIPES:
      return { ...state, allRecipes: payload };

    case GET_DIETS:
      return { ...state, diets: payload };

    case GET_RECIPES_BY_NAME:
      return { ...state, recipesByName: payload };

    case CLEAR_RECIPE_BY_NAME:
      return { ...state, recipesByName: payload };

    case ADD_NEW_RECIPE:
      return { ...state, allRecipes:[payload, ...state.allRecipes]};

    // FILTRADOS

    case CLEAR_RECIPE_FILTERED:
      return { ...state, filteredRecipes: payload };

    case FILTER_BY_DIET:
      const recipesToFilter = state.recipesByName.length > 0
      ? state.recipesByName
      : state.allRecipes;

      const filterByDiet = recipesToFilter.filter((recipe) =>
        recipe.diets?.includes(payload)
      );
      if (filterByDiet.length === 0)
        window.alert(
          "There are no recipes with that type of diet, try again with another option"
        );

      return { ...state, filteredRecipes: filterByDiet };

    case FILTER_BY_ORIGIN:
      const recipesToFilterOrigin = state.recipesByName.length > 0
      ? state.recipesByName
      : state.allRecipes;

      if (payload === "created") {
        const filterByOrigin = recipesToFilterOrigin.filter(
          (recipe) => recipe.created === true
        );
        if (filterByOrigin.length === 0){
          window.alert("No recipes created by you, try again with another option");
        } 
        return { ...state, filteredRecipes: filterByOrigin };
      } else {
        const filterByOriginApi = recipesToFilterOrigin.filter(
          (recipe) => recipe.created === undefined
        );
        if (filterByOriginApi.length === 0){
          window.alert("There are no recipes with that name in the API");
        } 
        return { ...state, filteredRecipes: filterByOriginApi };
      }
   //LOS ORDENAMIENTOS USAN EL VALOR QUE GUARDE ANTERIORMENTE DEL ESTADO GLOBAL QUE SE ESTA RENDERIZANDO
    case ORDER_BY_NAME:

      const sortedByName = [...recipesToSort].sort((a, b) => {
        if (payload === "asc") {
          return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
        } else if (payload === "dsc") {
          return b.name.toLowerCase().localeCompare(a.name.toLowerCase());
        }
        return 0;
      });

      return { ...state, filteredRecipes: sortedByName };

      case ORDER_BY_SCORE:
        // const recipesToSortByScore = state.recipesByName.length > 0
        // ? state.recipesByName
        // : state.allRecipes;

        const sortedByScore = [...recipesToSort].sort((a, b) => {
          if(payload === 'more') {
            return b.healthScore - a.healthScore
          } else if (payload === 'less') {
            return a.healthScore - b.healthScore
          }
          return 0
        }
        )
        return { ...state, filteredRecipes: sortedByScore };
    default:
      return { ...state };
  }
};

export default rootReducer;
