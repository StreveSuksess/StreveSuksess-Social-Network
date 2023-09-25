import styles from "../News/News.module.css";
import React from "react";
import Post from "../Profile/MyPosts/Post/Post";

export function News(props) {
  return (
    <div className={styles.news}>
      <h1 className={styles.title}>News</h1>
      <div className={styles.posts}>
        {props.news &&
          props?.news?.sort((first, second) => second.time - first.time)
            .map((post, index) => <Post avatar={post.avatar}
                                        message={post.text}
                                        time={post.time}
                                        name={post.name}
                                        key={index}/>)}
      </div>

    </div>
  )
}