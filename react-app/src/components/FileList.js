import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import FileListItem from './FileListItem';
import { getList,list } from "../actions/file";
export const FileList = ({getList,list, ...props}) => {
  const[page,setPage] =useState(1)
  useEffect(()=>{ 
    (async()=>list(await getList(props.token,page)))()
  },[page])
  
  return (
  <div className="content-container">
    <div className="list-header">
    </div>
    <div className="list-body">
      {
        !props.files||props.files.length === 0 ? (
          <div className="list-item list-item--message">
            <span>No Files</span>
          </div>
        ) : (
            props.files.map((file,i) => {
              return <FileListItem key={i} {...file} />;
            })
          )
      }
    </div>
    <div className="list-footer">
    <button onClick={()=>{if(page>1) setPage(page-1)}}>prev</button>
    <button onClick={()=>setPage(page+1)}>next</button>
    </div>
  </div>
);
}

const mapStateToProps = (state) => {
  return {
    token:state.user.token,
    files: state.file.files
  };
};

const mapDispatchToProps = (dispatch) => ({
  getList: async (token,page) => {
    return await dispatch(getList(token,page));
  },
  list: async (files) => {
    return await dispatch(list(files));
  },
});

export default connect(mapStateToProps,mapDispatchToProps)(FileList);
