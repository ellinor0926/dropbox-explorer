import { SET_TOKEN } from '../actions'

export default (state, action) => {
    switch (action.type) {
        case SET_TOKEN:
            return {
                accessToken: action.token
            };
        default:
            return state;
    }
}