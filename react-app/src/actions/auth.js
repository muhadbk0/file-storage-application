import authProvider from "../api/auth";

export const login = (user) => ({
  type: "LOGIN",
  user,
});

export const startLogin = (email, password) =>  async() =>
  await authProvider.login(email, password);

export const logout = () => ({
  type: "LOGOUT",
});

export const startLogout = () => async()=>await authProvider.logout();
;

export const profile = (user) => ({
  type: "GET_PROFILE",
  user,
});

export const getProfile = (token) => async () =>
  await authProvider.getProfile(token);

export const register = (user) => ({
  type: "REGISTER",
  user,
});

export const startRegister = (name,email, password) => async()=>
  await authProvider.register(name,email, password);
