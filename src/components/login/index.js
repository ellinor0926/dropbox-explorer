import React from 'react';
import { connect } from 'react-redux';

import { setToken } from '/school-assignments/dropbox-explorer/src/actions'

const Login = () => {

    const CLIENT_ID = 't4n1bbstcjhb69w';

    const url = `https://www.dropbox.com/1/oauth2/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=http://localhost:3000/`;
    return (
        <div>
            <a href={url}>Authenticate</a>
        </div>
    );
};

export default connect(
    state => ({
      accessToken: store.accessToken
    }),
    {
        setToken
    }
)(Login);


