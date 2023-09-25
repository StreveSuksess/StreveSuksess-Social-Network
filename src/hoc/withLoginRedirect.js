import {connect} from "react-redux";
import React from "react";
import {Navigate} from "react-router-dom";


export function withLoginRedirect(Component) {

  function RedirectComponent(props) {
    if (!props.logged) {
      return <Navigate to="/login"/>
    } else return <Component {...props} />
  }

  let ConnectedLoginRedirectComponent = connect(mapStateToPropsForRedirect, null)(RedirectComponent);
  return ConnectedLoginRedirectComponent;
}

function mapStateToPropsForRedirect(state) {
  return {
    logged: state.auth.logged
  }
}