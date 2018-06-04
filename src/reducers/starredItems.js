import {ADD_TO_STARRED_ITEMS, LOAD_STARED_FILES_FROM_STORAGE, REMOVE_FROM_STARRED_ITEMS} from "../actions";


export default function starredItemsReducer(state = [], action) {
    switch (action.type) {
        case ADD_TO_STARRED_ITEMS:
            console.log('adding star for ' + action.file.path_lower);
            return [...state, action.file.path_lower];

        case REMOVE_FROM_STARRED_ITEMS:
           return state.filter(file => file !== action.file.path_lower);

        case LOAD_STARED_FILES_FROM_STORAGE:
            return action.files;

        default:
            return state
    }

};