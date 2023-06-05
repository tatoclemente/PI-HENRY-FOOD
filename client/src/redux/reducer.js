import { recipes } from "../utils/data";

const initialState = {
    recipes: recipes,
    //recipes: [],
}

const rootReducer = (state=initialState, action) => {
    switch(action.type) {
        default:
            return { ...state };
    
    }
}

export default rootReducer;