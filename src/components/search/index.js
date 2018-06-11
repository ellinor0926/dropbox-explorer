import React, { Component } from 'react';
import {getDropbox} from "../../dropboxShared";
import ShowContent from "../showContent";
import style from './Search.css'

export default class Search extends Component {

    // State of the search component, saving search phrase and found files.
    state = {
        search: '',
        foundFiles: [],
        error: '',
        showSearch: false
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

                // Reset the state between searches
                this.setState({
                    foundFiles: [],
                    error: ''
                });
                // No files found? ERROR :D
                if(response.matches.length === 0) {
                    this.setState({
                        error: 'No files founds :(',
                        showSearch: false
                    });
                    return false;
                }

                //Files found? Cool! Let's put them in an array
                for(let match of  response.matches) {
                    this.setState(prevState => ({
                        foundFiles: [...prevState.foundFiles, match.metadata]
                    }))
                }

                // We want to display the search results by default
                this.setState( prevState => ({
                    showSearch: true,
                }));
            })
            .then(() => {
                // We aren't searching anymore - so lets toggle that flag
                this.setState( prevState => ({
                    currentlySearching: false,
                }));
                 console.log(this.state.currentlySearching);
            })
            .catch(error => console.log(error))
    };

    // This allows the user to close the search box by clicking the X
    closeSearchBox = () => {
        this.setState({
            showSearch: false
        });
    };

    // Allows the user to press enter to search
    inputSearch = event => {
        if(event.keyCode === 13) {
            this.handleSearch();
        }
    };

    // Allows the user to toggle the search results
    showSearchResults = () => {
        this.setState(prevState =>({
            showSearch: !prevState.showSearch
        }));
    };

    render() {

        return (
            <div>
                <input className={style.searchBar} type="text" onChange={this.handleChange} onKeyUp={this.inputSearch} placeholder="Search..."></input>
                <button className={style.searchButton} onClick={this.handleSearch}>Search</button>
                <div>
                { this.state.foundFiles.length > 0 && <button  className={style.searchButton} onClick={this.showSearchResults}>Show/Hide results</button>}
                </div>
                {this.state.currentlySearching && <p>Searching...</p>}
                {this.state.error && <p>{this.state.error}</p>}
                {this.state.showSearch  &&
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



