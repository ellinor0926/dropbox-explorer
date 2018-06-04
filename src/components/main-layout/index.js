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


class MainLayout extends Component {

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
        this.props.getFilesFromDropbox(path)
    };

    signOut = () => {
        this.props.logOut();
    };

    handleStarredFiles = (file) => {
        //console.log(file);

        if (file.starred) {
            let newStarredArray = this.props.starredFromStore.filter(someFile => someFile!== file.path_lower);
            console.log(newStarredArray);
            localStorage.setItem('starredItems', JSON.stringify(newStarredArray))
        } else {
            const newStarredArray = [...this.props.starredFromStore, file.path_lower];
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
                            files={files}
                            onStarClick={this.handleStarredFiles}
                        />
                        <Upload/>
                        <ShowContent
                            onFolderClick={this.handleNavigation}
                            files={starredItems}
                            onStarClick={this.handleStarredFiles}
                        />
                    </F>
                )}
            </div>
        );
    }
};

const mapStateToProps = state => {

    const currentFiles = state.files[state.currentPath] || [];
    const starredItems = state.starredItems;
    const newStarredItems = [];

    const newFileList = currentFiles
        .map(file => {


            if (starredItems.includes(file.path_lower)){

                const newFile = {
                    ...file,
                    starred: true
                };
                newStarredItems.push(newFile);
                return newFile
            } else {
                return file;
            }
        });





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
