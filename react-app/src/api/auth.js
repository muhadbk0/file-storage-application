import decodeJwt from "jwt-decode";
import { BASE_URL, API_END_POINT } from "../const";

const authProvider = {
  login: async (email, password) => {
    const request = new Request(`${BASE_URL + API_END_POINT}/auth/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: new Headers({ "Content-Type": "application/json" }),
    });
    const response = await fetch(request);
    if (response.status < 200 || response.status >= 300) {
      const error = await response.json();
      if (response.status === 500) throw new Error(error.errors.message);
      throw new Error(error);
    }
    const { token, user } = await response.json();
    const decodedToken = decodeJwt(token);
    localStorage.setItem("token", token);
    localStorage.setItem("role", decodedToken.role);
    return { ...user, token };
  },
  register: async (name, email, password) => {
    const request = new Request(`${BASE_URL + API_END_POINT}/auth/register`, {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: new Headers({ "Content-Type": "application/json" }),
    });
    const response = await fetch(request);
    if (response.status < 200 || response.status >= 300) {
      const error = await response.json();
      if (response.status === 500 || response.status === 432 ) throw new Error(error.errors.message);
      throw new Error(error);
    }
    const reuslt = await response.json();
    console.log(reuslt)
    return reuslt.message
  },
  getProfile: async (token) => {
    console.log("getProfile api return user: ");
    const request = new Request(`${BASE_URL + API_END_POINT}/users/me`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }),
    });
    const response = await fetch(request);
    if (response.status < 200 || response.status >= 300) {
      const error = await response.json();
      if (response.status === 500) throw new Error(error.errors.message);
      throw new Error(error);
    }
    const user = await response.json();
    return user;
  },
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    return Promise.resolve();
  },
  checkError: ({ status }) => {
    return status === 401 || status === 403
      ? Promise.reject()
      : Promise.resolve();
  },
  checkAuth: () => {
    const token = localStorage.getItem("token");
    return token ? Promise.resolve(token) : Promise.reject();
  },
  getPermissions: () => {
    const role = localStorage.getItem("role");
    return Promise.resolve(role);
  },
};
export default authProvider;
