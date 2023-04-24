import { config } from 'dotenv';
import createAuth0Client from '@auth0/auth0-spa-js';

config(); // Load the environment variables from .env

const auth0Config = {
  domain: process.env.AUTH0_DOMAIN,
  client_id: process.env.AUTH0_CLIENT_ID,
  redirect_uri: process.env.AUTH0_REDIRECT_URI,
  audience: process.env.AUTH0_AUDIENCE,
};

let auth0Client = null;

const initializeAuth0 = async () => {
  auth0Client = await createAuth0Client({
    domain: auth0Config.domain,
    client_id: auth0Config.client_id,
    redirect_uri: auth0Config.redirect_uri,
    audience: auth0Config.audience,
  });
};

const loginWithRedirect = async () => {
  await auth0Client.loginWithRedirect();
};

const handleRedirectCallback = async () => {
  await auth0Client.handleRedirectCallback();
  const user = await auth0Client.getUser();
  return user;
};

const isAuthenticated = async () => {
  const isAuthenticated = await auth0Client.isAuthenticated();
  return isAuthenticated;
};

const getTokenSilently = async () => {
  const token = await auth0Client.getTokenSilently();
  return token;
};

const logout = async () => {
  await auth0Client.logout({
    returnTo: process.env.AUTH0_REDIRECT_URI,
  });
};

export {
  initializeAuth0,
  loginWithRedirect,
  handleRedirectCallback,
  isAuthenticated,
  getTokenSilently,
  logout,
};

