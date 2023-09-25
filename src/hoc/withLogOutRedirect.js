import {connect} from "react-redux";
import styles from "../components/Login/Login.module.css";
import React from "react";
import {logOutUser} from "../redux/authReducer";


export function withLogOutRedirect(Component) {

  function RedirectComponent(props) {
    if (props.logged) {
      return (
        <div className={styles.loggedContainer}>
          <h1>You are already logged in StreveSuksess Social Network</h1>
          <button className={styles.loggedButton} onClick={props.logOutUser}>logout</button>
        </div>
      );
    } else return <Component {...props} />
  }

  let ConnectedLogOutRedirectComponent = connect(mapStateToPropsForRedirect, {logOutUser})(RedirectComponent);
  return ConnectedLogOutRedirectComponent;
}

function mapStateToPropsForRedirect(state) {
  return {
    logged: state.auth.logged
  }
}