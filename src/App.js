import React, { Component } from 'react';
import './App.css';
import { Dropbox } from 'dropbox';
import Login from './components/login';
import { Provider } from 'react-redux';
import store from './store'


const parseQueryString = (str) => {
    const ret = Object.create(null);

    if (typeof str !== 'string') {
        return ret;
    }

    str = str.trim().replace(/^(\?|#|&)/, '');

    if (!str) {
        return ret;
    }

    str.split('&').forEach(function (param) {
        const parts = param.replace(/\+/g, ' ').split('=');
        // Firefox (pre 40) decodes `%3D` to `=`
        // https://github.com/sindresorhus/query-string/pull/37
        let key = parts.shift();
        let val = parts.length > 0 ? parts.join('=') : undefined;

        key = decodeURIComponent(key);

        // missing `=` should be `null`:
        // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
        val = val === undefined ? null : decodeURIComponent(val);

        if (ret[key] === undefined) {
            ret[key] = val;
        } else if (Array.isArray(ret[key])) {
            ret[key].push(val);
        } else {
            ret[key] = [ret[key], val];
        }
    });

    return ret;
};

function getAccessTokenFromUrl() {
    return parseQueryString(window.location.hash).access_token;
}

const dbx = new Dropbox({ accessToken: getAccessTokenFromUrl() });

dbx.filesListFolder({path: ''})
    .then(function(response) {
        console.log(response);
    })
    .catch(function(error) {
        console.log(error);
    });

export default render => {
    render(
        <Provider store={store}>
            <Login />
        </Provider>
    );
};
