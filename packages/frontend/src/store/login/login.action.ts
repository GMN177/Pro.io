import {createAsyncThunk} from '@reduxjs/toolkit';
import {mocks} from '@/mocks';
import axios from 'axios';
import {NavigateFunction} from 'react-router-dom';
import {authenticationService} from '@/api/authentication.service';
import jwt_decode from "jwt-decode";
const enum LOGIN_ACTIONS {
    userLogin = 'userLogin/',
    userTokenRefresh = 'userTokenRefresh/',
    userLogout = 'userLogout/'
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
    userLogout
}
