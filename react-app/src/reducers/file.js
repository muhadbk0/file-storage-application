export default (state = { files: [] }, action) => {
  switch (action.type) {
    case "LIST":
      return {
        files: action.files,
      };
    case "ADD_FILE":
      return {
        files: action.files.concat(state.files),
      };
    default:
      return state;
  }
};
