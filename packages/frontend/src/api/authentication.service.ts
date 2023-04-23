import {baseURL, EndpointResponse} from '../api/axiosConfig';
import axios from 'axios';

const enum authenticationEndpoints {
  login = "users/login",
  signUp = "users/signup",
  logout = "users/logout",
  refreshToken = "users/token",
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
const logout = async (username: string): EndpointResponse<null, null> => {
  return axios.post(baseURL + authenticationEndpoints.logout, {
    username
  });
};
const refreshToken = async (refreshToken: string): EndpointResponse<{accessToken: string}, null> => {
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
