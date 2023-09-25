import React, {useEffect, useRef} from "react";
import styles from "./Messages.module.css";
import Message from "./Message/Message";
import Companion from "./Companion/Companion";
import {Link} from "react-router-dom";
import {requiredField} from "../../utils/validators/formsValidator";
import {Field, Form} from "react-final-form";

function Messages(props) {
  let messageUl = useRef();

  useEffect(() => {
    if (props.chatId && messageUl.current?.scrollHeight) {
      messageUl.current.scrollTo(0, messageUl.current.scrollHeight)
    }
  }, [props.dialogs, props.chatId, messageUl.current])

  function onSubmit(data) {
    props.onSubmit(data.message);
  }

  return (
    <div className={props.chatId ? styles.messages + " " + styles.messagesWithChat : styles.messages}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Dialogs</h1>
        {props.chatId &&
          <Link to="/messages" className={styles.back}>
            <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 24 24">
              <path
                d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"
                fill="#444A58"/>
            </svg>
            <span>Back</span>
          </Link>
        }
      </div>
      <div className={props.chatId ? styles.dialogs + " " + styles.dialogsWithChat : styles.dialogs}>
        {props.chatId ?
          <div className={styles.chat}>
            {JSON.stringify(props.dialogs[props.chatId]?.messages) === "{}" || JSON.stringify(props.dialogs[props.chatId]?.messages) === undefined || JSON.stringify(props.dialogs[props.chatId]?.messages) === "[]" ?
              <p className={styles.noMessages}>No messages</p>
              :
              <ul className={styles.message__ul} ref={messageUl}>
                {props.dialogs[props.chatId]?.messages.map((message, index) => {
                  return message.userId === props.authorizedId ?
                    <Message
                      name={props.authorizedName}
                      avatar={props.authorizedAvatarUrl}
                      key={index}
                      text={message.message}
                      date={message.date}
                      me={true}/>
                    :
                    <Message
                      name={props.dialogs[props.chatId].name}
                      avatar={props.dialogs[props.chatId].avatar}
                      key={index}
                      text={message.message}
                      date={message.date}
                      me={false}/>
                })}
              </ul>
            }
            <MessageForm onSubmit={onSubmit}/>
          </div>
          :
          <ul className={styles.companion__ul}>
            {Object.entries(props.dialogs).map(companionEntries => {
              const chatIdWithCompanion = companionEntries[0];
              const companion = companionEntries[1];
              return <Companion id={chatIdWithCompanion} key={chatIdWithCompanion} name={companion.name}/>
            })}
            <Link to="/users" className={styles.addChat}><h5>Add chat</h5></Link>
          </ul>
        }
      </div>
    </div>
  );
}

function MessageForm(props) {
  return (
    <Form action=""
          onSubmit={props.onSubmit}
          render={({handleSubmit, form}) => (
            <form action="" onSubmit={handleSubmit} className={styles.form}>
              <Field name="message"
                     className={styles.area}
                     validate={requiredField}>
                {field => (
                  <textarea {...field.input} placeholder="print something..."
                            className={styles.textarea}/>
                )
                }
              </Field>
              <button type="submit" className={styles.send} onClick={() => {
                setTimeout(() => {
                  form.reset()
                }, 0)
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" height="14" viewBox="0 0 14 14" width="14">
                  <g>
                    <path
                      d="M1.866 5.02C1.94941 5.23071 2.07991 5.41955 2.24752 5.57207C2.41512 5.72459 2.61539 5.83677 2.833 5.9L7.619 7L2.878 8.039C2.65537 8.09993 2.44995 8.21177 2.27796 8.36571C2.10598 8.51965 1.97213 8.71146 1.887 8.926L0.749001 12.9C0.686737 13.0542 0.674058 13.2239 0.71273 13.3856C0.751401 13.5474 0.839499 13.693 0.964776 13.8023C1.09005 13.9117 1.24628 13.9792 1.41174 13.9957C1.5772 14.0121 1.74367 13.9766 1.888 13.894L12.9 7.7C13.025 7.63082 13.1293 7.52941 13.2018 7.4063C13.2744 7.2832 13.3127 7.14291 13.3127 7C13.3127 6.8571 13.2744 6.7168 13.2018 6.5937C13.1293 6.4706 13.025 6.36919 12.9 6.3L1.888 0.106004C1.74367 0.0234468 1.5772 -0.0120868 1.41174 0.00434315C1.24628 0.0207732 1.09005 0.0883503 0.964776 0.197679C0.839499 0.307007 0.751401 0.452654 0.71273 0.614368C0.674058 0.776082 0.686737 0.945828 0.749001 1.1L1.866 5.02Z"
                      fill="#444A58"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_2_673">
                      <rect fill="white" height="14" width="14"/>
                    </clipPath>
                  </defs>
                </svg>
              </button>
            </form>
          )}
    />
  );
}

export default Messages;