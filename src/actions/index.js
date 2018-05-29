//import {Dropbox} from "dropbox/src/index";
import {getDropbox} from "../dropboxShared";

export const SET_TOKEN = 'SET_TOKEN';
export const SAVE_FILES = 'SAVE_FILES';
export const SET_CURRENT_PATH = 'SET_CURRENT_PATH';

export const setToken = token => ({
    type: SET_TOKEN,
    token
});

export const saveFiles = (files, currentPath) => ({
    type: SAVE_FILES,
    files,
    currentPath
});

export const setCurrentPath = (path) => ({
    type: SET_CURRENT_PATH,
    path
});

export const fetchFiles = (token, path = '') => (dispatch, getState) => {
    //const dbx = new Dropbox({ accessToken: token});

    getDropbox().filesListFolder({path: path})
        .then(function(response) {
           if (path === '') {
               path = '/'
           }
           // dispatch(saveFiles(response.entries));
           dispatch(saveFiles({[path]: response.entries}));
            console.log('path:', path, 'entries:', response.entries);
        })
        .catch(function(error) {
            console.log(error);
        });
};

// action creator: getFilesFromDropbox
export const getFilesFromDropbox = () => (dispatch, getState) => {
    let currentPath = getState().currentPath;

    if (currentPath === '/') {
        getDropbox().filesListFolder({path: ''})
            .then(files => dispatch(saveFiles(files.entries, currentPath)))
            .catch(function(error) {
                console.log(error);
            });
    } else {
        getDropbox().filesListFolder({path: currentPath})
            .then(files => dispatch(saveFiles(files.entries, currentPath)))
            .catch(function(error) {
                console.log(error);
            });
    }

};