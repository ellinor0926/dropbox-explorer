import {Dropbox} from "dropbox/src/index";


export const SET_TOKEN = 'SET_TOKEN';
export const SAVE_FILES = 'SAVE_FILES';

export const setToken = token => ({
    type: SET_TOKEN,
    token
});

export const saveFiles = files => ({
    type: SAVE_FILES,
    files
});

export const fetchFiles = (token, path = '') => (dispatch) => {
    const dbx = new Dropbox({ accessToken: token});

    dbx.filesListFolder({path: path})
        .then(function(response) {
           dispatch(saveFiles(response.entries))
        })
        .catch(function(error) {
            console.log(error);
        });
}