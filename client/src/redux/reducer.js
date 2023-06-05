import { GET_RECIPES } from "./actions";

const initialState = {
    // recipes: recipes,
    recipes: [],
}

const rootReducer = (state=initialState, {type, payload}) => {
    switch(type) {
        case GET_RECIPES:
            return { ...state, recipes: payload };
        default:
            return { ...state };
    
    }
}

export default rootReducer;