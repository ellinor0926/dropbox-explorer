import React from 'react';

import style from './LogOut.css'

export default function LogOut({onLogout}) {

    return (
        <div className={style.logoutModal}>
            <div className={style.modalContent}>
                <span className={style.close} onClick={() => onLogout(false)}>&times;</span>
                <h3>Are you sure you want to sign out?</h3>
                <div className={style.buttons}>
                    <button
                        onClick={() => onLogout('logout')}
                        className={`${style.btn} ${style.logoutBtn}`}
                    >
                        Yes, I've had enough :(
                    </button>
                    <button
                        onClick={() => onLogout(false)}
                        className={`${style.btn} ${style.theOtherBtn}`}
                    >
                        No, I want to stay :)
                    </button>
                </div>
            </div>
        </div>
    )

}
