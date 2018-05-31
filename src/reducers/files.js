// reducer that only handles the files key in global state
import {SAVE_FILES, UPLOAD_FILE_TO_STATE} from "../actions";

export default function filesReducer(state = {}, action) {
    switch (action.type) {
        case SAVE_FILES:
            const newState = {...state};
            newState[action.currentPath] = action.files;
            return newState;
        case UPLOAD_FILE_TO_STATE:
            const newerState = {...state};
            newerState[action.path] = [...newerState[action.path], action.file];
            return newerState;
        default:
            return state
    }

};