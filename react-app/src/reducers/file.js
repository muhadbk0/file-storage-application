export default (state = {}, action) => {
  switch (action.type) {
    case 'LIST':
      return {
        files:action.files
      };
    default:
      return state;
  }
};
