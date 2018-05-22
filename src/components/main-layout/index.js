import React, { Component } from 'react';
import {connect, Provider} from 'react-redux';
import store from '../../store'
import Login from '../login';
import ShowFiles from '../files';
import {fetchFiles} from "../../actions";




class MainLayout extends Component {

    componentDidMount() {
    }
    render() {

        return (
        <div>
            {!this.props.accessToken ? (
            <div>
                <Provider store={store}>
                    <Login />
                </Provider>
            </div>) : (
            <div>
                <Provider store={store}>
                    <ShowFiles />
                </Provider>
            </div>
                )}
        </div>
        );
    }
};


export default connect(
    state => ({
        accessToken: state.accessToken
    }),
    {
        fetchFiles
    }
)(MainLayout);



