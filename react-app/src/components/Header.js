import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout,logout } from '../actions/auth';

export const Header = ({ user,startLogout }) => (
  <header className="header">
    <div className="content-container">
      <div className="header__content">
        <Link className="header__title" to="/dashboard">
          <h1>Hi {user.name} !</h1>
        </Link>
        <button className="button button--link" onClick={startLogout}>Logout</button>
      </div>
    </div>
  </header>
);

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => {
    dispatch(startLogout())
    dispatch(logout())
  }
});

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
