import React from "react";

import Folder from "../folder";
import File from "../file";



export default function ShowContent({onFolderClick, files}) {


    // handleFileClick = (file) => {
    //     let path = {path: file.path_lower};
    //     const dbx = new Dropbox.Dropbox({ accessToken: this.props.token });
    //     dbx.filesGetTemporaryLink(path)
    //         .then(response => window.open(`${response.link}`));
    //
    // };

    let allFiles = files;
    //console.log(allFiles);

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
// onClick={() => this.handleFileClick(file)}
// export default connect(
//     state => ({
//         token: state.token,
//         files: state.files
//     }),
//     {
//         setToken,
//         saveFiles,
//         fetchFiles
//     }
// )(ShowContent);