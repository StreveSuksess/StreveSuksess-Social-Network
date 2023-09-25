import styles from "./Post.module.css";
import {useState} from "react";

function Post(props) {
  const [editMode, setEditMode] = useState(false);
  const [beforeAnimate, setBeforeAnimate] = useState(false);
  const [afterAnimate, setAfterAnimate] = useState(false);
  const [message, setMessage] = useState(props.message);

  const onChange = (event) => {
    setMessage(event.target.value);
  }

  const editPost = async () => {
    if (message === "") return;
    setAfterAnimate(true);
    await props.editPost(message);
    setEditMode(false);
    setTimeout(() => {
      setAfterAnimate(false);
    }, 1000);
  }

  return (
    <div className={styles.post}>
      <img src={props.avatar} alt=""
           className={styles.avatar}/>
      <div className={styles.text}>
        <h3 className={styles.name}>{props.name}</h3>
        {
          editMode ?
            <div className={styles.editForm + " " + (afterAnimate ? styles.afterAnimate : "")}>
              <input className={styles.input} type="text" onChange={onChange} value={message}/>
              <button onClick={editPost} className={styles.checkmark}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="35px" height="35px">
                  <path
                    d="M43.171,10.925L24.085,33.446l-9.667-9.015l1.363-1.463l8.134,7.585L41.861,9.378C37.657,4.844,31.656,2,25,2 C12.317,2,2,12.317,2,25s10.317,23,23,23s23-10.317,23-23C48,19.701,46.194,14.818,43.171,10.925z"/>
                </svg>
              </button>
            </div>
            :
            <p className={styles.message +
              " " + (beforeAnimate ? styles.animate : "") +
              " " + (afterAnimate ? styles.afterAnimate : "")}>{props.message}</p>
        }
        <p className={styles.time}>{new Date(props.time).toLocaleDateString()}</p>
      </div>

      {
        props?.isUserProfile && !editMode &&
        <div>
          <button onClick={() => {
            setBeforeAnimate(true);
            setTimeout(() => {
              setEditMode(true);
              setBeforeAnimate(false);
            }, 250)
          }}
                  className={styles.editButton}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="25px" height="25px">
              <path
                d="M 22.828125 3 C 22.316375 3 21.804562 3.1954375 21.414062 3.5859375 L 19 6 L 24 11 L 26.414062 8.5859375 C 27.195062 7.8049375 27.195062 6.5388125 26.414062 5.7578125 L 24.242188 3.5859375 C 23.851688 3.1954375 23.339875 3 22.828125 3 z M 17 8 L 5.2597656 19.740234 C 5.2597656 19.740234 6.1775313 19.658 6.5195312 20 C 6.8615312 20.342 6.58 22.58 7 23 C 7.42 23.42 9.6438906 23.124359 9.9628906 23.443359 C 10.281891 23.762359 10.259766 24.740234 10.259766 24.740234 L 22 13 L 17 8 z M 4 23 L 3.0566406 25.671875 A 1 1 0 0 0 3 26 A 1 1 0 0 0 4 27 A 1 1 0 0 0 4.328125 26.943359 A 1 1 0 0 0 4.3378906 26.939453 L 4.3632812 26.931641 A 1 1 0 0 0 4.3691406 26.927734 L 7 26 L 5.5 24.5 L 4 23 z"/>
            </svg>
          </button>
          <button onClick={props.deletePost} className={styles.deleteButton}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72" width="27px" height="27px">
              <path
                d="M 33 13 C 31.895 13 31 13.895 31 15 L 31 16 L 18 16 C 15.791 16 14 17.791 14 20 C 14 21.973645 15.432361 23.602634 17.3125 23.929688 L 19.707031 52.664062 C 20.050031 56.777062 23.553641 60 27.681641 60 L 46.318359 60 C 50.446359 60 53.949969 56.778062 54.292969 52.664062 L 56.6875 23.929688 C 58.567639 23.602634 60 21.973645 60 20 C 60 17.791 58.209 16 56 16 L 43 16 L 43 15 C 43 13.895 42.105 13 41 13 L 33 13 z"/>
            </svg>
          </button>
        </div>
      }
    </div>
  );
}

export default Post;