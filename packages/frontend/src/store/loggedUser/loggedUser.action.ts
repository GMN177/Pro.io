import {createAsyncThunk, createAction} from '@reduxjs/toolkit';
import {User} from '@/models/user';
import {usersService} from '@/api/users.service';

const enum LOGGED_USER_ACTIONS {
    findLoggedUser = 'findLoggedUser/',
    changeUsernameUser = 'changeUsernameUser/',
    changeUsernamePassword = 'changeUsernamePassword/',
    addUserToMatch = 'addUserToMatch',
    deleteUser = 'deleteUser/',
    resetUserAttributes = 'resetUserAttributes/'
}

const findLoggedUser = createAsyncThunk(LOGGED_USER_ACTIONS.findLoggedUser, async (id: string, thunkAPI) => {
    try {
        console.log('id', id)
        const user: User = (await usersService.findSingleUser(id)).data.data.user
        return {
            user
        }
    } catch(e) {
        console.log('findLoggedUser request failed')
        throw e;
    }
});

const changeUsernameUser = createAsyncThunk(LOGGED_USER_ACTIONS.changeUsernameUser, async (params: {password: string, username: string, id: string} ,thunkAPI) => {
    try {
        const {password, username, id} = params
        const resp = await usersService.changeUsernameUser(username, password,id)
        console.log(resp)
      
    } catch(e) {
        console.log("error", e.response.data)
        console.log('changeUsernameUser request failed')
        throw e;
    }
});

const changeUsernamePassword = createAsyncThunk(LOGGED_USER_ACTIONS.changeUsernamePassword, async (params: {password: string, newPassword: string, id: string} ,thunkAPI) => {
    try {

        console.log("params", params)
        const {password, newPassword, id} = params
        const resp = await usersService.changeUsernamePassword(password, newPassword,id)
        console.log(resp)

    } catch(e) {
        console.log('changeUsernamePassword request failed')
        throw e;
    }
});

const addUserToMatch = createAction(LOGGED_USER_ACTIONS.addUserToMatch, (matchId: string) => {
    console.log('payload', matchId)
    return {
        payload: {
            matchId: matchId
        }
    }
});

const resetUserAttributes = createAction(LOGGED_USER_ACTIONS.resetUserAttributes, () => {
    return {};
});

const deleteUser = createAsyncThunk(LOGGED_USER_ACTIONS.deleteUser, async (params: { id: string} ,thunkAPI) => {
    try {

        console.log("params", params)
        const {id} = params
        const resp = await usersService.deleteUser(id)
        console.log(resp)

    } catch(e) {
        console.log('changeUsernamePassword request failed')
        throw e;
    }
});


export const loggedUserActions = {
    findLoggedUser,
    changeUsernameUser,
    changeUsernamePassword,
    addUserToMatch,
    deleteUser,
    resetUserAttributes
}
