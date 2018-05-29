import React from 'react'
export default function Crumbs({onClick, currentPath}) {

    const paths = currentPath.split('/');


    const goToPath = (path) => {
        console.log(paths);
       const newPath = currentPath.split(path)[0] + path;
       onClick(newPath);
    };

    return (

        <div>
            {paths.map((path, i) => {
                if (i === 0) {
                    return <span key={i} onClick={() => goToPath(path)}>Home</span>
                } else {
                    return <span key={i} onClick={() => goToPath(path)}>/{path}</span>
                }

            })}
        </div>
    )
}