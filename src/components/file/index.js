import React from 'react';

export default function File({ name, onClick }) {

    return(
        <div onClick={onClick}><i className="fas fa-file"></i>{name}</div>
    )
}