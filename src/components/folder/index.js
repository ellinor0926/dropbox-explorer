import React from 'react';

export default function Folder({ name, onClick }) {

    return(
        <div onClick={onClick}>{name}</div>
    )
}