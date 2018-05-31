import React, {Component, Fragment as F} from 'react';
import {connect} from 'react-redux';
import Login from '../login';
import ShowContent from '../showContent';
import {getFilesFromDropbox, handleStarredItems, logOut, setCurrentPath, setToken} from "../../actions";
import Crumbs from "../crumbs";
import Upload from "../upload";


class MainLayout extends Component {

    componentDidMount() {
        if (!localStorage.getItem('starredItems') || localStorage.getItem('starredItems').length === 0) {
            console.log('nope')
        } else {
            const stars = JSON.parse(localStorage.getItem('starredItems'));
            for (let star of stars) {
                this.props.handleStarredItems(star)
            }
        }
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
        this.props.getFilesFromDropbox(path)
    };

    signOut = () => {
        this.props.logOut();
    };

    handleStarredFiles = (file) => {
        let starredFiles = [];
        if (localStorage.starredItems) {
            starredFiles = JSON.parse(localStorage.getItem('starredItems'));
        }
        if (file.starred) {
            let newStarredArray = starredFiles.filter(someFile => someFile.id !== file.id);
            console.log(newStarredArray);
            localStorage.setItem('starredItems', JSON.stringify(newStarredArray))
        } else {
            const newStarredArray = [...starredFiles, file];
            localStorage.setItem('starredItems', JSON.stringify(newStarredArray))
        }

        this.props.handleStarredItems(file);

    };


    render() {
        const {currentPath, files, token, starredItems } = this.props;

        return (
            <div>
                {!token ? (
                    <Login/>
                ) : (
                    <F>
                        <button onClick={this.signOut} className="btn btn-lg">Sign Out</button>
                        {currentPath !== '/' && <Crumbs onClick={this.handleNavigation} currentPath={currentPath}/>}
                        {currentPath !== '/' && <button className="btn" onClick={this.upToParent}>Up to parent</button>}
                        <ShowContent
                            onFolderClick={this.handleNavigation}
                            files={files[currentPath]}
                            starredItems={starredItems}
                            onStarClick={this.handleStarredFiles}
                        />
                        <Upload/>
                        <ShowContent
                            onFolderClick={this.handleNavigation}
                            files={starredItems}
                            starredItems={starredItems}
                            onStarClick={this.handleStarredFiles}
                        />
                    </F>
                )}
            </div>
        );
    }
};


export default connect(
    state => ({
        token: state.token,
        files: state.files,
        currentPath: state.currentPath,
        starredItems: state.starredItems
    }),
    {
        setToken,
        setCurrentPath,
        getFilesFromDropbox,
        logOut,
        handleStarredItems
    }
)(MainLayout);
