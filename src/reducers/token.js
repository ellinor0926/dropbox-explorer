import { SET_TOKEN } from "../actions";

export default function tokenReducer(state = '', action) {
    switch (action.type) {
        case SET_TOKEN:
            if (action.token) {
                return action.token;
            }
            return state;


        default:
            return state
    }
}