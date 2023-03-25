import {createAsyncThunk} from '@reduxjs/toolkit';
import {mocks} from '@/mocks';
import axios from 'axios';
import {NavigateFunction} from 'react-router-dom';
import {authenticationService} from '@/api/authentication.service';


const enum LOGIN_ACTIONS {
    userLogin = 'userLogin/',
    userTokenRefresh = 'userTokenRefresh/',
    userLogout = 'userLogout/'
}

const userLogin = createAsyncThunk(LOGIN_ACTIONS.userLogin, async (bean:{username:string, password:string, navigate: NavigateFunction}, thunkAPI) => {
    try {
        const {username, password} = bean
        // const {accessToken, refreshToken} = await authenticationService.login(username, password)
        console.log(await authenticationService.login(username, password))
        // if(accessToken) {
        //     axios.defaults.headers['Authorization'] = 'Bearer ' + accessToken;
        // }
        // bean.navigate('/')
        // return {
        //     accessToken, refreshToken
        // }
        return {payload: null}
    } catch(e) {
        console.log('Login request failed')
        throw e;
    }
});

const userTokenRefresh = createAsyncThunk(LOGIN_ACTIONS.userTokenRefresh, async (params: {refreshToken: string}, thunkAPI) => {
    try {
        const {accessToken} = await mocks.mockAPI({accessToken: 'test'})
        return {accessToken};
    } catch(e) {
        console.log('Refresh request failed')
        throw e;
    }
});

const userLogout = createAsyncThunk(LOGIN_ACTIONS.userLogout, async (params: {username: string, navigate: NavigateFunction}, thunkAPI) => {
    try {
        const {username} = params
        await mocks.mockAPI({username})
        params.navigate('/')
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
