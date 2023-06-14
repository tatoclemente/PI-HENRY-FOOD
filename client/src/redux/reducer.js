import {
  GET_RECIPES_BY_NAME,
  GET_ALL_RECIPES,
  GET_DIETS,
  DELETE_RECIPE,
  FILTER_BY_DIET,
  FILTER_BY_ORIGIN,
  ORDER_BY_NAME,
  ORDER_BY_SCORE,
  CLEAR_RECIPE_FILTERED,
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
  switch (type) {
    case GET_ALL_RECIPES:
      return { ...state, allRecipes: payload };

    case GET_DIETS:
      return { ...state, diets: payload };

    case GET_RECIPES_BY_NAME:
      return { ...state, recipesByName: payload };

    case DELETE_RECIPE:
      return { ...state, recipesByName: payload };

    // FILTRADOS

    case CLEAR_RECIPE_FILTERED:
      return { ...state, filteredRecipes: [] };

    case FILTER_BY_DIET:
      const filterByDiet = state.allRecipes.filter((recipe) =>
        recipe.diets?.includes(payload)
      );
      if (filterByDiet.length === 0)
        return window.alert(
          "There are no recipes with that type of diet, try again with another option"
        );

      return { ...state, filteredRecipes: filterByDiet };

    case FILTER_BY_ORIGIN:
      if (payload === "created") {
        const filterByOrigin = state.allRecipes.filter(
          (recipe) => recipe.created === true
        );
        return { ...state, filteredRecipes: filterByOrigin };
      } else {
        const filterByOrigin = state.allRecipes.filter(
          (recipe) => recipe.created === undefined
        );
        return { ...state, filteredRecipes: filterByOrigin };
      }
    case ORDER_BY_NAME:
      const sortedByName = [...state.allRecipes].sort((a, b) => {
        if (payload === "asc") {
          return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
        } else if (payload === "dsc") {
          return b.name.toLowerCase().localeCompare(a.name.toLowerCase());
        }
        return 0;
      });

      return { ...state, filteredRecipes: sortedByName };

      case ORDER_BY_SCORE:
        const sortedByScore = [...state.allRecipes].sort((a, b) => {
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
