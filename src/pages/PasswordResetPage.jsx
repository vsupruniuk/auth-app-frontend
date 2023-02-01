import React, {useContext, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import cn from 'classnames';

import { authService } from '../services/authService.js';
import { usePageError } from '../hooks/usePageError.js';

const validatePassword = (value) => {
  if (!value) {
    return 'Password is required';
  }

  if (value.length < 6) {
    return 'At least 6 characters';
  }
};

export const PasswordResetPage = () => {
  const [pageError, setPageError] = usePageError('');
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const navigate = useNavigate();

  const { resetToken } = useParams();

  if (done) {
    return (
        <>
          <h1 className="title">Password reset</h1>

          {error ? (
              <p className="notification is-danger is-light">
                {error}
              </p>
          ) : (
              <>
                <p className="notification is-success is-light">
                  Password successfully changed
                </p>

                <Link to="/login" className="button is-success has-text-weight-bold">
                  Log in
                </Link>
              </>
          )}
        </>
    );
  }

  return (
    <>
      <Formik
        initialValues={{
          newPassword: '',
          passwordConfirmation: '',
        }}
        validateOnMount={true}
        onSubmit={({ newPassword, passwordConfirmation }, formikHelpers) => {
          formikHelpers.setSubmitting(true);

          authService.changePassword({ resetToken, newPassword, passwordConfirmation })
            .then(() => {
              setDone(true);
            })
            .catch((error) => {
              if (error.message) {
                setError(error.message);
              }

              if (!error.response?.data) {
                return;
              }

              const { errors, message } = error.response.data;

              formikHelpers.setFieldError('newPassword', errors?.newPassword);
              formikHelpers.setFieldError('passwordConfirmation', errors?.passwordConfirmation);

              if (message) {
                setError(message);
              }
            })
            .finally(() => {
              formikHelpers.setSubmitting(false);
            })
          }
        }
      >
        {({ touched, errors, isSubmitting }) => (
          <Form className="box">
            <h1 className="title">Enter a new password</h1>

            <div className="field">
              <label htmlFor="newPassword" className="label">
                New password
              </label>

              <div className="control has-icons-left has-icons-right">
                <Field
                    validate={validatePassword}
                    name="newPassword"
                    type="password"
                    id="newPassword"
                    placeholder="******"
                    className={cn('input', {
                      'is-danger': touched.newPassword && errors.newPassword,
                    })}
                />

                <span className="icon is-small is-left">
                  <i className="fa-solid fa-lock"></i>
                </span>

                {touched.newPassword && errors.newPassword && (
                    <span className="icon is-small is-right has-text-danger">
                    <i className="fas fa-exclamation-triangle"></i>
                  </span>
                )}
              </div>

              {touched.newPassword && errors.newPassword ? (
                  <p className="help is-danger">{errors.newPassword}</p>
              ) : (
                  <p className="help">At least 6 characters</p>
              )}
            </div>

            <div className="field">
              <label htmlFor="passwordConfirmation" className="label">Password confirmation</label>

              <div className="control has-icons-left has-icons-right">
                <Field
                  validate={validatePassword}
                  name="passwordConfirmation"
                  type="password"
                  id="passwordConfirmation"
                  placeholder="******"
                  className={cn('input', {
                    'is-danger': touched.passwordConfirmation && errors.passwordConfirmation,
                  })}
                />

                <span className="icon is-small is-left">
                  <i className="fa fa-lock"></i>
                </span>

                {touched.passwordConfirmation && errors.passwordConfirmation && (
                  <span className="icon is-small is-right has-text-danger">
                    <i className="fas fa-exclamation-triangle"></i>
                  </span>
                )}
              </div>

              {touched.passwordConfirmation && errors.passwordConfirmation && (
                <p className="help is-danger">{errors.passwordConfirmation}</p>
              )}
            </div>

            <div className="field">
              <button
                type="submit"
                className={cn('button is-success has-text-weight-bold', {
                  'is-loading': isSubmitting,
                })}
                disabled={isSubmitting || errors.newPassword || errors.passwordConfirmation}
              >
                Change password
              </button>
            </div>
          </Form>
        )}
      </Formik>

      {pageError && <p className="notification is-danger is-light">{pageError}</p>}
    </>
  );
};
