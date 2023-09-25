import styles from "./User.module.css"
import {Link} from "react-router-dom";

function User(props) {
  const combinedId = props.authorizedId > props.id ? props.authorizedId + props.id : props.id + props.authorizedId;

  function buttonFunction(e) {
    e.preventDefault();
    props.buttonFunction(props.id);
  }

  return (
    <div className={styles.user}>
      <Link to={`/profile/${props.id}`}>
        <img src={props.avatar} alt="" className={styles.avatar}/>
        <div className={styles.info}>
          <h3 className={styles.name}>{props.name}</h3>
          <p className={styles.status}>{props.status}</p>
        </div>
      </Link>
      <div className={styles.buttons}>
        <Link className={styles.button + " " + styles.chat} to={"/messages/" + combinedId}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="60" height="60" id="message">
            <path
              fill="#fff"
              d="M5.1 22.1c-.5 0-.9-.1-1.4-.2-.3-.1-.6-.3-.8-.5l-.1-.1c-.1-.1-.2-.3-.2-.4 0-.2.1-.3.3-.4.8-.4 1.5-1.1 1.9-1.9.1-.1.2-.2.2-.3C2.2 16.6.5 13.9.5 11 .5 6 5.7 1.8 12 1.8S23.5 6 23.5 11c0 5-5.2 9.2-11.5 9.2-.6 0-1.3 0-1.9-.1-1.5 1.3-3.3 2-5 2z"/>
          </svg>
        </Link>
        <button className={props.followed ? styles.button + " " + styles.red : styles.button + " " + styles.blue}
                onClick={buttonFunction}>
          <span>+</span>
        </button>
      </div>
    </div>
  )
}

export default User;