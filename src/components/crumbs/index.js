import React from 'react'

import style from './Crumbs.css';

export default function Crumbs({onClick, currentPath}) {

    // Splits up the path so we can put them in our crumbs
    let paths = currentPath.split('/').filter(path => path !== '');
    paths.unshift('/');

    // This function lets the user navigate to a new path by clicking on the crumbs
    const goToPath = (path) => {
       const newPath = currentPath.split(path)[0] + path;
       onClick(newPath);
    };

    return (

        <ul className={style.breadCrumbs}>
            {paths.map((path, index) => {
                    return <li
                        key={index}
                        onClick={() => goToPath(path)}
                    >
                        {index === 0
                            ? <i className="fas fa-home fa-lg"></i>
                            : path.toUpperCase()}
                    </li>
            })}
        </ul>

    )
}