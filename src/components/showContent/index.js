import React from "react";
import File from "../file";
import {getDropbox} from "../../dropboxShared";

import style from './ShowContent.css'

export default function ShowContent({onFolderClick, files, onStarClick}) {

     // Lets user download file on click
    const downloadFile = (file) => {
        let path = {path: file.path_lower};

        getDropbox().filesGetTemporaryLink(path)
            .then(response => window.open(`${response.link}`));

    };

    return (

        <div className={style.container}>
            <div className={style.header}>
                <span>Name</span><span className={style.metaCol}>Modified</span><span className={style.metaCol}>Size</span><span> </span>
            </div>

            {files.map((file, i) =>
                <File
                    fileClick={() => downloadFile(file)}
                    folderClick={() => onFolderClick(file.path_lower)}
                    file={file}
                    key={i}
                    starClick={() => onStarClick(file)}
                />
            )}
        </div>
    );

}