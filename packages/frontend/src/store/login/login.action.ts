import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {NavigateFunction} from 'react-router-dom';
import {authenticationService} from '@/api/authentication.service';
import jwt_decode from "jwt-decode";
import {usersService} from '@/api/users.service';
import {User} from '@/models/user';
import {loggedUserActions} from '@/store/loggedUser/loggedUser.action';
const enum LOGIN_ACTIONS {
    userLogin = 'userLogin/',
    userTokenRefresh = 'userTokenRefresh/',
    userLogout = 'userLogout/',
    changeUsernameUser = 'changeUsernameUser/'
}

const userLogin = createAsyncThunk(LOGIN_ACTIONS.userLogin, async (bean:{username:string, password:string, navigate: NavigateFunction}, thunkAPI) => {
    try {
        const {username, password} = bean
        const resp = (await authenticationService.login(username, password)).data.data
        const {accessToken, refreshToken} = resp
        if(accessToken) {
            axios.defaults.headers['Authorization'] = 'Bearer ' + accessToken;
        }
        const id = jwt_decode<{id: string}>(accessToken).id
        thunkAPI.dispatch(loggedUserActions.findLoggedUser(id))
        bean.navigate('/')

        return {
            id,
            accessToken,
            refreshToken
        }
    } catch(e) {
        console.log('Login request failed')
        throw e;
    }
});

const changeUsernameUser = createAsyncThunk(LOGIN_ACTIONS.changeUsernameUser, async (params: {password: string, username: string, id: string} ,thunkAPI) => {
    try {
        const {password, username, id} = params
        const resp = await usersService.changeUsernameUser(username, password,id)
        const data = await resp.data
        return {
            data
        }
    } catch(e) {
        console.log("error", e.response.data)
        console.log('changeUsernameUser request failed')
        const data = e.response.data
        return {data};
    }
});

const changeUsernamePassword = createAsyncThunk(LOGIN_ACTIONS.changeUsernameUser, async (params: {password: string, newPassword: string, id: string} ,thunkAPI) => {
    try {

        console.log("params", params)
        const {password, newPassword, id} = params
        console.log(await usersService.changeUsernamePassword(password, newPassword,id))

    } catch(e) {
        console.log('changeUsernamePassword request failed')
        throw e;
    }
});

const userTokenRefresh = createAsyncThunk(LOGIN_ACTIONS.userTokenRefresh, async (params: {refreshToken: string}, thunkAPI) => {
    try {
        const {refreshToken} = params
        const resp = (await authenticationService.refreshToken(refreshToken)).data.data
        const {accessToken} = resp
        return {accessToken};
    } catch(e) {
        console.log('Refresh request failed')
        throw e;
    }
});

const userLogout = createAsyncThunk(LOGIN_ACTIONS.userLogout, async (params: {username: string, navigate: NavigateFunction}, thunkAPI) => {
    try {
        const {username, navigate} = params
        await authenticationService.logout(username)
        navigate('/')
        return ;
    } catch(e) {
        console.log('Logout request failed')
        throw e;
    }
});

export const loginActions = {
    userLogin,
    userTokenRefresh,
    userLogout,
    changeUsernameUser,
    changeUsernamePassword
}
