import { AuthContext } from '../components/AuthContext';
import React, { useContext, useState } from 'react';
import { Field, Form, Formik } from 'formik';
import { usePageError}  from '../hooks/usePageError';
import cn from 'classnames';

export const Profile = () => {
  const { user, changeName, changeEmail, changePassword } = useContext(AuthContext);
  const [error, setError] = usePageError('');
  const [changeNameActive, setChangeNameActive] = useState(false);
  const [changeEmailActive, setChangeEmailActive] = useState(false);
  const [changePasswordActive, setChangePasswordActive] = useState(false);

  const validateName = (value) => {
    if (!value) {
      return 'Name is required';
    }

    if (value.length < 3) {
      return 'At least 3 characters';
    }
  };

  const validatePassword = (value) => {
    if (!value) {
      return 'Password is required';
    }

    if (value.length < 6) {
      return 'At least 6 characters';
    }
  };

  const validateEmail = (value) => {
    if (!value) {
      return 'Email is required';
    }

    const emailPattern = /^[\w.+-]+@([\w-]+\.){1,3}[\w-]{2,}$/;

    if (!emailPattern.test(value)) {
      return 'Email is not valid';
    }
  };

  return (
    <div className="container is-max-desktop box">
      <h1 className="title is-2 title-custom">Your profile</h1>
        <div>
          <div>
            <h1 className="title is-3 profile-title">{`Name: ${user.name}`}</h1>

            {changeNameActive && (
              <Formik
                initialValues={{
                  newName: '',
                }}
                validateOnMount={true}
                onSubmit={({ newName }) => {
                return changeName({ newName })
                  .then(() => {
                    setChangeNameActive(false);
                  })
                  .catch(error => {
                    setError(error.response?.data?.message);
                  });
                }}
              >
                {({ touched, errors, isSubmitting }) => (
                  <Form>
                    <div className="field">
                      <label htmlFor="newName" className="label">New name</label>

                      <div className="control has-icons-left has-icons-right">
                        <Field
                          validate={validateName}
                          name="newName"
                          type="text"
                          id="newName"
                          placeholder="e.g. John"
                          className={cn('input', {
                            'is-danger': touched.newName && errors.newName,
                          })}
                        />

                        <span className="icon is-small is-left">
                          <i className="fa fa-user"></i>
                        </span>

                        {touched.newName && errors.newName && (
                          <span className="icon is-small is-right has-text-danger">
                            <i className="fas fa-exclamation-triangle"></i>
                          </span>
                        )}
                      </div>

                      {touched.newName && errors.newName ? (
                          <p className="help is-danger">{errors.newName}</p>
                      ) : (
                          <p className="help">At least 3 characters</p>
                      )}
                    </div>

                    <div className="field">
                      <button
                        type="submit"
                        className={cn('button is-success has-text-weight-bold', {
                          'is-loading': isSubmitting,
                        })}
                        disabled={isSubmitting || errors.newName}
                      >
                        Change name
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            )}

            {!changeNameActive && (
              <div className="field">
                <button
                  type="button"
                  className={'button is-success has-text-weight-bold'}
                  onClick={() => setChangeNameActive(true)}
                  >
                    Change name
                  </button>
                </div>
            )}

            {error && <p className="notification is-danger is-light">{error}</p>}
          </div>

          <h1 className="title is-3 profile-title">{`Email: ${user.email}`}</h1>

          {changeEmailActive && (
            <Formik
              initialValues={{
                password: '',
                newEmail: '',
              }}
              validateOnMount={true}
              onSubmit={({ password, newEmail }) => {
                return changeEmail({ password, newEmail })
                  .then(() => {
                    setChangeEmailActive(false);
                  })
                  .catch(error => {
                    setError(error.response?.data?.message);
                  });
                }}
              >
                {({ touched, errors, isSubmitting }) => (
                  <Form>
                    <div className="field">
                      <label htmlFor="password" className="label">Password</label>

                      <div className="control has-icons-left has-icons-right">
                        <Field
                          validate={validatePassword}
                          name="password"
                          type="password"
                          id="password"
                          placeholder="******"
                          className={cn('input', {
                            'is-danger': touched.password && errors.password,
                          })}
                        />

                        <span className="icon is-small is-left">
                          <i className="fa fa-lock"></i>
                        </span>

                        {touched.password && errors.password && (
                          <span className="icon is-small is-right has-text-danger">
                            <i className="fas fa-exclamation-triangle"></i>
                          </span>
                        )}
                      </div>

                      {touched.password && errors.password && (
                        <p className="help is-danger">{errors.password}</p>
                      )}
                    </div>

                    <div className="field">
                      <label htmlFor="newEmail" className="label">New email</label>

                      <div className="control has-icons-left has-icons-right">
                        <Field
                          validate={validateEmail}
                          name="newEmail"
                          type="text"
                          id="newEmail"
                          placeholder="e.g. bobsmith@gmail.com"
                          className={cn('input', {
                            'is-danger': touched.newEmail && errors.newEmail,
                          })}
                        />

                        <span className="icon is-small is-left">
                          <i className="fa fa-envelope"></i>
                        </span>

                        {touched.newEmail && errors.newEmail && (
                          <span className="icon is-small is-right has-text-danger">
                            <i className="fas fa-exclamation-triangle"></i>
                          </span>
                        )}
                      </div>

                      {touched.newEmail && errors.newEmail && (
                        <p className="help is-danger">{errors.newEmail}</p>
                      )}
                    </div>

                    <div className="field">
                      <button
                        type="submit"
                        className={cn('button is-success has-text-weight-bold', {
                          'is-loading': isSubmitting,
                        })}
                        disabled={isSubmitting || errors.newEmail}
                      >
                        Change email
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
          )}

          {!changeEmailActive && (
            <div className="field">
              <button
                type="button"
                className={'button is-success has-text-weight-bold'}
                onClick={() => setChangeEmailActive(true)}
              >
                Change email
              </button>
            </div>
          )}

          {changePasswordActive && (
            <Formik
              initialValues={{
                password: '',
                newPassword: '',
                passwordConfirmation: '',
              }}
              validateOnMount={true}
              onSubmit={({ password, newPassword, passwordConfirmation }) => {
                return changePassword({ password, newPassword, passwordConfirmation })
                .then(() => {
                  setChangeNameActive(false);
                })
                .catch(error => {
                  setError(error.response?.data?.message);
                });
              }}
            >
              {({ touched, errors, isSubmitting }) => (
                <Form>
                  <div className="field">
                    <label htmlFor="password" className="label">Password</label>

                    <div className="control has-icons-left has-icons-right">
                      <Field
                        validate={validatePassword}
                        name="password"
                        type="password"
                        id="password"
                        placeholder="******"
                        className={cn('input', {
                          'is-danger': touched.password && errors.password,
                        })}
                      />

                      <span className="icon is-small is-left">
                        <i className="fa fa-lock"></i>
                      </span>

                      {touched.password && errors.password && (
                        <span className="icon is-small is-right has-text-danger">
                          <i className="fas fa-exclamation-triangle"></i>
                        </span>
                      )}
                    </div>

                    {touched.password && errors.password && (
                      <p className="help is-danger">{errors.password}</p>
                    )}
                  </div>

                  <div className="field">
                    <label htmlFor="newPassword" className="label">New password</label>

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
                        <i className="fa fa-lock"></i>
                      </span>

                      {touched.password && errors.password && (
                        <span className="icon is-small is-right has-text-danger">
                          <i className="fas fa-exclamation-triangle"></i>
                        </span>
                      )}
                    </div>

                    {touched.newPassword && errors.newPassword && (
                      <p className="help is-danger">{errors.newPassword}</p>
                    )}
                  </div>

                  <div className="field">
                    <label htmlFor="passwordConfirmation" className="label">Confirm password</label>

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
                      disabled={isSubmitting || errors.password || errors.newPassword || errors.passwordConfirmation}
                    >
                      Change password
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          )}

          {!changePasswordActive && (
            <div className="field">
              <button
                type="button"
                className={'button is-success has-text-weight-bold'}
                onClick={() => setChangePasswordActive(true)}
              >
                Change password
              </button>
            </div>
          )}
        </div>
      </div>
  )
};
