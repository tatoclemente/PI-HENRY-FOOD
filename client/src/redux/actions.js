import axios from 'axios';

export const GET_RECIPES = 'GET_RECIPES';

export const getRecipes = () => {
    return async (dispatch) => {
        const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&apiKey=42bd55fc9b73463a8fc84956c285be0b');
        const recipes = response.data.results ;
        dispatch({
            type: GET_RECIPES,
            payload: recipes
        });
    };
}