import React, {Component} from 'react'
import {uploadFile} from "../../actions";
import {connect} from "react-redux";
import Dropzone from 'react-dropzone';

class Upload extends Component {



    render () {
        //let inputField;

        const onDrop = (acceptedFiles, rejectedFiles) => {

            console.log('Rejected files: ', rejectedFiles);

            const file = acceptedFiles[0];

            this.props.uploadFile(file, this.props.currentPath)
        };

        // const selectFileToUpload = (e) => {
        //
        //     e.preventDefault();
        //
        //     const file = inputField.files[0];
        //
        //     this.props.uploadFile(file, this.props.currentPath);
        // };

        return (
            <div>
                {/*<form onSubmit={selectFileToUpload}>*/}
                    {/*<label htmlFor="uploadFile"> Select file to upload</label>*/}
                    {/*<input id="uploadFile" type="file" ref={(ref) => {inputField = ref;}} />*/}
                    {/*<button type="submit">Upload</button>*/}
                {/*</form>*/}
                <Dropzone onDrop={(files) => onDrop(files)}>
                    <p>Drop files here</p>
                    <button>Or select files to upload</button>
                </Dropzone>
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