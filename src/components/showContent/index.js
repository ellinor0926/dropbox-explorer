import React from "react";
import Folder from "../folder";
import File from "../file";
import {getDropbox} from "../../dropboxShared";



export default function ShowContent({onFolderClick, files}) {


    let allFiles = files;

    const downloadFile = (file) => {
        let path = {path: file.path_lower};

        getDropbox().filesGetTemporaryLink(path)
            .then(response => window.open(`${response.link}`));

    };


    return (
        allFiles
            ?
            (
                <div>
                    <p>All files fetched!</p>

                    {allFiles.map((file, i) =>
                        file['.tag'] === 'folder'
                            ? (
                                <Folder
                                    name={file.name}
                                    key={i}
                                    onClick={() => onFolderClick(file.path_lower)}
                                />
                            ) : (
                                <File
                                    onClick={() => downloadFile(file)}
                                    name={file.name}
                                    key={i}

                                />
                            ))}


                </div>
            ) : (
                <p> Loading files ....</p>
            )
    );

}