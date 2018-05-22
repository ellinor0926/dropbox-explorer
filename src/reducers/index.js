import {SAVE_FILES, SET_TOKEN} from '../actions'

export default (state, action) => {
    switch (action.type) {
        case SET_TOKEN:
            return {
                ...state,
                accessToken: action.token
            };
        case SAVE_FILES:
            return {
                ...state,
              files: action.files
            };
        default:
            return state;
    }
}