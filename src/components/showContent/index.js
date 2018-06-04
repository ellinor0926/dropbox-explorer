import React from "react";
import File from "../file";
import {getDropbox} from "../../dropboxShared";



export default function ShowContent({onFolderClick, files, starredItems, onStarClick}) {

    const downloadFile = (file) => {
        let path = {path: file.path_lower};

        getDropbox().filesGetTemporaryLink(path)
            .then(response => window.open(`${response.link}`));

    };


    return (

        files
            ?
            (
                <div>
                    <p>All files fetched!</p>

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
            ) : (
                <p> Loading files ....</p>
            )
    );

}