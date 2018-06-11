import React from 'react'
import style from './UpToParent.css'
export default function UpToParent({onClick}) {
    return (
        <div className={style.icon}>
            <i className="fas fa-caret-square-up fa-2x" onClick={onClick}> </i>
        </div>

    )
}