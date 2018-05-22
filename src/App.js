import React, { Component, Fragment as F } from 'react';
import { Dropbox } from 'dropbox';
// import Login from './components/login';
// import ShowContent from './components/showContent';
import MainLayout from './components/main-layout';
import { Provider } from 'react-redux';
import store from './store'


// const dbx = new Dropbox({ accessToken: getAccessTokenFromUrl() });
//
// dbx.filesListFolder({path: ''})
//     .then(function(response) {
//         console.log(response);
//     })
//     .catch(function(error) {
//         console.log(error);
//     });

export default render => {
    render(
        <Provider store={store}>
            <MainLayout/>
        </Provider>
    );
};
