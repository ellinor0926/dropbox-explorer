import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getFilesFromDropbox, setToken} from "../../actions";
import { parseQueryString } from '../../utils'
import {createDropbox} from "../../dropboxShared";



class Login extends Component {

    getAccessTokenFromUrl = () => {
       return parseQueryString(window.location.hash).access_token;
    };

    componentDidMount() {
        const token = this.getAccessTokenFromUrl();
        this.props.setToken(token);
        if (token) {
            createDropbox(token);
            this.props.getFilesFromDropbox(this.props.currentPath);
        }


    }



    render() {
        const CLIENT_ID = 't4n1bbstcjhb69w';
        const url = `https://www.dropbox.com/1/oauth2/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=http://localhost:3000/`;

        return (

            <div>
                <a href={url}>Authenticate</a>
            </div>

        );
    }

};

export default connect(
    state => ({
        token: state.token,
        currentPath: state.currentPath
    }),

    {
        setToken,
        getFilesFromDropbox
    }
)(Login);


