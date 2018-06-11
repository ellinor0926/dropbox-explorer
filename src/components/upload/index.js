import React, {Component} from 'react'
import {uploadFile} from "../../actions";
import {connect} from "react-redux";
import Dropzone from 'react-dropzone';

import './upload.css'
import logo from '../../images/shareLogo_preview.png';

class Upload extends Component {


    render() {
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
            <div className='uploadLayout'>
                <div className="uploadModalContent">
                    <span className="toggleUpload" onClick={() => this.props.uploadToggle(false)}>&times;</span>
                {/*<form onSubmit={selectFileToUpload}>*/}
                {/*<label htmlFor="uploadFile"> Select file to upload</label>*/}
                {/*<input id="uploadFile" type="file" ref={(ref) => {inputField = ref;}} />*/}
                {/*<button type="submit">Upload</button>*/}
                {/*</form>*/}
                    <Dropzone onDrop={(files) => onDrop(files)}>
                        <div className='dropzoneStyling'>
                            <img className='shareLogo' src={logo} alt=""/>
                            <p>Drop files here</p>
                            <div>
                                <button>Or select files to upload</button>
                            </div>
                        </div>

                    </Dropzone>
                </div>
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