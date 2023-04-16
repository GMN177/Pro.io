import axios, {AxiosResponse} from 'axios';
import {baseURL, EndpointResponseBaseInterface} from '@/api/axiosConfig';
import {User} from '@/models/user';

const enum usersEndpoints {
    users = "users/"
}

const findSingleUser = (id: string): Promise<AxiosResponse<EndpointResponseBaseInterface<User, null>>> => {
    return axios.get(baseURL + usersEndpoints.users + id);
}

export const usersService = {
    findSingleUser
}
