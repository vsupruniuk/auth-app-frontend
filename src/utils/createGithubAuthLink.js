import qs from 'query-string';

export const githubAuthLink = () => {
  const params = qs.stringify({
    client_id: process.env.REACT_APP_GITHUB_OAUTH_CLIENT_ID,
    redirect_uri: process.env.REACT_APP_GITHUB_OAUTH_REDIRECT_URI,
    scope: ['read:user', 'user:email'].join(' '),
    allow_signup: true,
  });

  return `https://github.com/login/oauth/authorize?${params}`;
}
