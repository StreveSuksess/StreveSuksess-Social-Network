import React, {useState} from "react";
import styles from "./Users.module.css"
import User from "./User/User";

function Users(props) {
  const [search, showSearch] = useState(false);

  return <div className={styles.users}>
    <div className={styles.usersHeader}>
      <h1 className={styles.title}>Users</h1>
      <label className={styles.searchContainer}>
        <input className={search ? styles.showInput : ""} id="searchUserInput" placeholder="search..." type="text"
               value={props.searchText}
               disabled={!search}
               onChange={(event) => {
                 props.setSearchText(event.target.value);
               }}/>
        <svg onClick={() => {
          showSearch(!search);
          props.setSearchText("");
        }} width="36" height="36" fill="currentColor" viewBox="0 0 16 16">
          <path
            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
        </svg>
      </label>
    </div>
    <ul className={styles.users__ul}>
      {Object.entries(props.users).map(userEntry => {
        const user = userEntry[1];
        const followed = props.userSubscriptions?.includes(user.id);
        return <User id={user.id}
                     key={user.id}
                     avatar={user.avatar}
                     name={user.name}
                     followed={followed}
                     status={user.status}
                     authorizedId={props.userId}
                     buttonFunction={followed ? () => {
                       props.unFollowUser(user.id);
                     } : () => {
                       props.followUser(user.id);
                     }}/>
      })}
    </ul>
    <button
      className={styles.button}
      onClick={props.showFunction}
    >Show more
    </button>
  </div>;
}

export default Users;