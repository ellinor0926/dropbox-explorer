import React, {Component, Fragment as F} from 'react';
import {connect} from 'react-redux';
import Login from '../login';
import LogOut from '../LogOut'
import ShowContent from '../showContent';
import {
    getFilesFromDropbox,
    handleStarredItems,
    logOut, setCurrentPath,
    setToken
} from "../../actions";
import Crumbs from "../crumbs";
import Upload from "../upload";
import style from './main-layout.css'
import {getDropbox} from "../../dropboxShared";
import Search from "../search"
import UpToParent from "../UpToParent";
import Sidebar from "../sidebar";


class MainLayout extends Component {

    // This is the local state - it helps us navigate what to show on the site
    state = {
        currentView: 'home',
        signingOut: false,
        uploading: false
    };

    componentDidMount() {
        if(this.props.starredFromStore.length > 0) {

            this.props.starredFromStore.map(item => {
                const newArray = item.split('/');
                newArray.pop();
                let newPath = newArray.join('/');
                newPath === '' ? null : this.props.getFilesFromDropbox(newPath)
            });

            this.props.setCurrentPath('/');
        }
    }

    // The up to parent button
    upToParent = () => {
        // Splits up the current path and removes last element
        const newPathArray = this.props.currentPath.split('/');
        newPathArray.pop();

        // Back together they go! :)
        let newPath = newPathArray.join('/');

        // If the parent is root, do one thing, otherwise do something else
        newPath === '' ? this.handleNavigation('/') : this.handleNavigation(newPath)

    };

    // This function handles navigations on site
    handleNavigation = (path) => {
        this.setState({
            currentView: 'home'
        });
        // Gets files from new path
        this.props.getFilesFromDropbox(path)
    };

    // This function toggles the sign out modal
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

    // This function handles the starring of files
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

    // This function handles the sidebar links and displays the correct content on site
    handleListClick = (clicked) => {
        if (clicked === 'search') {
            this.setState({
                searching: true,
            });
        }  else if (clicked === 'sign-out') {
            this.setState({
                signingOut: true
            });
        } else if (clicked === 'uploading') {
            this.setState({
                uploading: true
            });
        }
            else {
            this.setState({
                currentView: clicked,
                searching: false,
                uploading: false
            });
        }
    };

    toggleUpload = () => {
        this.setState( prevState => ({
            uploading: !prevState.uploading
        }))
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
                <Sidebar
                    token={token}
                    currentView={this.state.currentView}
                    onClick={this.handleListClick}
                />
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


                            <span className="navIcons">
                                <Crumbs onClick={this.handleNavigation} currentPath={currentPath}/>
                                {currentPath !== '/' && <UpToParent onClick={this.upToParent}/>}
                            </span>
                            

                            <ShowContent
                                onFolderClick={this.handleNavigation}
                                files={files}
                                onStarClick={this.handleStarredFiles}
                            />
                        </F>}
                        {this.state.uploading && <F>
                            <Upload uploadToggle={this.toggleUpload}/>
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
        setCurrentPath
    }
)(MainLayout);
