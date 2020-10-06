import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import configureStore from "./store/configureStore";
import AppRouter, { history } from "./routers/AppRouter";
import LoadingPage from "./components/LoadingPage";
import authProvider from "./api/auth";
import { login, logout, profile, getProfile } from "./actions/auth";
import * as serviceWorker from "./serviceWorker";
import './styles/styles.scss'

const store = configureStore();

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById("root"));
    hasRendered = true;
  }
};

(async () => {
  try {
    const {user}=store.getState()
    if(!user.token) { 
      user.token= await authProvider.checkAuth();
      store.dispatch(login(user.token));
    }
    if(!!user.token &&!user._id){
      const usedData =await store.dispatch(getProfile(user.token));
      store.dispatch(profile({...usedData,token:user.token}));
    }
    renderApp();
    if (history.location.pathname === "/") {
      history.push("/dashboard");
    }
  } catch (e) {
    store.dispatch(logout());
    renderApp();
    history.push("/");
  }
})();

ReactDOM.render(<LoadingPage />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
