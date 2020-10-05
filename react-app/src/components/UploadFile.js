import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { connect } from "react-redux";
import { startUpload, addFile } from "../actions/file";
const UploadFile = ({ startUpload,addFile,user }) => {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length) {
      (async () => {
        const result = await startUpload(user.token, acceptedFiles[0]);
        delete user.token
        addFile([{...result.file,owner:user}]);
      })();
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user:state.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  startUpload: async (token, file) => {
    return await dispatch(startUpload(token, file));
  },
  addFile: async (files) => {
    return await dispatch(addFile(files));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(UploadFile);
