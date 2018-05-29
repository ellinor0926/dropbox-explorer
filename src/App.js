import React from 'react';

import MainLayout from './components/main-layout';
import { Provider } from 'react-redux';
import store from './store'



export default render => {
    render(
        <Provider store={store}>
            <MainLayout/>
        </Provider>
    );
};
