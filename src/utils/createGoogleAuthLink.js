import qs from 'query-string';

export const googleAuthLink = () => {
  const stringifiedParams = qs.stringify({
    client_id: process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID,
    redirect_uri: process.env.REACT_APP_GOOGLE_OAUTH_REDIRECT_URI,
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ].join(' '),
    response_type: 'code',
    access_type: 'offline',
    prompt: 'consent',
  });

  return `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;
};
