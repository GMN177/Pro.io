import axios, {AxiosResponse} from 'axios';
import {baseURL, EndpointResponseBaseInterface} from '@/api/axiosConfig';
import {User} from '@/models/user';

const enum usersEndpoints {
    users = "users/"
}

const findSingleUser = (id: string): Promise<AxiosResponse<EndpointResponseBaseInterface<User, null>>> => {
    return axios.get(baseURL + usersEndpoints.users + id);
}

const changeUsernameUser = (username: string, password: string, id: string): Promise<AxiosResponse<EndpointResponseBaseInterface<User, null>>> => {
    return axios.patch(baseURL + usersEndpoints.users + id, {"oldPassword": password, "newUsername": username, "newPassword": null});
}

const changeUsernamePassword = (oldPassword: string, newPassword: string, id: string): Promise<AxiosResponse<EndpointResponseBaseInterface<User, null>>> => {
    return axios.patch(baseURL + usersEndpoints.users + id, {"oldPassword": oldPassword, "newUsername": null, "newPassword": newPassword});
}


export const usersService = {
    findSingleUser,
    changeUsernameUser,
    changeUsernamePassword
}
