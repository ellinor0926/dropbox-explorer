import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setToken} from "../../actions";
import { parseQueryString } from '../../utils'



class Login extends Component {

    getAccessTokenFromUrl = () => {
       return parseQueryString(window.location.hash).access_token;


    };
    componentDidMount() {
        const dbx = this.getAccessTokenFromUrl();
        this.props.setToken(dbx);
    }

    render() {
        const CLIENT_ID = 't4n1bbstcjhb69w';
        const url = `https://www.dropbox.com/1/oauth2/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=http://localhost:3000/`;

        return (
            !this.props.accessToken
                ?
            <div>
                <a href={url}>Authenticate</a>
            </div>
                : `Nice, you've logged in with authtoken: ${this.props.accessToken} `
        );
    }

};

export default connect(
    state => ({
      accessToken: state.accessToken
    }),

    {
        setToken
    }
)(Login);


