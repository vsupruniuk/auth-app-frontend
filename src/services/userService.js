import { httpClient } from '../http/httpClient.js';

function getAll() {
  return httpClient.get('/users')
}

function changeName({ newName }) {
  return httpClient.post('/change-name', { newName })
}

function changeEmail({ password, newEmail }) {
  return httpClient.post('/change-email', { password, newEmail });
}

function changePassword({ password, newPassword, passwordConfirmation }) {
  return httpClient.post('/change-password', { password, newPassword, passwordConfirmation })
}

export const userService = { getAll, changeName, changeEmail, changePassword };
