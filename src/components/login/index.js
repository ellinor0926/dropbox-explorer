import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getFilesFromDropbox, saveToken} from "../../actions";

import Dropbox from "dropbox";



class Login extends Component {

    componentDidMount() {
      this.props.saveToken();

    }

    render() {
       const CLIENT_ID = 't4n1bbstcjhb69w';
       const dbx = new Dropbox.Dropbox({ clientId: CLIENT_ID });

       const authUrl = dbx.getAuthenticationUrl('http://localhost:3000/');

        return (

            <div>
                <a href={authUrl}>Authenticate</a>
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
        getFilesFromDropbox,
        saveToken
    }
)(Login);


