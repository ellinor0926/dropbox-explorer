import { SET_TOKEN } from "../actions";

export default function tokenReducer(state = '', action) {
    switch (action.type) {
        case SET_TOKEN:
            return action.token;
        default:
            return state
    }
}