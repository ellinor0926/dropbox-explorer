import {SAVE_FILES, SET_TOKEN} from '../actions'

export default (state, action) => {
    switch (action.type) {
        case SET_TOKEN:
            return {
                accessToken: action.token
            };
        case SAVE_FILES:
            return {
              files: action.files
            };
        default:
            return state;
    }
}