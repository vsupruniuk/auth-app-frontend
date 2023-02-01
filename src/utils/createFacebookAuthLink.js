import qs from 'query-string';

export const facebookAuthLink = () => {
  const stringifiedParams = qs.stringify({
    client_id: process.env.REACT_APP_FACEBOOK_OAUTH_CLIENT_ID,
    redirect_uri: process.env.REACT_APP_FACEBOOK_OAUTH_REDIRECT_URI,
    scope: ['email', 'user_friends'].join(','), // comma seperated string
    response_type: 'code',
    auth_type: 'rerequest',
    display: 'popup',
  });

  return `https://www.facebook.com/v4.0/dialog/oauth?${stringifiedParams}`;
};
