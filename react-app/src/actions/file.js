import fileProvider from "../api/file";

export const list = (files) => ({
  type: "LIST",
  files,
});

export const getList = (token,page) =>  async() =>
  await fileProvider.list(token,page);

export const upload = (files) => ({
  type: "UPLOAD",
  files,
});

export const addFile = (files) => ({
  type: "ADD_FILE",
  files,
});

export const startUpload = (token,file) => async () =>
  await fileProvider.fileUpload(token,file);
