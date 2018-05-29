import { Dropbox } from "dropbox/src/index";

let instance;

// invoke after successful login
export const createDropbox = accessToken => {
    instance = new Dropbox({ accessToken });
    console.log(instance);
};

// invoke when calling dropbox API.
export const getDropbox = () => {
    console.log('from getDropbox', instance);
    return instance;
};