import React from 'react';
import {getDropbox} from "../../dropboxShared";
import ImageThumb from "./image";

export default function File({file, fileClick, folderClick, star, starClick}) {


    if (file['.tag'] === 'folder' && file.starred) {
        return (

            <div>
                <span onClick={folderClick}>
                    <i className="fas fa-folder"></i>
                    {file.name}
                </span>

                <i className="fas fa-star" onClick={starClick}></i>
            </div>
        );
    } else if (file['.tag'] === 'folder') {
        return (
            <div>
                <span onClick={folderClick}>
                    <i className="fas fa-folder"></i>
                    {file.name}
                </span>
                <i className="far fa-star" onClick={starClick}></i>
            </div>
        );
    } else if (file['.tag'] === 'file' && file.starred) {
        return (
            <div>

                <span onClick={fileClick}>
                    <i className="fas fa-file"></i>
                    {file.name}
                </span>
                <i className="fas fa-star" onClick={starClick}></i>
            </div>
        );
    } else {
        let fileIcon;
        if (file.path_lower.includes('jpg')) {
            fileIcon = <ImageThumb file={file}/>
        } else {
            fileIcon = <i className="fas fa-file"></i>
        }
        return (
            <div>
                <span onClick={fileClick}>
                {fileIcon}
                {file.name}
                </span>
                <i className="far fa-star" onClick={starClick}></i>
            </div>
        );
    }



}