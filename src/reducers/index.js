//import {SAVE_FILES, SET_TOKEN} from '../actions'
import { combineReducers } from 'redux'

import files from './files';
import token from './token';
import currentPath from './currentPath';

// export default (state, action) => {
//     switch (action.type) {
//         case SET_TOKEN:
//             return {
//                 ...state,
//                 accessToken: action.token
//             };
//         case SAVE_FILES:
//             return {
//                 ...state,
//               files: action.files
//             };
//         default:
//             return state;
//     }
// }

export default combineReducers({
    files,
    token,
    currentPath
})

