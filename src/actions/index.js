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


// action creator: getFilesFromDropbox
export const getFilesFromDropbox = (newPath) => (dispatch, getState) => {

    let currentPath = getState().currentPath;

    const dropboxPath = newPath === "/" ? "" : newPath;
    getDropbox().filesListFolder({path: dropboxPath})
        .then(files => dispatch(saveFiles(files.entries, newPath)))
        .catch(function (error) {
            console.log(error);
        });
};