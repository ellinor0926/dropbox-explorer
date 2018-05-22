import React from 'react';

export default function Folder({ name, onClick }) {

    return(
        <div onClick={onClick}><i className="fas fa-folder"></i>{name}</div>
    )
}