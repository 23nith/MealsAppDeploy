import { MEALS } from "../../data/dummy-data";
import { ADD_TO_FAVORITES, SET_FILTER } from "../actions/meals";

const initialState = {
    meals: MEALS,
    filteredMeals: MEALS,
    favorites: [],
    filters: {
        glutenFree: false,
        vegan: false,
        vegetarian: false,
        lactoseFree: false
    }
}

const mealsReducer = (state=initialState, action) => {
    switch(action.type){
        case ADD_TO_FAVORITES:
            const toMark = state.meals.find(item => item.id === action.id);
            // Check if already in the favorites
            const check = state.favorites.findIndex(item => item.id === action.id);
            // Condition if not yet in favorites
            let updatedFavorites;
            if(check === -1){
                // add item to favorites
                updatedFavorites = state.favorites.concat(toMark);
            }
            // Condition if already in favorites
            if(check !== -1){
                // remove item from favorites
                updatedFavorites = state.favorites.filter(item => item.id !== action.id);
            }
            return {
                ...state,
                favorites: updatedFavorites
            }
        case SET_FILTER:
            console.log(JSON.stringify(action.filter));
            const meals = [...state.meals]
            const updatedMeals = meals.filter(meal => {
                if(!meal.isGlutenFree && action.filter.glutenFree){
                    return false;
                }
                if(!meal.isVegan && action.filter.vegan){
                    return false;
                }
                if(!meal.isVegetarian && action.filter.vegetarian){
                    return false;
                }
                if(!meal.isLactoseFree && action.filter.lactoseFree){
                    return false;
                }
                return true;
            })
            return {
                ...state,
                filteredMeals: updatedMeals,
                filters: action.filter
            }
        default:
            return state;
    }
}

export default mealsReducer;