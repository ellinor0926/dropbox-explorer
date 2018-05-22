import React, {Component} from "react";
import {connect} from "react-redux";
import {setToken, saveFiles, fetchFiles} from "../../actions";

class ShowFiles extends Component {


    componentDidMount() {
        this.props.fetchFiles(this.props.accessToken);
    }


    render() {

        let allFiles = this.props.files;

        return (
            allFiles
            ?
                (
            <div>
                <ul>
                    <p>All files fetched!</p>
                    {allFiles.map((file, i) => <li key={i}> {file.name} </li>)}
                </ul>
            </div>
                ): (
                    <p> Loading files ....</p>
                )
        );


    };

}

export default connect(
    state => ({
        accessToken: state.accessToken,
        files: state.files
    }),
    {
        setToken,
        saveFiles,
        fetchFiles
    }
)(ShowFiles);