export const ADD_TO_FAVORITES = "ADD_TO_FAVORITES";
export const SET_FILTER = "SET_FILTER";

export const addToFavorites = id => {
    return {
        type: ADD_TO_FAVORITES,
        id: id
    }
}

export const setFilter = (filter) => {
    return {
        type: SET_FILTER,
        filter: filter
    }
}