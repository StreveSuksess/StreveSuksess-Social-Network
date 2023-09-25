import React, {useState} from 'react';
import styles from "./MyPosts.module.css";
import Post from "./Post/Post";
import {Field, Form} from "react-final-form";
import {requiredField} from "../../../utils/validators/formsValidator";


function MyPosts(props) {
  const [animate, setAnimate] = useState(false);

  async function onSubmit(formData) {
    setAnimate(true);
    setTimeout(async () => {
      await props.onSubmit(formData)
    }, 250)
    setTimeout(() => {
      setAnimate(false);
    }, 750)
  }

  return (
    <div>
      <h2 className={styles.title}>Posts</h2>
      {props.isUserProfile && <PostForm onSubmit={onSubmit}/>}
      <div className={styles.posts + " " + (animate ? styles.animate : "")}>
        {props.posts &&
          props?.posts?.map((post, index) => {
            const deletePost = async () => {
              setAnimate(true);
              setTimeout(async () => {
                await props.deletePost(index);
              }, 250)
              setTimeout(() => {
                setAnimate(false);
              }, 750)
            }
            const editPost = async (postMessage) => {
              await props.editPost(index, postMessage);
            }
            return <Post avatar={props.avatar} message={post.text}
                         time={post.time}
                         name={props.name}
                         key={index}
                         isUserProfile={props.isUserProfile}
                         deletePost={deletePost}
                         editPost={editPost}
            />
          })}
        {!props.posts && <p>This user has no posts</p>}
      </div>
    </div>
  );
}

function PostForm(props) {
  return (
    <Form action=""
          onSubmit={props.onSubmit}
          render={({handleSubmit, form}) => (
            <form action="" onSubmit={handleSubmit} className={styles.form}>
              <Field name="post"
                     className={styles.area}
                     validate={requiredField}>
                {field => (
                  <textarea {...field.input} placeholder="your news..."
                            className={styles.area}/>
                )
                }
              </Field>
              <button type="submit" onClick={() => {
                setTimeout(async () => {
                  form.reset();
                }, 250)
              }} className={styles.button}>Send
              </button>
            </form>
          )}
    />
  );
}


export default MyPosts;