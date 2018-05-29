import { createStore, compose, applyMiddleware } from 'redux';

import reducer from '../reducers';
import thunk from 'redux-thunk';

const composeEnhancer = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;


export default createStore(
    reducer,
    //initialState,
    composeEnhancer(applyMiddleware(thunk)
    ));