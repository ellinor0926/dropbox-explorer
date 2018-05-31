
import { combineReducers } from 'redux'

import files from './files';
import token from './token';
import currentPath from './currentPath';

export default combineReducers({
    files,
    token,
    currentPath
})
