import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {NavigateFunction} from 'react-router-dom';
import {authenticationService} from '@/api/authentication.service';
import jwt_decode from "jwt-decode";
import {loggedUserActions} from '@/store/loggedUser/loggedUser.action';
import {RootState} from '@/store/reducer.config';
import {gameSocket, getChatSocketInstance, getGameSocketInstance} from '@/api/socket';
import {usersService} from '@/api/users.service';
const enum LOGIN_ACTIONS {
    userLogin = 'userLogin/',
    userTokenRefresh = 'userTokenRefresh/',
    userLogout = 'userLogout/',
    setStoredInfo = 'setStoredInfo/'
}

const userLogin = createAsyncThunk(LOGIN_ACTIONS.userLogin, async (bean:{username:string, password:string, navigate: NavigateFunction}, thunkAPI) => {
    try {
        const {username, password} = bean
        const resp = (await authenticationService.login(username, password)).data.data
        const {accessToken, refreshToken} = resp
        const id = jwt_decode<{id: string}>(accessToken).id
        const loggedUser = (await usersService.findSingleUser(id)).data.data.user
        if(loggedUser.status === 'INACTIVE' || loggedUser.inactive === true) {
            alert('User has not confirmed his email')
        } else {
            if (accessToken) {
                axios.defaults.headers['Authorization'] = 'Bearer ' + accessToken;
            }
            sessionStorage.setItem('PRO_IO_SESSION', JSON.stringify({
                accessToken,
                refreshToken,
                // 15 minutes
                expiresAt: (Date.now() + (15 * 60 * 1000)),
                id
            }))
            bean.navigate('/')

            return {
                id,
                accessToken,
                refreshToken,
                expiresAt: (Date.now() + (15 * 60 * 1000))
            }
        }
    } catch(e) {
        console.log('Login request failed', e)
        return thunkAPI.rejectWithValue(e.response.data.message);
    }
});

const userTokenRefresh = createAsyncThunk(LOGIN_ACTIONS.userTokenRefresh, async (params: {refreshToken: string}, thunkAPI) => {
    try {
        const {refreshToken} = params
        const {loggedUser} = thunkAPI.getState() as RootState
        const resp = (await authenticationService.refreshToken(refreshToken)).data.data
        const {new_access_token} = resp
        sessionStorage.setItem('PRO_IO_SESSION', JSON.stringify({
            accessToken: new_access_token,
            refreshToken,
            expiresAt: (Date.now() + (15 * 60 * 1000)),
            id: loggedUser.loggedUser.id
        }))
        axios.defaults.headers['Authorization'] = 'Bearer ' + new_access_token;
        return {accessToken: new_access_token, refreshToken, expiresAt: (Date.now() + (15 * 60 * 1000))};
    } catch(e) {
        console.log('Refresh request failed')
        throw e;
    }
});

const userLogout = createAsyncThunk(LOGIN_ACTIONS.userLogout, async (params: {refreshToken: string, navigate?: NavigateFunction}, thunkAPI) => {
    try {
        const {refreshToken, navigate} = params
        await authenticationService.logout(refreshToken)
        sessionStorage.removeItem('PRO_IO_SESSION')
        navigate?.('/')
        return ;
    } catch(e) {
        console.log('Logout request failed')
        throw e;
    }
});

const setStoredInfo = createAsyncThunk(LOGIN_ACTIONS.setStoredInfo, async (params: {id: string, expiresAt: number, accessToken: string, refreshToken: string}, thunkAPI): Promise<{id: string, expiresAt: number, accessToken: string, refreshToken: string} | undefined> => {
    if(params.expiresAt && (params.expiresAt - (60 * 1000) < Date.now())) {
        thunkAPI.dispatch(userLogout({refreshToken: params.refreshToken}))
        return undefined
    }
    return {...params}
})

export const loginActions = {
    userLogin,
    userTokenRefresh,
    userLogout,
    setStoredInfo
}
