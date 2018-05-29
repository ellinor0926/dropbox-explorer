// reducer that only handles the files key in global state
import { SAVE_FILES } from "../actions";

export default function filesReducer(state = {}, action) {
    switch (action.type) {
        case SAVE_FILES:
            const newState = {...state};
            newState[action.currentPath] = action.files;
            return newState;
        default:
            return state
    }

};