import React, {Component, Fragment as F} from 'react';
import {connect} from 'react-redux';
import Login from '../login';
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
import { CSSTransitionGroup } from 'react-transition-group';
import {getDropbox} from "../../dropboxShared";


class MainLayout extends Component {

    state = {
        currentView: 'home'
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

    signOut = () => {
        // Signs the user out
        this.props.logOut();
    };

    handleStarredFiles = (file) => {
        // If the file is already starred, we want the click to remove it from local storage
        if (file.starred) {
            let newStarredArray = this.props.starredFromStore.filter(someFile => someFile!== file.path_lower);
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

        this.setState(prevState =>({
            currentView: clicked
        }));

    };

    render() {
        const {currentPath, files, token, starredItems } = this.props;

        if(token && !this.state.userName) {
            getDropbox().usersGetCurrentAccount()
                .then(response => this.setState(prevState => ({
                    userName: response.name.given_name
                })))

        }

        return (
            <div className={style.mainGrid}>
                <div className={style.sideBar}>
                    {this.state.userName && <h1 className={style.userName}>Welcome {this.state.userName}! Let's start sharing.</h1>}
                    <CSSTransitionGroup
                        transitionName="fade"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={500}
                    >
                    <ul>
                        <li onClick={() => this.handleListClick('starred')} className={(this.state.currentView === 'starred' ? 'active' : '')}>
                            <i className="fas fa-star"></i>
                        </li>
                        <li onClick={() => this.handleListClick('upload')} className={(this.state.currentView === 'upload' ? 'active' : '')}>Upload</li>
                        <li onClick={() => this.handleListClick('home')} className={(this.state.currentView === 'home' ? 'active' : '')}>Home</li>
                        <li onClick={() => this.handleListClick('sign-out')} className={(this.state.currentView === 'sign-out' ? 'active' : '')}>Sign Out</li>
                    </ul>
                    </CSSTransitionGroup>
                </div>
                {!token ? (
                    <div className={style.mainArea}>
                        <Login/>
                    </div>
                ) : (

                    <div className={style.mainArea}>
                        <button onClick={this.signOut} className="btn btn-lg">Sign Out</button>
                        {currentPath !== '/' && <Crumbs onClick={this.handleNavigation} currentPath={currentPath}/>}
                        {currentPath !== '/' && <button className="btn" onClick={this.upToParent}>Up to parent</button>}
                        {this.state.currentView === 'home' && <F>
                            <h1> Dropbox Explorer</h1>
                            <ShowContent
                            onFolderClick={this.handleNavigation}
                            files={files}
                            onStarClick={this.handleStarredFiles}
                            />
                        </F>}
                        {this.state.currentView === 'upload' && <F><h1>Upload Files</h1><Upload/></F>}
                        {this.state.currentView === 'starred' &&  <F>
                            <h1>Starred Files</h1>
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
            if (starredItems.includes(file.path_lower)){

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
    for(let path in state.files) {
        state.files[path].map(file => {
            if(starredItems.includes(file.path_lower)) {
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
