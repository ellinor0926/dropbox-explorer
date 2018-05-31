//import {Dropbox} from "dropbox/src/index";
import {createDropbox, getDropbox} from "../dropboxShared";
import {parseQueryString} from "../utils";

export const SET_TOKEN = 'SET_TOKEN';
export const SAVE_FILES = 'SAVE_FILES';
export const SET_CURRENT_PATH = 'SET_CURRENT_PATH';
export const UPLOAD_FILE_TO_STATE = 'UPLOAD_FILE_TO_STATE';
export const ADD_TO_STARRED_ITEMS = 'ADD_TO_STARRED_ITEMS';
export const REMOVE_FROM_STARRED_ITEMS = 'REMOVE_FROM_STARRED_ITEMS';

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

export const uploadFileToState = (file, path) => ({
    type: UPLOAD_FILE_TO_STATE,
    file,
    path
});

export const addToStarredItems = (file) => ({
    type: ADD_TO_STARRED_ITEMS,
    file
});

export const removeFromStarredItems = (file) => ({
    type: REMOVE_FROM_STARRED_ITEMS,
    file
});


// action creator: getFilesFromDropbox
export const getFilesFromDropbox = (newPath) => (dispatch, getState) => {

    //const currentPath = getState().currentPath;
    dispatch(setCurrentPath(newPath));

    if (!getState().files[newPath]) {
        const dropboxPath = newPath === "/" ? "" : newPath;
        getDropbox().filesListFolder({path: dropboxPath})
            .then(files => dispatch(saveFiles(files.entries, newPath)))
            .catch(function (error) {
                console.log(error);
            });
    }

};

// action creator: saveTheToken
export const saveToken = () => (dispatch, getState) => {

    let token;
    if (localStorage.getItem('token')) {
        token = localStorage.getItem('token');

    } else {
        token = parseQueryString(window.location.hash).access_token;
        if (!token) {
            return;
        }
        localStorage.setItem('token', token);

        // After saving the token - remove the token from URL
        window.location.replace('http://localhost:3000');
    }

    createDropbox(token);

    dispatch(getFilesFromDropbox('/'));
    dispatch(setToken(token));

};

export const logOut = () => (dispatch, getState) => {

    localStorage.removeItem('token');
    dispatch(setToken(''));
    getDropbox().authTokenRevoke()
        .then(() => console.log('loggar ut'));

};

export const uploadFile = (file, path) => (dispatch, getState) => {

    getDropbox().filesUpload({path: path + file.name, contents: file})
        .then(function (response) {
            console.log(response);
            dispatch(uploadFileToState(response, path))
        })
        .catch(function (error) {
            console.error(error);
        });

};

export const handleStarredItems = (file) => (dispatch, getState) => {

    if (file.starred === true) {
        dispatch(removeFromStarredItems(file))
    } else {
        dispatch(addToStarredItems(file))
    }
    //localStorage.setItem('starredItems', JSON.stringify(getState().starredItems))

};