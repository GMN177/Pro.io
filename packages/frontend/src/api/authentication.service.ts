import { baseURL } from "../api/axiosConfig";
import axios, {AxiosResponse} from 'axios';

const enum authenticationEndpoints {
  login = "/api/users/login",
  signup = "/users/signup",
  logout = "/users/logout",
  refreshToken = "/users/token",
}

const login = async (username: string, password: string): Promise<AxiosResponse<any>> => {
  return axios.post(baseURL + authenticationEndpoints.login, {
    username,
    password,
  });
};

export const authenticationService = {
  login,
};
