import React, {Component, Fragment as F} from 'react';
import {connect} from 'react-redux';
import Login from '../login';
import LogOut from '../LogOut'
import ShowContent from '../showContent';
import {
    getFilesFromDropbox,
    handleStarredItems,
    logOut,
    setToken
} from "../../actions";
import Crumbs from "../crumbs";
import Upload from "../upload";
import style from './main-layout.css'
import {CSSTransitionGroup} from 'react-transition-group';
import {getDropbox} from "../../dropboxShared";
import Search from "../search"


class MainLayout extends Component {

    state = {
        currentView: 'home',
        signingOut: false
    };

    componentDidMount() {

    }

    upToParent = () => {
        // Splits up the current path and removes last element
        const newPathArray = this.props.currentPath.split('/');
        newPathArray.pop();

        // Back together they go! :)
        let newPath = newPathArray.join('/');

        // If the parent is root, do one thing, otherwise do something else
        newPath === '' ? this.handleNavigation('/') : this.handleNavigation(newPath)

    };

    handleNavigation = (path) => {
        // Gets files from new path
        this.props.getFilesFromDropbox(path)
    };

    signOut = (value) => {
        // Signs the user out
        if (value === 'logout') {
            this.props.logOut();
        } else {
            this.setState({
                signingOut: false
            })
        }

    };

    handleStarredFiles = (file) => {
        // If the file is already starred, we want the click to remove it from local storage
        if (file.starred) {
            let newStarredArray = this.props.starredFromStore.filter(someFile => someFile !== file.path_lower);
            console.log(newStarredArray);
            localStorage.setItem('starredItems', JSON.stringify(newStarredArray))
        }  // If the file ISN'T starred, we want the click to add it to local storage
        else {
            const newStarredArray = [...this.props.starredFromStore, file.path_lower];
            localStorage.setItem('starredItems', JSON.stringify(newStarredArray))
        }
        // Changes the starred items in state
        this.props.handleStarredItems(file);

    };

    handleListClick = (clicked) => {
        if (clicked === 'search') {
            this.setState(prevState => ({
                searching: true,
            }));
        }  else if (clicked === 'sign-out') {
            this.setState(prevState => ({
                signingOut: true
            }));
        } else {
            this.setState(prevState => ({
                currentView: clicked,
                searching: false
            }));
        }
    };


    render() {
        const {currentPath, files, token, starredItems} = this.props;

        if (token && !this.state.userName) {
            getDropbox().usersGetCurrentAccount()
                .then(response => this.setState(prevState => ({
                    userName: response.name.given_name
                })))

        }

        return (
            <div className={style.mainGrid}>
                <div className={style.sideBar}>
                    <CSSTransitionGroup
                        transitionName="fade"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={500}
                    >
                        {!token ? (
                            <div className="sidebar-links">
                                <div>
                                    <p>
                                        Hey! Welcome to Share, our project that let's you explore dropbox in a more colorful way.
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
                            <li onClick={() => this.handleListClick('starred')}
                                className={(this.state.currentView === 'starred' ? 'active' : '')}>
                                <i className="fas fa-star"></i>
                            </li>
                            <li onClick={() => this.handleListClick('upload')}
                                className={(this.state.currentView === 'upload' ? 'active' : '')}>Upload
                            </li>
                            <li onClick={() => this.handleListClick('home')}
                                className={(this.state.currentView === 'home' ? 'active' : '')}>Home
                            </li>
                            <li onClick={() => this.handleListClick('sign-out')}
                                className={(this.state.currentView === 'sign-out' ? 'active' : '')}>Sign Out
                            </li>
                        </ul>
                            )}
                    </CSSTransitionGroup>
                </div>
                {!token ? (
                    <div className={style.mainArea}>
                        <Login/>
                    </div>
                ) : (

                    <div className={style.mainArea}>
                        {this.state.signingOut && <LogOut onLogout={this.signOut}/>}

                        {this.state.currentView === 'home' && <F>
                           <div className={style.homeHeader}>
                                <h1 className="siteHeaders"> Dropbox Explorer</h1>
                                <div className='showSearch'>
                                    <Search onFolderClick={this.handleNavigation}
                                            onStarClick={this.handleStarredFiles}/>
                                </div>
                           </div>
                            <Crumbs onClick={this.handleNavigation} currentPath={currentPath}/>
                            {currentPath !== '/' && <i className="far fa-caret-square-up fa-2x" onClick={this.upToParent}></i>}

                            <ShowContent
                                onFolderClick={this.handleNavigation}
                                files={files}
                                onStarClick={this.handleStarredFiles}
                            />
                        </F>}
                        {this.state.currentView === 'upload' && <F>
                            <h1 className="siteHeaders">Upload Files</h1>
                            <Crumbs onClick={this.handleNavigation} currentPath={currentPath}/>
                            <Upload/>
                        </F>}
                        {this.state.currentView === 'starred' && <F>
                            <h1 className="siteHeaders">Starred Files</h1>
                            <ShowContent
                                onFolderClick={this.handleNavigation}
                                files={starredItems}
                                onStarClick={this.handleStarredFiles}
                            />
                        </F>}
                    </div>
                )}
            </div>
        );
    }
}

// Creates different arrays in state
const mapStateToProps = state => {

    const currentFiles = state.files[state.currentPath] || [];
    const starredItems = state.starredItems;
    const newStarredItems = [];

    // Get all items in current path and add starred true if starred.
    const newFileList = currentFiles
        .map(file => {
            if (starredItems.includes(file.path_lower)) {

                const newFile = {
                    ...file,
                    starred: true
                };
                return newFile
            } else {
                return file;
            }
        });
    // Gets all the starred items and adds them to array
    for (let path in state.files) {
        state.files[path].map(file => {
            if (starredItems.includes(file.path_lower)) {
                const newFile = {
                    ...file,
                    starred: true
                };
                newStarredItems.push(newFile);
                return newFile;
            } else {
                return file;
            }
        })

    }

    return {
        token: state.token,
        files: newFileList,
        starredFromStore: state.starredItems,
        starredItems: newStarredItems,
        currentPath: state.currentPath
    }
};

export default connect(
    mapStateToProps,
    {
        setToken,
        getFilesFromDropbox,
        logOut,
        handleStarredItems,
    }
)(MainLayout);
