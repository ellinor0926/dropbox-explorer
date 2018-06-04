import { createStore, compose, applyMiddleware } from 'redux';

import reducer from '../reducers';
import thunk from 'redux-thunk';

const composeEnhancer = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

let starredFiles = [];

if (!localStorage.getItem('starredItems') || localStorage.getItem('starredItems').length === 0) {
    console.log('nope')
} else {
    starredFiles = JSON.parse(localStorage.getItem('starredItems'));
    //this.props.loadStarredFilesFromStorage(stars);
    // for (let star of stars ) {
    //     //this.props.handleStarredItems(star);
    // }
}
let initialState = {starredItems: starredFiles};
export default createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk)
    ));