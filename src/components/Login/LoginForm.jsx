import styles from "./Login.module.css";
import {Field, Form} from "react-final-form";
import {composeValidators, minLength, requiredField} from "../../utils/validators/formsValidator";
import React from "react";

function LoginForm(props) {
  return (
    <Form action=""
          onSubmit={props.onSubmit}
          render={({handleSubmit, form, submitting, pristine, values}) => (
            <form action="" onSubmit={handleSubmit}>
              <div className={styles.fieldContainer}>
                <label htmlFor="email">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 96" className={styles.svg}>
                    <path
                      fill="#fff"
                      d="M0 11.283V8a8 8 0 0 1 8-8h112a8 8 0 0 1 8 8v3.283l-64 40zm66.12 48.11a4.004 4.004 0 0 1-4.24 0L0 20.717V88a8 8 0 0 0 8 8h112a8 8 0 0 0 8-8V20.717z"
                      data-name="Layer 2"/>
                  </svg>
                </label>
                <Field name="email" className={styles.input}
                       validate={requiredField}>
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
              <button type="submit" className={styles.button}>Login</button>
            </form>
          )}
    />
  );
}

function renderField({input, placeholder, type, meta: {touched, error, warning}}) {
  return (
    <div className={styles.inputContainer}>
      <input {...input} placeholder={placeholder} type={type}
             autoComplete={"on"}
             className={styles.input + " " + (touched && (warning || error) && styles.invalidField)}/>
      {touched && (warning || error) && <div className={styles.warning}>
        <p>{error || warning}</p>
      </div>}
    </div>
  );
}

export default LoginForm;