import styles from "./Companion.module.css";
import {NavLink} from "react-router-dom";

function Companion(props) {
  return (
    <NavLink to={"/messages" + "/" + props.id}
             className={navData => navData.isActive ? `${styles.active} ${styles.companion}` : styles.companion}>
      <h5 className={styles.name}>{props.name}</h5>
    </NavLink>
  );
}

export default Companion;