import React, {Component, Fragment as F} from 'react';
import {connect} from 'react-redux';
import Login from '../login';
import ShowContent from '../showContent';
import {getFilesFromDropbox, logOut, setCurrentPath, setToken} from "../../actions";
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


    render() {
        const { currentPath, files, token } = this.props;

        return (
            <div>
                {!token ? (
                    <Login/>
                ) : (
                    <F>
                     <button onClick={this.signOut} className="btn btn-lg">Sign Out</button>
                    {currentPath !== '/' && <Crumbs onClick={this.handleNavigation} currentPath={currentPath}/> }
                    {currentPath !== '/' && <button  className="btn" onClick={this.upToParent}>Up to parent</button>}
                    <ShowContent
                        onFolderClick={this.handleNavigation}
                        files={files[currentPath]}
                        />
                        <Upload/>
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
        currentPath: state.currentPath
    }),
    {
        setToken,
        setCurrentPath,
        getFilesFromDropbox,
        logOut
    }
)(MainLayout);



