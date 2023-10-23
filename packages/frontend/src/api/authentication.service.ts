import {baseURL, EndpointResponse} from '../api/axiosConfig';
import axios from 'axios';

const enum authenticationEndpoints {
  login = "auth/login",
  signUp = "auth/signup",
  logout = "auth/logout",
  refreshToken = "auth/token",
}

const login = async (username: string, password: string): EndpointResponse<{accessToken: string, refreshToken: string}, null> => {
  return axios.post(baseURL + authenticationEndpoints.login, {
    username,
    password,
  });
};

const signUp = async (username: string, email:string, password: string): EndpointResponse<null, string> => {
  return axios.post(baseURL + authenticationEndpoints.signUp, {
    username,
    email,
    password,
  });
};
const logout = async (refreshToken: string): EndpointResponse<null, null> => {
  return axios.post(baseURL + authenticationEndpoints.logout, {
    refreshToken
  });
};
const refreshToken = async (refreshToken: string): EndpointResponse<{new_access_token: string}, null> => {
  return axios.post(baseURL + authenticationEndpoints.refreshToken, {
    refreshToken
  });
};

export const authenticationService = {
  login,
  signUp,
  refreshToken,
  logout
};
