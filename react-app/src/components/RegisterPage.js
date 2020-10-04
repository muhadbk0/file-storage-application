import React from "react";
import { connect } from "react-redux";
import { startRegister, profile } from "../actions/auth";
import { history } from "./routers/AppRouter";
export const RegisterPage = ({ startRegister }) => {
  const register = async(e) => {
    try{
    e.preventDefault()
    const name = e.target.name.value
    const email=e.target.email.value
    const password = e.target.password.value
    await startRegister(name,email,password);
    history.push("/");
    }
    catch(e){
      alert(e.message)
    }
  };
  return (
    <div className="box-layout">
      <div className="box-layout__box">
        <h1 className="box-layout__title">File Storage Application</h1>
        <form onSubmit={register}>
          <input type="text" name="email"></input>
          <input type="password" name="password"></input>
          <button className="button">Register</button>
        </form>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  startRegister: async (name,email,password) => {
    const user = await dispatch(startRegister(name,email,password));
    await dispatch(profile(user));
  },
});

export default connect(undefined, mapDispatchToProps)(RegisterPage);
