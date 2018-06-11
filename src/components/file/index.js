import React from 'react';

import ImageThumbnail from './image.js'
import style from './FileStyle.css'

export default function File({file, fileClick, folderClick, starClick}) {
    const folder = file['.tag'] === 'folder';
    const fileSize = file.size / 1024;
    const modifiedDate = new Date(file.client_modified).toLocaleDateString();

    let itemIcon = 'far ';
    let starIcon;

    // Check what icon (or image) to display
    if (folder) {
        itemIcon = 'fas fa-folder'
    } else {
        if (file.path_lower.includes('jpg') || file.path_lower.includes('png') ) {
            itemIcon = 'image';
        } else {
            itemIcon = 'fas fa-file'
        }
    }

    // Check if item is starred or not
    if (file.starred) {
        starIcon = 'fas fa-star fa-sm'
    } else {
        starIcon = 'far fa-star fa-sm'
    }

    return (
        <div className={style.container}>
            <span  className={style.nameBar} onClick={folder ? folderClick : fileClick}>
                <span className={folder ? style.folderIcon : style.fileIcon}>
                    {itemIcon === 'image' && <ImageThumbnail file={file}/>}
                    <i className={itemIcon}></i>
                </span>
               <span>{file.name}</span>
            </span>

            <span className={style.metaData}>
                {folder ? '-' : modifiedDate}
            </span>
            <span className={style.metaData}>
                {folder ? '-' : fileSize.toFixed(2) + 'kb'}
            </span>
            <div className={style.starIcon}>
                <i className={starIcon} onClick={starClick}></i>
            </div>
        </div>
    )

}
