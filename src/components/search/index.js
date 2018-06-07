import React, { Component } from 'react';
import {getDropbox} from "../../dropboxShared";
import ShowContent from "../showContent";

export default class Search extends Component {

    state = {
        search: '',
        foundFiles: []
    };

    componentDidMount() {}

    handleChange = event => {
        let k = event.target.value;
        this.setState(prevState => ({
            search: k
        }))
    };

    handleSearch = (stuff) => {

        getDropbox().filesSearch({path: '', query: this.state.search})
            .then(response => {

                for(let match of  response.matches) {
                    console.log(this.state.foundFiles);
                    this.setState(prevState => ({
                        foundFiles: [...prevState.foundFiles, match.metadata]
                    }))
                }
            })
            .catch(error => console.log(error))
    };

    render() {

        return (
            <div>
                <input type="text" onChange={this.handleChange}></input>
                <button onClick={() => this.handleSearch()}>Search</button>
                {this.state.foundFiles &&
                <ShowContent
                    onFolderClick={this.props.onFolderClick}
                    files={this.state.foundFiles}
                    onStarClick={this.props.onStarClick}
                />}
            </div>
        );
    }
};



