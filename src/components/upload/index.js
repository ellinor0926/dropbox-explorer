import React, {Component} from 'react'
import {getDropbox} from "../../dropboxShared";
import {uploadFile} from "../../actions";
import {connect} from "react-redux";

class Upload extends Component {




    render () {

       let inputField;
        const selectFileToUpload = (e) => {

            e.preventDefault();

            const file = inputField.files[0];

            this.props.uploadFile(file, this.props.currentPath);
        };

        return (
            <div>
                <form onSubmit={selectFileToUpload}>
                    <label htmlFor="uploadFile"> Select file to upload</label>
                    <input id="uploadFile" type="file" ref={(ref) => {inputField = ref;}} />
                    <button type="submit">Upload</button>
                </form>
            </div>
        )
    }
}

export default connect(
    state => ({
        currentPath: state.currentPath
    }),

    {
        uploadFile
    }
)(Upload);