import React from 'react';

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
        return (
            <div>
                <span onClick={fileClick}>
                    <i className="fas fa-file"></i>
                    {file.name}
                </span>
                <i className="far fa-star" onClick={starClick}></i>
            </div>
        );
    }

    // if (file['.tag'] === 'folder') {
    //     return (
    //         <div>
    //             <span onClick={folderClick}>
    //                 <i className="fas fa-folder"></i>
    //                 {file.name}
    //             </span>
    //
    //             <i className="fas fa-star" onClick={starClick}></i>
    //         </div>
    //     );
    // }  else if (file['.tag'] === 'file' && file.starred) {
    //     return (
    //         <div>
    //             <span onClick={fileClick}>
    //                 <i className="fas fa-file"></i>
    //                 {file.name}
    //             </span>
    //             <i className="fas fa-star" onClick={starClick}></i>
    //         </div>
    //     );
    // } else {
    //     return (
    //         <p></p>
    //     );
    // }

}