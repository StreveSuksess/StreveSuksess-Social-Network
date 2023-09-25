import {compose} from "redux";
import {connect} from "react-redux";
import {logOutUser} from "../../redux/authReducer";
import {withLoginRedirect} from "../../hoc/withLoginRedirect";
import styles from "./Settings.module.css";
import React from "react";

function Settings(props) {
  return (
    <div className={styles.loggedContainer}>
      <button className={styles.loggedButton} onClick={props.logOutUser}>logout</button>
    </div>
  )
}

export default compose(
  connect(null, {logOutUser}),
  withLoginRedirect,
)(Settings);