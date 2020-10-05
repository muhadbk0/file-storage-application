import fileProvider from "../api/file";

export const list = (files) => ({
  type: "LIST",
  files,
});

export const getList = (token) =>  async() =>
  await fileProvider.list(token);

export const upload = (files) => ({
  type: "UPLOAD",
  files,
});

export const fileUpload = (token,file) => async () =>
  await authProvider.fileUpload(token,file);
