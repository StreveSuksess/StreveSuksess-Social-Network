import React, {useState} from "react";
import styles from "./Login.module.css";
import LoginForm from "./LoginForm";
import {Link, Navigate} from "react-router-dom";
import {connect} from "react-redux";
import {loginUser, logOutUser} from "../../redux/authReducer";
import {compose} from "redux";
import {withAuth} from "../../hoc/withAuth";


function Login(props) {
  const [navigate, setNavigate] = useState(false);

  const onSubmit = async (formData) => {
    await props.loginUser(formData);
    if (!props.userId) return;
    setNavigate(true);
  }

  if (navigate) {
    return <Navigate to={"/profile"}/>
  } else if (props.userId) {
    return (
      <div className={styles.loggedContainer}>
        <h1>You are already logged in StreveSuksess Social Network</h1>
        <button className={styles.loggedButton} onClick={props.logOutUser}>logout</button>
      </div>
    );
  } else {
    return (
      <div className={styles.container}>
        <div className={styles.background}></div>
        <div className={styles.inner}>
          <h1 className={styles.title}>Login</h1>
          <LoginForm onSubmit={onSubmit}/>
          <Link className={styles.signupLink} to="/signup">Haven't account? Sign up</Link>
        </div>
      </div>
    );
  }
}


export default compose(
  connect(null, {loginUser, logOutUser}),
  withAuth,
)(Login);


