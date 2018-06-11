import { Dropbox } from "dropbox/dist/Dropbox-sdk";

let instance;

// invoke after successful login
export const createDropbox = accessToken => {
    instance = new Dropbox({ accessToken });
};

// invoke when calling dropbox API.
export const getDropbox = () => {
    return instance;
};


starredItems.filter(item => {
    if (response.entries)
})