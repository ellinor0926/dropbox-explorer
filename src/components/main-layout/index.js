import React, { Component } from 'react';
import {connect} from 'react-redux';
import Login from '../login';
import ShowFiles from '../files';
import {fetchFiles, setToken} from "../../actions";




class MainLayout extends Component {

    componentDidMount() {
    }
    render() {

        return (
        <div>
            {!this.props.accessToken ? (
                <Login />
            ) : (
                <ShowFiles />
                )}
        </div>
        );
    }
};


export default connect(
    state => ({
        accessToken: state.accessToken,
        files: state.files
    }),
    {
        setToken,
        fetchFiles
    }
)(MainLayout);



