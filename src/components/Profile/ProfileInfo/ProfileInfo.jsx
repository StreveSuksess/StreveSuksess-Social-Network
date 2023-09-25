import styles from "./ProfileInfo.module.css";
import {Link} from "react-router-dom";
import React, {useState} from "react";
import {composeValidators, maxLength, minLength, requiredField} from "../../../utils/validators/formsValidator";
import {Field, Form} from "react-final-form";

function ProfileInfo(props) {
  const [editMode, setEditMode] = useState(false);

  const onSubmit = (formData) => {
    props.onSubmit(formData);
    setEditMode(false);
  }

  return (
    <div>
      <div className={styles.profileImgContainer}>
        <img src={props.info.profileImg} alt=""
             className={styles.img}/>
        {editMode &&
          <input type="file" name="profileImg" id="" accept="image/*" className={styles.profileImgInput}
                 onChange={(event) => {
                   props.setProfileImg(event.target.files[0]);
                 }}/>}
        {editMode &&
          <p><span
            className={props.profileImg ? styles.haveProfileImg : ""}>{props.profileImg ? props.profileImg.name : "+"}</span>
          </p>
        }
      </div>

      <div className={styles.about}>
        <div className={styles.avatarContainer}>
          <img
            src={props.info.avatar}
            alt="" className={styles.avatar}/>
          {editMode &&
            <input type="file" name="profileImg" id="" accept="image/*"
                   className={styles.avatarInput}
                   onChange={(event) => {
                     props.setAvatar(event.target.files[0]);
                   }}/>
          }
          {editMode &&
            <p><span
              className={props.avatar ? styles.haveAvatar : ""}>{props.avatar ? props.avatar.name : "+"}</span>
            </p>
          }
        </div>
        {
          editMode ?
            <EditProfileInfoForm onSubmit={onSubmit} info={props.info}/>
            :
            <div>
              <h1 className={styles.title}>{props.info.name}</h1>
              <ul className={styles.description}>
                <li className={styles.description__li}>
                  <span>Date of Birth: </span><span>{new Date(props.info.dateOfBirth).toLocaleDateString("en-US", {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}</span>
                </li>
                <li className={styles.description__li}><span>City: </span><span>{props.info.city}</span></li>
                <li className={styles.description__li}><span>Education: </span><span>{props.info.education}</span></li>
                <li className={styles.description__li}><span>Status: </span><span
                >{props.info.status}</span></li>
                {props.isUserProfile &&
                  <li className={styles.description__li + " " + styles.description__following}>
                    <Link
                      to="/users/following"><span>Following: </span><span>{props.info?.following?.length ? props.info?.following?.length : "0"}</span></Link>
                  </li>
                }
              </ul>
            </div>
        }
        {
          props.isUserProfile ?
            <label className={styles.edit}>
              <button onClick={() => {
                setEditMode(!editMode);
                setTimeout(props.initializeEditProfileForm, 0)
              }}>edit profile
              </button>
              <svg xmlns="http://www.w3.org/2000/svg" fill="#aeaeae" height="20px" width="20px"
                   viewBox="0 0 306.637 306.637">
                <path
                  d="M12.809,238.52L0,306.637l68.118-12.809l184.277-184.277l-55.309-55.309L12.809,238.52z M60.79,279.943l-41.992,7.896    l7.896-41.992L197.086,75.455l34.096,34.096L60.79,279.943z"/>
                <path
                  d="M251.329,0l-41.507,41.507l55.308,55.308l41.507-41.507L251.329,0z M231.035,41.507l20.294-20.294l34.095,34.095    L265.13,75.602L231.035,41.507z"/>
              </svg>
            </label>
            :
            <Link to={"/profile"} className={styles.linkToProfile}>Go to my profile</Link>
        }
      </div>
    </div>
  );
}

const EditProfileInfoForm = props => {
  return (
    <Form action=""
          onSubmit={props.onSubmit}
          initialValues={"sss"}
          render={({handleSubmit}) => (
            <form action="" onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.nameContainer}>
                <Field name="firstName" className={styles.input}
                       initialValue={props.info.name.split(" ")[0]}
                       validate={composeValidators(requiredField, maxLength(20))}>
                  {field => (
                    <div className={styles.inputContainer}>
                      <input {...field.input} placeholder="First name" type="name"
                             autoComplete={"on"}
                             className={styles.input + " " + (field.meta.touched && (field.meta.warning || field.meta.error) && styles.invalidField)}/>
                      {field.meta.touched && (field.meta.warning || field.meta.error) &&
                        <div className={styles.warning}>
                          <p>{field.meta.error || field.meta.warning}</p>
                        </div>}
                    </div>
                  )
                  }
                </Field>
                <Field name="lastName" className={styles.input}
                       initialValue={props.info.name.split(" ")[1]}
                       validate={composeValidators(requiredField, maxLength(20))}>
                  {field => (
                    <div className={styles.inputContainer}>
                      <input {...field.input} placeholder="Last name" type="name"
                             autoComplete={"on"}
                             className={styles.input + " " + (field.meta.touched && (field.meta.warning || field.meta.error) && styles.invalidField)}/>
                      {field.meta.touched && (field.meta.warning || field.meta.error) &&
                        <div className={styles.warning}>
                          <p>{field.meta.error || field.meta.warning}</p>
                        </div>}
                    </div>
                  )
                  }
                </Field>
              </div>
              <ul className={styles.formUl}>
                <li className={styles.formLi}>
                  <Field name="dateOfBirth" className={styles.input}
                         initialValue={props.info.dateOfBirth}
                         validate={requiredField}>
                    {field => (
                      <div className={styles.inputContainer}>
                        <input {...field.input} placeholder="Date of birth" type="date"
                               autoComplete={"on"}
                               className={styles.input + " " + (field.meta.touched && (field.meta.warning || field.meta.error) && styles.invalidField)}/>
                        {field.meta.touched && (field.meta.warning || field.meta.error) &&
                          <div className={styles.warning}>
                            <p>{field.meta.error || field.meta.warning}</p>
                          </div>}
                      </div>
                    )
                    }
                  </Field>
                </li>
                <li className={styles.formLi}>
                  <Field name="city" className={styles.input}
                         initialValue={props.info.city}
                         validate={composeValidators(requiredField, maxLength(20))}>
                    {field => (
                      <div className={styles.inputContainer}>
                        <input {...field.input} placeholder="City" type="text"
                               autoComplete={"on"}
                               className={styles.input + " " + (field.meta.touched && (field.meta.warning || field.meta.error) && styles.invalidField)}/>
                        {field.meta.touched && (field.meta.warning || field.meta.error) &&
                          <div className={styles.warning}>
                            <p>{field.meta.error || field.meta.warning}</p>
                          </div>}
                      </div>
                    )
                    }
                  </Field>
                </li>
                <li className={styles.formLi}>
                  <Field name="education" className={styles.input}
                         initialValue={props.info.education}
                         validate={composeValidators(requiredField, maxLength(20))}>
                    {field => (
                      <div className={styles.inputContainer}>
                        <input {...field.input} placeholder="Education" type="text"
                               autoComplete={"on"}
                               className={styles.input + " " + (field.meta.touched && (field.meta.warning || field.meta.error) && styles.invalidField)}/>
                        {field.meta.touched && (field.meta.warning || field.meta.error) &&
                          <div className={styles.warning}>
                            <p>{field.meta.error || field.meta.warning}</p>
                          </div>}
                      </div>
                    )
                    }
                  </Field>
                </li>
                <li className={styles.formLi}>
                  <Field name="status" className={styles.input}
                         initialValue={props.info.status}
                         validate={composeValidators(requiredField, minLength(10), maxLength(50))}>
                    {field => (
                      <div className={styles.inputContainer}>
                        <input {...field.input} placeholder="Your status" type="text"
                               autoComplete={"on"}
                               className={styles.input + " " + (field.meta.touched && (field.meta.warning || field.meta.error) && styles.invalidField)}/>
                        {field.meta.touched && (field.meta.warning || field.meta.error) &&
                          <div className={styles.warning}>
                            <p>{field.meta.error || field.meta.warning}</p>
                          </div>}
                      </div>
                    )
                    }
                  </Field>
                </li>
              </ul>
              <button type="submit" className={styles.submit}>Submit</button>
            </form>
          )}
    />
  )
}

export default ProfileInfo;