import React, {Component} from "react";
import {Dropbox} from "dropbox/src/index";
import {connect} from "react-redux";
import {setToken, saveFiles, fetchFiles} from "../../actions";

let files;

class ShowFiles extends Component {


    componentDidMount() {
        this.props.fetchFiles(this.props.accessToken);
        console.log(this.props.files)
    }



    render() {


        return (
            <div>
                <ul>
                    <button> HEJ </button>
                    <p>dsdad</p>
                    <p>{this.props.accessToken}</p>
                </ul>
            </div>
        );


    };

};

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