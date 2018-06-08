import React, { Component } from 'react';
import {getDropbox} from "../../dropboxShared";
import ShowContent from "../showContent";
import style from './Search.css'

export default class Search extends Component {

    // State of the search component, saving search phrase and found files.
    state = {
        search: '',
        foundFiles: [],
        error: ''
    };

    componentDidMount() {}

    // Change the search phrase when someone types in the input field
    handleChange = event => {
        let k = event.target.value;
        this.setState(prevState => ({
            search: k
        }))
    };

    // handles the search when the button is clicked
    handleSearch = () => {

        getDropbox().filesSearch({path: '', query: this.state.search})
            .then(response => {

                this.setState({
                    currentlySearching: true,
                    foundFiles: [],
                    error: ''
                });

                if(response.matches.length === 0) {
                    this.setState({
                        error: 'No files founds :('
                    });
                    return false;
                }

                for(let match of  response.matches) {
                    this.setState(prevState => ({
                        foundFiles: [...prevState.foundFiles, match.metadata]
                    }))
                }
            })
            .then(() => {
                this.setState( prevState => ({
                    currentlySearching: false
                }));
            })
            .catch(error => console.log(error))
    };

    closeSearchBox = () => {
        this.setState({
            currentlySearching: false,
            foundFiles: []
        });
    };

    inputSearch = event => {
        if(event.keyCode === 13) {
            this.handleSearch();
        }
    };

    render() {

        return (
            <div>
                <input className={style.searchBar} type="text" onChange={this.handleChange} onKeyUp={this.inputSearch} placeholder="Search..."></input>
                <button className={style.searchButton} onClick={() => this.handleSearch()}>Search</button>
                {this.state.currentlySearching && <p>Searching...</p>}
                {this.state.error && <p>{this.state.error}</p>}
                {this.state.foundFiles.length > 0 &&
                <div className={style.showSearchFiles}>

                    <ShowContent
                        onFolderClick={this.props.onFolderClick}
                        files={this.state.foundFiles}
                        onStarClick={this.props.onStarClick}
                    />
                    <i className="fas fa-times" onClick={this.closeSearchBox}></i>
                </div>}
            </div>
        );
    }
};



