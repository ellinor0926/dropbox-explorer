import { bindActionCreators } from 'redux';

export const SET_TOKEN = 'SET_TOKEN';


const actionCreator = {
    setToken: token => ({
        type: SET_TOKEN,
        token
    })
};

export default store => bindActionCreators(actionCreator, store.dispatch)