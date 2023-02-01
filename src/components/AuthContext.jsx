import React, { useMemo, useState } from 'react';
import { accessTokenService } from '../services/accessTokenService.js';
import { authService } from '../services/authService.js';
import { userService } from '../services/userService';

export const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isChecked, setChecked] = useState(true);

  async function activate(activationToken) {
    const { accessToken, user } = await authService.activate(activationToken);

    accessTokenService.save(accessToken);
    setUser(user);
  }

  async function checkAuth() {
    try {
      const { accessToken, user } = await authService.refresh();

      accessTokenService.save(accessToken);
      setUser(user);
    } catch (error) {
      console.log('User is not authentincated');
    } finally {
      setChecked(true);
    }
  }

  async function login({ email, password }) {
    const { accessToken, user } = await authService.login({ email, password });

    accessTokenService.save(accessToken);
    setUser(user);
  }

  async function logout() {
    await authService.logout();

    accessTokenService.remove();
    setUser(null);
  }

  async function changeName({ newName }) {
    const { accessToken, user } = await userService.changeName({ newName });

    accessTokenService.save(accessToken);
    setUser(user);
  }

  async function changeEmail({ password, newEmail }) {
    const { accessToken, user } = await userService.changeEmail({ password, newEmail });

    accessTokenService.save(accessToken);
    setUser(user)
  }

  async function changePassword({ password, newPassword, passwordConfirmation }) {
    const { accessToken, user } = await userService.changePassword({ password, newPassword, passwordConfirmation });

    accessTokenService.save(accessToken);
    setUser(user);
  }

  const value = useMemo(() => ({
    isChecked,
    user,
    checkAuth,
    activate,
    login,
    logout,
    changeName,
    changeEmail,
    changePassword,
  }), [user, isChecked]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
