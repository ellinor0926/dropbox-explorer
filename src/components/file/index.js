import React from 'react';


export default function File({file, fileClick, folderClick, star, starClick}) {
    let itemIcon = 'fas ';
    let starIcon;

    if (file['.tag'] === 'folder') {
        itemIcon += 'fa-folder'
    } else {
        itemIcon += 'fa-file'
    }

    if (file.starred) {
        starIcon = 'fas fa-star'
    } else {
        starIcon = 'far fa-star'
    }
    return (
        <div>
            <span onClick={file['.tag'] === 'folder' ? folderClick : fileClick}>
                <i className={itemIcon}></i>
                {file.name}
            </span>
            <i className={starIcon} onClick={starClick}></i>
            {file['.tag'] === 'file' && <span>{file.client_modified}</span>}
            {file['.tag'] === 'file' && <span>{file.size}</span>}
        </div>
    )

}