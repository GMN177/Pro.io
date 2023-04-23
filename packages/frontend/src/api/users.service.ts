import axios from 'axios';
import {baseURL, EndpointResponse} from '../api/axiosConfig';
import {User} from '@/models/user';

const enum usersEndpoints {
    users = "users/"
}

const findSingleUser = (id: string): EndpointResponse<User, null> => {
    return axios.get(baseURL + usersEndpoints.users + id);
}

const changeUsernameUser = (username: string, password: string, id: string): EndpointResponse<User, null> => {
    return axios.patch(baseURL + usersEndpoints.users + id, {"oldPassword": password, "newUsername": username, "newPassword": null});
}

const changeUsernamePassword = (oldPassword: string, newPassword: string, id: string): EndpointResponse<User, null> => {
    return axios.patch(baseURL + usersEndpoints.users + id, {"oldPassword": oldPassword, "newUsername": null, "newPassword": newPassword});
}


export const usersService = {
    findSingleUser,
    changeUsernameUser,
    changeUsernamePassword
}
