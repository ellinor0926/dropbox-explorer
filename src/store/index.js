import { createStore, compose, applyMiddleware } from 'redux';

import reducer from '../reducers';
import thunk from 'redux-thunk';

const composeEnhancer = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

let starredFiles = [];
let token = '';
let files = {};

if (!localStorage.getItem('starredItems') || localStorage.getItem('starredItems').length === 0) {
    console.log('nope')
} else {
    starredFiles = JSON.parse(localStorage.getItem('starredItems'));
}



let initialState = {starredItems: starredFiles, token, files};
export default createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk)
    ));