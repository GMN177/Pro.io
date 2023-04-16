import {baseURL, EndpointResponseBaseInterface} from '../api/axiosConfig';
import axios, {AxiosResponse} from 'axios';

const enum authenticationEndpoints {
  login = "users/login",
  signUp = "users/signup",
  logout = "users/logout",
  refreshToken = "users/token",
}

const login = async (username: string, password: string): Promise<AxiosResponse<EndpointResponseBaseInterface<{accessToken: string, refreshToken: string}, null>>> => {
  return axios.post(baseURL + authenticationEndpoints.login, {
    username,
    password,
  });
};
const signUp = async (username: string, email:string, password: string): Promise<AxiosResponse<EndpointResponseBaseInterface<null, string>>> => {
  return axios.post(baseURL + authenticationEndpoints.signUp, {
    username,
    email,
    password,
  });
};
const logout = async (username: string): Promise<AxiosResponse<EndpointResponseBaseInterface<null, null>>> => {
  return axios.post(baseURL + authenticationEndpoints.logout, {
    username
  });
};
const refreshToken = async (refreshToken: string): Promise<AxiosResponse<EndpointResponseBaseInterface<{accessToken: string}, null>>> => {
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
