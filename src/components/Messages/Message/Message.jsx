import styles from "./Message.module.css";

function Message(props) {
  const date = new Date(props.date.seconds * 1000);
  return (
    <div className={props.me ? styles.message + " " + styles.me : styles.message}>
      <img src={props.avatar} alt="" className={styles.avatar}/>
      <div className={styles.content}>
        <h5 className={styles.name}>{props.me ? "You" : props.name}</h5>
        <p className={styles.text}>{props.text}</p>
        <span
          className={styles.time}>{`${date.getHours()}:${date.getMinutes() <= 9 ? "0" + date.getMinutes() : date.getMinutes()}`}</span>
      </div>
    </div>
  );
}

export default Message;