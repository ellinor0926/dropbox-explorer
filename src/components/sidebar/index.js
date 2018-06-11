import React from 'react'
import style from './Sidebar.css'

export default function Sidebar({token, currentView, onClick}) {

    return (
        <div className={style.sideBar}>
                {!token ? (
                    <div className="sidebar-links">
                        <div>
                            <p>
                                Hey! Welcome to Share, our project that lets you explore dropbox in a more colorful way.
                                This website was created by Rickard and Ellinor for a school assignment and is using ReactJS, Redux and
                                Dropbox's own javascript SDK. Feel free to follow us! :)
                            </p>
                        </div>
                        <div className="socialLinks">
                            <div>
                                <h3>Ellinor Danielsson</h3>
                                <span><a href="https://github.com/ellinor0926">GitHub</a>  <a href="https://se.linkedin.com/in/ellinor-danielsson-309210153">LinkedIn</a></span>
                            </div>

                            <div>
                                <h3>Rickard Lundby</h3>
                                <span><a href="https://github.com/rlundby">GitHub</a>  <a href="https://se.linkedin.com/in/rickard-lundby">LinkedIn</a></span>
                            </div>
                        </div>
                    </div>
                ):(
                    <ul>
                        <li onClick={() => onClick('starred')}
                            className={(currentView === 'starred' ? 'active' : '')}>
                            <i className="fas fa-star"></i>
                        </li>
                        <li onClick={() => onClick('uploading')}
                            className={(currentView === 'upload' ? 'active' : '')}>Upload
                        </li>
                        <li onClick={() => onClick('home')}
                            className={(currentView === 'home' ? 'active' : '')}>Home
                        </li>
                        <li onClick={() => onClick('sign-out')}
                            className={(currentView === 'sign-out' ? 'active' : '')}>Sign Out
                        </li>
                    </ul>
                )}
        </div>
    )
}
