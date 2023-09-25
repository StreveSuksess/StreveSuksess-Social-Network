import {connect} from "react-redux";
import React, {useEffect} from "react";
import {getAuthStatus} from "../redux/authReducer";
import {getAuth} from "firebase/auth";
import {useAuthState} from "react-firebase-hooks/auth";


export function withAuth(Component) {
  const auth = getAuth();

  function RedirectComponent(props) {
    const [user, loading, error] = useAuthState(auth);
    useEffect(() => {
      props.getAuthStatus();
    }, [loading])
    return <Component {...props} userId={user?.uid} loading={loading}/>
  }

  let ConnectedAuthObserverComponent = connect(null, {getAuthStatus})(RedirectComponent);
  return ConnectedAuthObserverComponent;
}