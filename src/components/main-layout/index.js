import React, {Component, Fragment as F} from 'react';
import {connect} from 'react-redux';
import Login from '../login';
import ShowContent from '../showContent';
import {getFilesFromDropbox, setCurrentPath, setToken} from "../../actions";
import Crumbs from "../crumbs";


class MainLayout extends Component {

    componentDidMount() {

    }

    handleNavigation = (path) => {
        this.props.setCurrentPath(path);

        if (!this.props.files[path]) {
            this.props.getFilesFromDropbox(path)
        }

    };


    render() {
        const { currentPath, files, token } = this.props;

        return (
            <div>
                {!token ? (
                    <Login/>
                ) : (
                    <F>
                        <Crumbs onClick={this.handleNavigation} currentPath={currentPath}/>
                        <ShowContent
                            onFolderClick={this.handleNavigation}
                            files={files[currentPath]}
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
        currentPath: state.currentPath
    }),
    {
        setToken,
        setCurrentPath,
        getFilesFromDropbox
    }
)(MainLayout);



