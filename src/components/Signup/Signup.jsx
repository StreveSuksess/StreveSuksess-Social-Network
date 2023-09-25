import React, {useState} from "react";
import styles from "./Signup.module.css";
import SignupForm from "./SignupForm";
import {connect} from "react-redux";
import {addUser, logOutUser} from "../../redux/authReducer";
import {compose} from "redux";
import {withAuth} from "../../hoc/withAuth";
import {Link, Navigate} from "react-router-dom";

function Signup(props) {
  const [avatar, setAvatar] = useState(null);
  const [navigate, setNavigate] = useState(false);

  const onSubmit = async (formData) => {
    await props.addUser(formData, avatar);
    setNavigate(true);
  }

  if (navigate) return <Navigate to="/profile"/>
  else if (props.userId) {
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
          <h1 className={styles.title}>Signup</h1>
          <SignupForm onSubmit={onSubmit} avatar={avatar} setAvatar={setAvatar}/>
          <Link className={styles.loginLink} to="/login">Already have account? Log in</Link>
        </div>
      </div>
    );
  }
}

export default compose(
  connect(null, {addUser, logOutUser}),
  withAuth,
)(Signup)