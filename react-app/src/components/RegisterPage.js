import React from "react";
import { connect } from "react-redux";
import { startRegister } from "../actions/auth";
import { history } from "../routers/AppRouter";
export const RegisterPage = ({ startRegister }) => {
  const register = async(e) => {
    try{
    e.preventDefault()
    const name = e.target.name.value
    const email=e.target.email.value
    const password = e.target.password.value
    const message =await startRegister(name,email,password);
    alert(message)
    setTimeout(history.push("/"),2000)
    }
    catch(e){
      alert(e.message)
    }
  };
  const login =()=>{
    history.push("/");
  }
  return (
    <div className="box-layout">
      <div className="box-layout__box">
        <h1 className="box-layout__title">File Storage Application</h1>
        <form onSubmit={register}>
          <input type="text" name="name" placeholder="name"></input>
          <input type="text" name="email" placeholder="email"></input>
          <input type="password" name="password" placeholder="password"></input>
          <button className="button">Register</button>
          <button className="button" onClick={login}>login</button>
        </form>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  startRegister: async (name,email,password) => {
    return await dispatch(startRegister(name,email,password));
  },
});

export default connect(undefined, mapDispatchToProps)(RegisterPage);
