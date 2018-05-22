import React from 'react';

export default function File({ name, onClick }) {

    return(
        <div onClick={onClick}>{name}</div>
    )
}