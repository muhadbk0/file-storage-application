import React from "react";
import { BASE_URL, URL_PATH } from "../const";

const FileListItem = ({ _id, name, file_path, extention, owner }) => (
  <a href={BASE_URL + URL_PATH + file_path} target="_blank">
    <span className="list-item__sub-title">{name}</span>
    <h3 className="list-item__data">{owner.name}</h3>
  </a>
);

export default FileListItem;
