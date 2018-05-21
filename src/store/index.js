import { createStore } from 'redux';

import reducer from '../reducers';

const initialState = {
    accessToken: ``
};
export default createStore(
    reducer,
    initialState
);