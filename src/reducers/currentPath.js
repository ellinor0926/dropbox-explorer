import {SET_CURRENT_PATH} from "../actions";

export default function currentPathReducer(state = '/', action) {
    switch (action.type) {
        case SET_CURRENT_PATH:
            return action.path;
        default:
            return state
    }

};