import React from 'react';

import ImageThumbnail from './image.js'
import style from './FileStyle.css'

export default function File({file, fileClick, folderClick, starClick}) {
    let itemIcon = 'far ';
    let starIcon;
    let folder = file['.tag'] === 'folder';

    if (folder) {
        itemIcon += 'fa-folder-open'
    } else {
        if(file.path_lower.includes('jpg')) {
            itemIcon = 'image';
        } else {
            itemIcon += 'fa-file'
        }
    }

    if (file.starred) {
        starIcon = 'fas fa-star fa-sm'
    } else {
        starIcon = 'far fa-star fa-sm'
    }
    return (
        <div className={style.container}>
            <span onClick={folder ? folderClick : fileClick}>
                <span className={folder ? style.folderIcon : style.fileIcon}>
                    {itemIcon === 'image' && <ImageThumbnail file={file} />}
                    <i className={itemIcon}></i>
                </span>
               <span>{file.name}</span>
            </span>

            {folder ? <span className={style.metaData}> - </span> : <span className={style.metaData}>{new Date(file.client_modified).toLocaleDateString() }</span>}
            {folder ? <span className={style.metaData}> - </span> : <span className={style.metaData}>{file.size / 1000}kb</span>}
           <div className={style.starIcon}><i className={starIcon} onClick={starClick}></i></div>
        </div>
    )

}
