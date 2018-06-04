import React from 'react';
import {getDropbox} from "../../dropboxShared";

export default function ImageThumb({file}) {

    getDropbox().filesGetThumbnail({path: file.path_lower, size: "w128h128"})
        .then((response) => {
            let fileName = file.name;
            let imageUrl = URL.createObjectURL(response.fileBlob);
            const img = document.getElementById(`${fileName}`);
            img.addEventListener('load', () => URL.revokeObjectURL(imageUrl));
            document.getElementById(`${fileName}`).src = imageUrl;
        });

    return (
        <img id={file.name} src="" alt=""/>
    )
}