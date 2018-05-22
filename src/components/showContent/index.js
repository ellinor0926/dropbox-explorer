import React, {Component} from "react";
import {connect} from "react-redux";
import {setToken, saveFiles, fetchFiles} from "../../actions";
import Folder from "../folder";
import File from "../file";

class ShowContent extends Component {

    handleFolderClick = (path) => {
        console.log(path);
        this.props.fetchFiles(this.props.accessToken, path);
    };

    handleFileClick = () => {
        console.log('Clicked a file')
    };

    componentDidMount() {
        this.props.fetchFiles(this.props.accessToken, this.props.path);
    }


    render() {

        let allFiles = this.props.files;
        console.log(allFiles);

        return (
            allFiles
            ?
                (
            <div>
                <p>All files fetched!</p>
                {allFiles.map((file, i) =>
                    file['.tag'] === 'folder'
                    ? (
                    <Folder
                        name={file.name}
                        key={i}
                        onClick={() => this.handleFolderClick(file.path_lower)}
                    />
                ) : (
                    <File
                        name={file.name}
                        key={i}
                        onClick={() => this.handleFileClick()}
                    />
                ))}


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
)(ShowContent);