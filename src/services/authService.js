import { authClient } from '../http/authClient.js';

function register({ name, email, password }) {
  return authClient.post('/registration', { name, email, password })
}

function login({ email, password }) {
  return authClient.post('/login', { email, password })
}

function logout() {
  return authClient.post('/logout')
}

function activate(activationToken) {
  return authClient.get(`/activation/${activationToken}`);
}

function refresh() {
  return authClient.get('/refresh');
}

function reset({ email }) {
  return authClient.post('/reset', { email })
}

function changePassword({ resetToken, newPassword, passwordConfirmation }) {
  return authClient.post(`/reset/${resetToken}`, { newPassword, passwordConfirmation })
}

export const authService = { register, login, logout, activate, refresh, reset, changePassword };
