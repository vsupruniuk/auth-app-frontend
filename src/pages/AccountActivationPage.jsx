import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { AuthContext } from '../components/AuthContext.jsx';
import { Loader } from '../components/Loader.jsx';

export const AccountActivationPage = () => {
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const navigate = useNavigate();

  const { activate } = useContext(AuthContext);
  const { activationToken } = useParams();

  useEffect(() => {
    activate(activationToken)
      .catch(error => {
        setError(error.response?.data?.message || `Wrong activation link`);
      })
      .finally(() => {
        setDone(true);
        setTimeout(() => {
          navigate('/profile');
        }, 3000)
      });
  }, []);

  if (!done) {
    return <Loader />
  }

  return (
    <>
      <h1 className="title">Account activation</h1>

      {error ? (
        <p className="notification is-danger is-light">
          {error}
        </p>
      ) : (
        <p className="notification is-success is-light">
          Your account is now active
        </p>
      )}
    </>
  );
};
