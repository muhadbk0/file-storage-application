export default (state = {}, action) => {
  switch (action.type) {
    case 'GET_PROFILE':
      return {
        _id:action.user._id,
        name:action.user.name,
        email:action.user.email,
        token:action.user.token
      };
    case 'LOGIN':
      return {
        token:action.user
      };
    case 'LOGOUT':
      return {};
    default:
      return state;
  }
};
