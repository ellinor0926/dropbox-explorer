import React, { Component } from 'react';
import {connect} from 'react-redux';
import Login from '../login';
import ShowContent from '../showContent';
import { getFilesFromDropbox, setCurrentPath, setToken} from "../../actions";





class MainLayout extends Component {

    componentDidMount() {

    }

    handleFolderClick = (path) => {
        this.props.setCurrentPath(path);

        if (!this.props.files[path]) {
            this.props.getFilesFromDropbox()
        }

    };


    render() {

        return (
        <div>
            {!this.props.token ? (
                <Login />
            ) : (
                <ShowContent
                    onFolderClick={this.handleFolderClick}
                    files={this.props.files[this.props.currentPath]}
                />
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
        getFilesFromDropbox
    }
)(MainLayout);



