import React from "react";
import { connect } from "react-redux";
import { startLogin, profile } from "../actions/auth";
import { history } from "../routers/AppRouter";
export const LoginPage = ({ startLogin }) => {
  const login = async(e) => {
    try{
    e.preventDefault()
    const email=e.target.email.value
    const password = e.target.password.value
    await startLogin(email, password);
    }
    catch(e){
      alert(e.message)
    }
  };
  const register =()=>{
    history.push("/register");
  }
  return (
    <div className="box-layout">
      <div className="box-layout__box">
        <h1 className="box-layout__title">File Storage Application</h1>
        <form onSubmit={login}>
          <input type="text" name="email" placeholder="email"></input>
          <input type="password" name="password" placeholder="password"></input>
          <button className="button">Login</button>
          <button className="button" onClick={register}>Register</button>
        </form>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  startLogin: async (email,password) => {
    const user = await dispatch(startLogin(email,password));
    await dispatch(profile(user));
  },
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
