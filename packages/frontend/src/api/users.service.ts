import axios from 'axios';
import {baseURL, EndpointResponse} from '../api/axiosConfig';
import {User} from '@/models/user';

export const enum usersEndpoints {
    users = "users/",
    leaderboard = "users/topPlayers/"
}

const findSingleUser = (id: string): EndpointResponse<{user: User}, null> => {
    return axios.get(baseURL + usersEndpoints.users + id);
}

const findUsers = (): EndpointResponse<{users: User[]}, null> => {
    return axios.get(baseURL + usersEndpoints.users);
}

const changeUsernameUser = (username: string, password: string, id: string): EndpointResponse<User, null> => {
    return axios.patch(baseURL + usersEndpoints.users + id, {"oldPassword": password, "newUsername": username, "newPassword": null});
}

const changeUsernamePassword = (oldPassword: string, newPassword: string, id: string): EndpointResponse<User, null> => {
    return axios.patch(baseURL + usersEndpoints.users + id, {"oldPassword": oldPassword, "newUsername": null, "newPassword": newPassword});
}

const findFriends = (userId: string): EndpointResponse<{friends: any[], sent: any[], pending: any[]}, any> => {
    return axios.get(baseURL + usersEndpoints.users + userId + '/friends/')
}

const addFriend = (bean: {userId: string, friendId: string}): EndpointResponse<any, any> => {
    return axios.post(baseURL + usersEndpoints.users + 'friends/', bean)
}
const deleteUser = (id: string): EndpointResponse<User, null> => {
    return axios.delete(baseURL + usersEndpoints.users + id);
}

const acceptOrDeclineFriendRequest = (bean:{friendId: string, accept: boolean, userId: string}): EndpointResponse<any, any> => {
    return axios.post(baseURL + usersEndpoints.users + bean.userId + '/friends/accept', {friendId: bean.friendId, accept: bean.accept})
}

export const usersService = {
    findSingleUser,
    changeUsernameUser,
    changeUsernamePassword,
    findFriends,
    findUsers,
    addFriend,
    deleteUser,
    acceptOrDeclineFriendRequest
}
