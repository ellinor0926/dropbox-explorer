import {ADD_TO_STARRED_ITEMS, REMOVE_FROM_STARRED_ITEMS} from "../actions";


export default function starredItemsReducer(state = [], action) {
    switch (action.type) {
        case ADD_TO_STARRED_ITEMS:
            return [...state, action.file];

        case REMOVE_FROM_STARRED_ITEMS:
           return state.filter(file => file !== action.file);

        default:
            return state
    }

};