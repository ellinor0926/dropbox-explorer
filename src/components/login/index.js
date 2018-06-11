import React, { Component } from 'react';
import { connect } from 'react-redux';
import {saveToken} from "../../actions";

import Dropbox from "dropbox";
import logo from '../../images/shareLogo_preview.png';
import './login.css'

class Login extends Component {

    // Save token on mount
    componentDidMount() {
      this.props.saveToken();

    }

    render() {
       const CLIENT_ID = 't4n1bbstcjhb69w';
       const dbx = new Dropbox.Dropbox({ clientId: CLIENT_ID });

       const authUrl = dbx.getAuthenticationUrl('https://sharedrops.netlify.com/');

        return (
            <div className='loginLayout'>
                <img className='shareLogo' src={logo} alt=""/>
                <h1 className='shareTitle'>S H A R E</h1>
                <p>To use Share you have to sign in with Dropbox</p>
                <a href={authUrl}>Click here to authenticate</a>
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
        saveToken
    }
)(Login);


