import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import isomorphic_fetch from "isomorphic-fetch";
import {Dropbox} from "dropbox";

const dbx = new Dropbox({ accessToken: 'c7DtuxqbUkAAAAAAAAAAYG_K2MS76Mo7a5AClLFEHeM4I6gGyXo4jVGSJ_yC38J-' });

dbx.filesListFolder({path: ''})
    .then(function(response) {
        console.log(response);
    })
    .catch(function(error) {
        console.log(error);
    });

class App extends Component {
  render() {
    return (
      <div className="App">
          <a href="https://www.dropbox.com/1/oauth2/authorize?client_id=t4n1bbstcjhb69w&response_type=token&redirect_uri=http://localhost">Link</a>
      </div>
    );
  }
}

export default App;
