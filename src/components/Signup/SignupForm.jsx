import styles from "./Signup.module.css";
import {Field, Form} from "react-final-form";
import {composeValidators, maxLength, minLength, requiredField} from "../../utils/validators/formsValidator";
import React from "react";

function SignupForm(props) {
  return (
    <Form action=""
          onSubmit={props.onSubmit}
          render={({handleSubmit}) => (
            <form action="" onSubmit={handleSubmit}>
              <div className={styles.fieldContainer}>
                <label htmlFor="email">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 96" id="email" className={styles.svg}>
                    <path
                      fill="#fff"
                      d="M0 11.283V8a8 8 0 0 1 8-8h112a8 8 0 0 1 8 8v3.283l-64 40zm66.12 48.11a4.004 4.004 0 0 1-4.24 0L0 20.717V88a8 8 0 0 0 8 8h112a8 8 0 0 0 8-8V20.717z"
                      data-name="Layer 2"/>
                  </svg>
                </label>
                <Field name="email" className={styles.input}
                       validate={composeValidators(requiredField, minLength(10))}>
                  {field => (
                    <div className={styles.inputContainer}>
                      <input {...field.input} placeholder="E-mail" type="email"
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
              <div className={styles.fieldContainer}>
                <label htmlFor="password">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="lock" className={styles.svg}>
                    <path
                      fill="#fff"
                      d="M12,13a1.49,1.49,0,0,0-1,2.61V17a1,1,0,0,0,2,0V15.61A1.49,1.49,0,0,0,12,13Zm5-4V7A5,5,0,0,0,7,7V9a3,3,0,0,0-3,3v7a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V12A3,3,0,0,0,17,9ZM9,7a3,3,0,0,1,6,0V9H9Zm9,12a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V12a1,1,0,0,1,1-1H17a1,1,0,0,1,1,1Z"/>
                  </svg>
                </label>
                <Field name="password" className={styles.input}
                       validate={composeValidators(requiredField, minLength(6))}>
                  {field => (
                    <div className={styles.inputContainer}>
                      <input {...field.input} placeholder="Password" type="password"
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
              <div className={styles.fieldContainer}>
                <label htmlFor="firstName">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" id="user" className={styles.svg}>
                    <path fill="#fff"
                          d="M670.1 278.4c0 8.8-.6 17.6-1.7 26.3.5-3.5 1-7.1 1.4-10.6-2.4 17.4-7 34.3-13.7 50.5 1.3-3.2 2.7-6.4 4-9.6-6.7 15.8-15.3 30.6-25.8 44.2l6.3-8.1c-10.4 13.4-22.5 25.5-35.9 35.9l8.1-6.3c-13.6 10.4-28.4 19.1-44.2 25.8 3.2-1.3 6.4-2.7 9.6-4-16.2 6.7-33.1 11.3-50.5 13.7 3.5-.5 7.1-1 10.6-1.4-17.5 2.3-35.1 2.3-52.6 0 3.5.5 7.1 1 10.6 1.4-17.4-2.4-34.3-7-50.5-13.7 3.2 1.3 6.4 2.7 9.6 4-15.8-6.7-30.6-15.3-44.2-25.8l8.1 6.3c-13.4-10.4-25.5-22.5-35.9-35.9l6.3 8.1c-10.4-13.6-19.1-28.4-25.8-44.2 1.3 3.2 2.7 6.4 4 9.6-6.7-16.2-11.3-33.1-13.7-50.5.5 3.5 1 7.1 1.4 10.6-2.3-17.5-2.3-35.1 0-52.6-.5 3.5-1 7.1-1.4 10.6 2.4-17.4 7-34.3 13.7-50.5-1.3 3.2-2.7 6.4-4 9.6 6.7-15.8 15.3-30.6 25.8-44.2l-6.3 8.1c10.4-13.4 22.5-25.5 35.9-35.9l-8.1 6.3c13.6-10.4 28.4-19.1 44.2-25.8-3.2 1.3-6.4 2.7-9.6 4 16.2-6.7 33.1-11.3 50.5-13.7-3.5.5-7.1 1-10.6 1.4 17.5-2.3 35.1-2.3 52.6 0-3.5-.5-7.1-1-10.6-1.4 17.4 2.4 34.3 7 50.5 13.7-3.2-1.3-6.4-2.7-9.6-4 15.8 6.7 30.6 15.3 44.2 25.8l-8.1-6.3c13.4 10.4 25.5 22.5 35.9 35.9l-6.3-8.1c10.4 13.6 19.1 28.4 25.8 44.2-1.3-3.2-2.7-6.4-4-9.6 6.7 16.2 11.3 33.1 13.7 50.5-.5-3.5-1-7.1-1.4-10.6 1.1 8.7 1.6 17.5 1.7 26.3.1 20.9 18.3 41 40 40 21.6-1 40.1-17.6 40-40-.2-47.9-14.6-96.9-42.8-135.9-7.6-10.5-15.7-20.8-24.7-30.1-9.1-9.4-19.1-17.5-29.5-25.4-18.9-14.4-40-25-62.4-33.2-90.3-33.1-199.2-3.6-260.3 70.8-8.4 10.2-16.4 20.8-23.2 32.2-6.8 11.3-12.1 23.3-17 35.5-9.2 22.6-13.9 46.6-15.8 70.9-3.7 47.6 8.7 97.3 33.5 138.1 23.9 39.4 60 73.2 102.2 92.3 12.4 5.6 25.1 10.8 38.3 14.5 13.1 3.6 26.4 5.6 39.9 7.2 24.6 2.9 49.7.9 74-4 92.3-18.8 169.6-98.3 183.9-191.6 2.1-13.6 3.7-27.2 3.7-41 .1-20.9-18.5-41-40-40-21.6.7-39.8 17.3-39.8 39.7zm132.7 625.3H289.7c-22.7 0-45.4.2-68.1 0-2.5 0-5-.2-7.4-.5 3.5.5 7.1 1 10.6 1.4-4-.6-7.8-1.7-11.5-3.2 3.2 1.3 6.4 2.7 9.6 4-4-1.7-7.7-3.9-11.2-6.6l8.1 6.3c-3-2.5-5.8-5.2-8.2-8.2l6.3 8.1c-2.7-3.5-4.8-7.2-6.6-11.2 1.3 3.2 2.7 6.4 4 9.6-1.5-3.7-2.5-7.6-3.2-11.5.5 3.5 1 7.1 1.4 10.6-1.6-12.1-.5-24.9-.5-37.1v-42.8c0-10.7.6-21.3 2-31.9-.5 3.5-1 7.1-1.4 10.6 2.8-20.5 8.2-40.6 16.3-59.7-1.3 3.2-2.7 6.4-4 9.6 7.8-18.2 17.8-35.3 29.9-51l-6.3 8.1c12.1-15.5 26-29.5 41.6-41.6L283 673c15.7-12.1 32.8-22.1 51-29.9-3.2 1.3-6.4 2.7-9.6 4 19.1-8 39.1-13.5 59.7-16.3-3.5.5-7.1 1-10.6 1.4 14.8-1.9 29.5-2 44.4-2h183c16.5 0 32.9-.1 49.4 2-3.5-.5-7.1-1-10.6-1.4 20.5 2.8 40.6 8.2 59.7 16.3-3.2-1.3-6.4-2.7-9.6-4 18.2 7.8 35.3 17.8 51 29.9l-8.1-6.3c15.5 12.1 29.5 26 41.6 41.6l-6.3-8.1c12.1 15.7 22.1 32.8 29.9 51-1.3-3.2-2.7-6.4-4-9.6 8 19.1 13.5 39.1 16.3 59.7-.5-3.5-1-7.1-1.4-10.6 1.9 15.1 2 30.1 2 45.3v49.5c0 5.7.2 11.4-.5 17 .5-3.5 1-7.1 1.4-10.6-.6 4-1.7 7.8-3.2 11.5 1.3-3.2 2.7-6.4 4-9.6-1.7 4-3.9 7.7-6.6 11.2l6.3-8.1c-2.5 3-5.2 5.8-8.2 8.2l8.1-6.3c-3.5 2.7-7.2 4.8-11.2 6.6 3.2-1.3 6.4-2.7 9.6-4-3.7 1.5-7.6 2.5-11.5 3.2 3.5-.5 7.1-1 10.6-1.4-2.2.3-4.5.4-6.8.5-10.3.1-20.9 4.4-28.3 11.7-6.9 6.9-12.2 18.3-11.7 28.3 1 21.4 17.6 40.3 40 40 38.9-.6 73.1-26 84.5-63.3 4.5-14.8 3.5-30.7 3.5-45.9 0-34.8 1.1-69.3-4.9-103.8-8.8-50.5-34.2-98-69-135.3-34.8-37.3-81.6-64.7-131.1-76.9-28.4-7-57-8.1-86-8.1H422.4c-29.7 0-59.2 1.4-88.1 9.1-49.1 13-95.3 40.7-129.4 78.3-34.4 37.9-59.3 85.5-67.4 136.3-5.4 34.1-4.3 68.3-4.3 102.7 0 15.8-.9 32.3 4.8 47.4 7.4 19.4 19.2 34.7 36.5 46.2 13.5 8.9 30.6 13.2 46.6 13.4 7.8.1 15.6 0 23.4 0h558.4c20.9 0 41-18.4 40-40-1-21.8-17.6-40.1-40.1-40.1z"/>
                  </svg>
                </label>
                <Field name="firstName" className={styles.input}
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
              </div>
              <div className={styles.fieldContainer}>
                <label htmlFor="lastName">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" id="user" className={styles.svg}>
                    <path fill="#fff"
                          d="M670.1 278.4c0 8.8-.6 17.6-1.7 26.3.5-3.5 1-7.1 1.4-10.6-2.4 17.4-7 34.3-13.7 50.5 1.3-3.2 2.7-6.4 4-9.6-6.7 15.8-15.3 30.6-25.8 44.2l6.3-8.1c-10.4 13.4-22.5 25.5-35.9 35.9l8.1-6.3c-13.6 10.4-28.4 19.1-44.2 25.8 3.2-1.3 6.4-2.7 9.6-4-16.2 6.7-33.1 11.3-50.5 13.7 3.5-.5 7.1-1 10.6-1.4-17.5 2.3-35.1 2.3-52.6 0 3.5.5 7.1 1 10.6 1.4-17.4-2.4-34.3-7-50.5-13.7 3.2 1.3 6.4 2.7 9.6 4-15.8-6.7-30.6-15.3-44.2-25.8l8.1 6.3c-13.4-10.4-25.5-22.5-35.9-35.9l6.3 8.1c-10.4-13.6-19.1-28.4-25.8-44.2 1.3 3.2 2.7 6.4 4 9.6-6.7-16.2-11.3-33.1-13.7-50.5.5 3.5 1 7.1 1.4 10.6-2.3-17.5-2.3-35.1 0-52.6-.5 3.5-1 7.1-1.4 10.6 2.4-17.4 7-34.3 13.7-50.5-1.3 3.2-2.7 6.4-4 9.6 6.7-15.8 15.3-30.6 25.8-44.2l-6.3 8.1c10.4-13.4 22.5-25.5 35.9-35.9l-8.1 6.3c13.6-10.4 28.4-19.1 44.2-25.8-3.2 1.3-6.4 2.7-9.6 4 16.2-6.7 33.1-11.3 50.5-13.7-3.5.5-7.1 1-10.6 1.4 17.5-2.3 35.1-2.3 52.6 0-3.5-.5-7.1-1-10.6-1.4 17.4 2.4 34.3 7 50.5 13.7-3.2-1.3-6.4-2.7-9.6-4 15.8 6.7 30.6 15.3 44.2 25.8l-8.1-6.3c13.4 10.4 25.5 22.5 35.9 35.9l-6.3-8.1c10.4 13.6 19.1 28.4 25.8 44.2-1.3-3.2-2.7-6.4-4-9.6 6.7 16.2 11.3 33.1 13.7 50.5-.5-3.5-1-7.1-1.4-10.6 1.1 8.7 1.6 17.5 1.7 26.3.1 20.9 18.3 41 40 40 21.6-1 40.1-17.6 40-40-.2-47.9-14.6-96.9-42.8-135.9-7.6-10.5-15.7-20.8-24.7-30.1-9.1-9.4-19.1-17.5-29.5-25.4-18.9-14.4-40-25-62.4-33.2-90.3-33.1-199.2-3.6-260.3 70.8-8.4 10.2-16.4 20.8-23.2 32.2-6.8 11.3-12.1 23.3-17 35.5-9.2 22.6-13.9 46.6-15.8 70.9-3.7 47.6 8.7 97.3 33.5 138.1 23.9 39.4 60 73.2 102.2 92.3 12.4 5.6 25.1 10.8 38.3 14.5 13.1 3.6 26.4 5.6 39.9 7.2 24.6 2.9 49.7.9 74-4 92.3-18.8 169.6-98.3 183.9-191.6 2.1-13.6 3.7-27.2 3.7-41 .1-20.9-18.5-41-40-40-21.6.7-39.8 17.3-39.8 39.7zm132.7 625.3H289.7c-22.7 0-45.4.2-68.1 0-2.5 0-5-.2-7.4-.5 3.5.5 7.1 1 10.6 1.4-4-.6-7.8-1.7-11.5-3.2 3.2 1.3 6.4 2.7 9.6 4-4-1.7-7.7-3.9-11.2-6.6l8.1 6.3c-3-2.5-5.8-5.2-8.2-8.2l6.3 8.1c-2.7-3.5-4.8-7.2-6.6-11.2 1.3 3.2 2.7 6.4 4 9.6-1.5-3.7-2.5-7.6-3.2-11.5.5 3.5 1 7.1 1.4 10.6-1.6-12.1-.5-24.9-.5-37.1v-42.8c0-10.7.6-21.3 2-31.9-.5 3.5-1 7.1-1.4 10.6 2.8-20.5 8.2-40.6 16.3-59.7-1.3 3.2-2.7 6.4-4 9.6 7.8-18.2 17.8-35.3 29.9-51l-6.3 8.1c12.1-15.5 26-29.5 41.6-41.6L283 673c15.7-12.1 32.8-22.1 51-29.9-3.2 1.3-6.4 2.7-9.6 4 19.1-8 39.1-13.5 59.7-16.3-3.5.5-7.1 1-10.6 1.4 14.8-1.9 29.5-2 44.4-2h183c16.5 0 32.9-.1 49.4 2-3.5-.5-7.1-1-10.6-1.4 20.5 2.8 40.6 8.2 59.7 16.3-3.2-1.3-6.4-2.7-9.6-4 18.2 7.8 35.3 17.8 51 29.9l-8.1-6.3c15.5 12.1 29.5 26 41.6 41.6l-6.3-8.1c12.1 15.7 22.1 32.8 29.9 51-1.3-3.2-2.7-6.4-4-9.6 8 19.1 13.5 39.1 16.3 59.7-.5-3.5-1-7.1-1.4-10.6 1.9 15.1 2 30.1 2 45.3v49.5c0 5.7.2 11.4-.5 17 .5-3.5 1-7.1 1.4-10.6-.6 4-1.7 7.8-3.2 11.5 1.3-3.2 2.7-6.4 4-9.6-1.7 4-3.9 7.7-6.6 11.2l6.3-8.1c-2.5 3-5.2 5.8-8.2 8.2l8.1-6.3c-3.5 2.7-7.2 4.8-11.2 6.6 3.2-1.3 6.4-2.7 9.6-4-3.7 1.5-7.6 2.5-11.5 3.2 3.5-.5 7.1-1 10.6-1.4-2.2.3-4.5.4-6.8.5-10.3.1-20.9 4.4-28.3 11.7-6.9 6.9-12.2 18.3-11.7 28.3 1 21.4 17.6 40.3 40 40 38.9-.6 73.1-26 84.5-63.3 4.5-14.8 3.5-30.7 3.5-45.9 0-34.8 1.1-69.3-4.9-103.8-8.8-50.5-34.2-98-69-135.3-34.8-37.3-81.6-64.7-131.1-76.9-28.4-7-57-8.1-86-8.1H422.4c-29.7 0-59.2 1.4-88.1 9.1-49.1 13-95.3 40.7-129.4 78.3-34.4 37.9-59.3 85.5-67.4 136.3-5.4 34.1-4.3 68.3-4.3 102.7 0 15.8-.9 32.3 4.8 47.4 7.4 19.4 19.2 34.7 36.5 46.2 13.5 8.9 30.6 13.2 46.6 13.4 7.8.1 15.6 0 23.4 0h558.4c20.9 0 41-18.4 40-40-1-21.8-17.6-40.1-40.1-40.1z"/>
                  </svg>
                </label>
                <Field name="lastName" className={styles.input}
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
              <div className={styles.fieldContainer}>
                <label htmlFor="dateOfBirth">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="date"
                       className={styles.svg}>
                    <path fill="#fff"
                          d="M2,19c0,1.7,1.3,3,3,3h14c1.7,0,3-1.3,3-3v-8H2V19z M19,4h-2V3c0-0.6-0.4-1-1-1s-1,0.4-1,1v1H9V3c0-0.6-0.4-1-1-1S7,2.4,7,3 v1H5C3.3,4,2,5.3,2,7v2h20V7C22,5.3,20.7,4,19,4z"/>
                  </svg>
                </label>
                <Field name="dateOfBirth" className={styles.input}
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
              </div>
              <div className={styles.fieldContainer}>
                <label htmlFor="city">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="40"
                       height="40" className={styles.svg}>
                    <path
                      d="M83 124v-15c0-1.7-1.3-3-3-3s-3 1.3-3 3v15c0 1.7 1.3 3 3 3S83 125.7 83 124zM23 110.3v-10c0-1.7-1.3-3-3-3s-3 1.3-3 3v10c0 1.7 1.3 3 3 3S23 112 23 110.3z"
                      fill="#ffffff" className="colorfff svgShape"/>
                    <path
                      d="M104.1,29.9c-1.2-1.2-3.1-1.2-4.2,0L83,46.8V14c0-1.7-1.3-3-3-3H61V4c0-1.7-1.3-3-3-3s-3,1.3-3,3v7H36c-1.7,0-3,1.3-3,3v31.5c-0.1,0-0.2,0-0.3,0C14.6,47.2,1,62.2,1,80.3c0,1.7,1.3,3,3,3h29V121H7V95.3c0-1.7-1.3-3-3-3s-3,1.3-3,3V124c0,1.7,1.3,3,3,3h32c1.7,0,3-1.3,3-3V17h38v52.3l-17.8-8.1c-0.9-0.4-2-0.3-2.9,0.2C55.5,62,55,63,55,64v60c0,1.7,1.3,3,3,3s3-1.3,3-3V68.7l38,17.3V124c0,1.7,1.3,3,3,3h22c1.7,0,3-1.3,3-3V54c0-0.8-0.3-1.6-0.9-2.1L104.1,29.9z M33,77.3H7.2C8.6,63.9,19.4,52.9,33,51.5V77.3z M121,121h-16V84c0-1.2-0.7-2.2-1.8-2.7L83,72.1c0,0,0,0,0-0.1V55.2l19-19l19,19V121z"
                      fill="#ffffff" className="colorfff svgShape"/>
                  </svg>
                </label>
                <Field name="city" className={styles.input}
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
              </div>
              <div className={styles.fieldContainer}>
                <label htmlFor="education">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="40" height="40"
                       className={styles.svg}>
                    <path
                      d="m512.868 650.199-440-240.3 440-240.4 440 240.3-440 240.4zm-377.4-240.3 377.4 206.1 377.4-206.2-377.4-206.1-377.4 206.2z"
                      fill="#fff" className="color000 svgShape" data-darkreader-inline-fill=""
                    />
                    <path
                      d="m511.868 855.299-299-155v-247.1l299 162.9 299-162.9v247.2l-299 154.9zm-269-173.2 269 139.4 269-139.4v-178.4l-269 146.5-269-146.5v178.4zM906.868 410.499h30v199h-30z"
                      fill="#fff" className="color000 svgShape" data-darkreader-inline-fill=""
                    />
                  </svg>
                </label>
                <Field name="education" className={styles.input}
                       validate={composeValidators(requiredField, minLength(4), maxLength(20))}>
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
              </div>
              <div className={styles.fieldContainer}>
                <label htmlFor="status">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="40" height="40"
                       className={styles.svg}>
                    <path fill="#fff"
                          d="M14.8783 4.08306C12.9851 3.63898 11.0149 3.63898 9.12171 4.08306C6.62161 4.6695 4.6695 6.6216 4.08306 9.12171C3.63898 11.0149 3.63898 12.9851 4.08306 14.8783C4.6695 17.3784 6.62161 19.3305 9.12171 19.9169C11.0149 20.361 12.9851 20.361 14.8783 19.9169C17.3784 19.3305 19.3305 17.3784 19.9169 14.8783C20.361 12.9851 20.361 11.0149 19.9169 9.12171C19.3305 6.62161 17.3784 4.6695 14.8783 4.08306ZM8.77916 2.6227C10.8976 2.12577 13.1024 2.12577 15.2208 2.6227C18.2756 3.33924 20.6608 5.72441 21.3773 8.77916C21.8742 10.8976 21.8742 13.1024 21.3773 15.2208C20.6608 18.2756 18.2756 20.6608 15.2208 21.3773C13.1024 21.8742 10.8976 21.8742 8.77916 21.3773C5.72441 20.6608 3.33924 18.2756 2.6227 15.2209C2.12577 13.1024 2.12577 10.8976 2.6227 8.77915C3.33924 5.72441 5.72441 3.33924 8.77916 2.6227ZM10.8164 11.5805C10.7468 11.6404 10.6673 11.7118 10.5673 11.8018L8.86077 13.3377C8.55289 13.6148 8.07867 13.5898 7.80157 13.2819C7.52448 12.974 7.54944 12.4998 7.85732 12.2227L9.56383 10.6869C9.57342 10.6782 9.58303 10.6696 9.59267 10.6609C9.77509 10.4966 9.96583 10.3248 10.1441 10.2048C10.3493 10.0666 10.6451 9.92139 11.0189 9.96835C11.3928 10.0153 11.6434 10.2292 11.8081 10.4139C11.9511 10.5743 12.0934 10.7879 12.2295 10.9922C12.2367 11.003 12.2439 11.0138 12.2511 11.0245L12.997 12.1434C13.0716 12.2554 13.131 12.3443 13.1836 12.4195C13.2532 12.3597 13.3327 12.2882 13.4327 12.1982L15.1392 10.6623C15.4471 10.3852 15.9213 10.4102 16.1984 10.7181C16.4755 11.026 16.4506 11.5002 16.1427 11.7773L14.4362 13.3131C14.4266 13.3218 14.417 13.3304 14.4073 13.3391C14.2249 13.5034 14.0342 13.6752 13.8559 13.7952C13.6507 13.9334 13.3549 14.0786 12.9811 14.0316C12.6072 13.9847 12.3566 13.7708 12.1919 13.5861C12.0489 13.4257 11.9066 13.2121 11.7705 13.0078C11.7633 12.997 11.7561 12.9862 11.7489 12.9755L11.003 11.8566C10.9284 11.7446 10.869 11.6557 10.8164 11.5805Z"
                          className="fff svgShape"
                    />
                  </svg>
                </label>
                <Field name="status" className={styles.input}
                       validate={composeValidators(requiredField, minLength(4), maxLength(20))}>
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
              </div>
              <div className={styles.fieldContainer}>
                <label htmlFor="avatar">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="40" height="40"
                       className={styles.svg}>
                    <path fill="#fff"
                          d="M14.8783 4.08306C12.9851 3.63898 11.0149 3.63898 9.12171 4.08306C6.62161 4.6695 4.6695 6.6216 4.08306 9.12171C3.63898 11.0149 3.63898 12.9851 4.08306 14.8783C4.6695 17.3784 6.62161 19.3305 9.12171 19.9169C11.0149 20.361 12.9851 20.361 14.8783 19.9169C17.3784 19.3305 19.3305 17.3784 19.9169 14.8783C20.361 12.9851 20.361 11.0149 19.9169 9.12171C19.3305 6.62161 17.3784 4.6695 14.8783 4.08306ZM8.77916 2.6227C10.8976 2.12577 13.1024 2.12577 15.2208 2.6227C18.2756 3.33924 20.6608 5.72441 21.3773 8.77916C21.8742 10.8976 21.8742 13.1024 21.3773 15.2208C20.6608 18.2756 18.2756 20.6608 15.2208 21.3773C13.1024 21.8742 10.8976 21.8742 8.77916 21.3773C5.72441 20.6608 3.33924 18.2756 2.6227 15.2209C2.12577 13.1024 2.12577 10.8976 2.6227 8.77915C3.33924 5.72441 5.72441 3.33924 8.77916 2.6227ZM10.8164 11.5805C10.7468 11.6404 10.6673 11.7118 10.5673 11.8018L8.86077 13.3377C8.55289 13.6148 8.07867 13.5898 7.80157 13.2819C7.52448 12.974 7.54944 12.4998 7.85732 12.2227L9.56383 10.6869C9.57342 10.6782 9.58303 10.6696 9.59267 10.6609C9.77509 10.4966 9.96583 10.3248 10.1441 10.2048C10.3493 10.0666 10.6451 9.92139 11.0189 9.96835C11.3928 10.0153 11.6434 10.2292 11.8081 10.4139C11.9511 10.5743 12.0934 10.7879 12.2295 10.9922C12.2367 11.003 12.2439 11.0138 12.2511 11.0245L12.997 12.1434C13.0716 12.2554 13.131 12.3443 13.1836 12.4195C13.2532 12.3597 13.3327 12.2882 13.4327 12.1982L15.1392 10.6623C15.4471 10.3852 15.9213 10.4102 16.1984 10.7181C16.4755 11.026 16.4506 11.5002 16.1427 11.7773L14.4362 13.3131C14.4266 13.3218 14.417 13.3304 14.4073 13.3391C14.2249 13.5034 14.0342 13.6752 13.8559 13.7952C13.6507 13.9334 13.3549 14.0786 12.9811 14.0316C12.6072 13.9847 12.3566 13.7708 12.1919 13.5861C12.0489 13.4257 11.9066 13.2121 11.7705 13.0078C11.7633 12.997 11.7561 12.9862 11.7489 12.9755L11.003 11.8566C10.9284 11.7446 10.869 11.6557 10.8164 11.5805Z"
                          className="fff svgShape"
                    />
                  </svg>
                </label>
                <div className={styles.inputContainer}>
                  <input name="avatar" type="file" placeholder="Your profile img"
                         accept="image/*"
                         className={styles.input}
                         onChange={(event) => {
                           props.setAvatar(event.target.files[0]);
                         }}
                  />
                  <p><span>{props.avatar ? props.avatar.name : "Choose your avatar"}</span></p>
                </div>
              </div>
              <button type="submit" className={styles.button}>Signup</button>
            </form>
          )}
    />
  );
}

export default SignupForm;