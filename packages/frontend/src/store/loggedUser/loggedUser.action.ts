import {createAsyncThunk} from '@reduxjs/toolkit';
import {User} from '@/models/user';
import {usersService} from '@/api/users.service';

const enum LOGGED_USER_ACTIONS {
    findLoggedUser = 'findLoggedUser/',
    changeUsernameUser = 'changeUsernameUser/',
    changeUsernamePassword = 'changeUsernamePassword/'
}

const findLoggedUser = createAsyncThunk(LOGGED_USER_ACTIONS.findLoggedUser, async (id: string, thunkAPI) => {
    try {
        const user: User = (await usersService.findSingleUser(id)).data.data
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

const changeUsernamePassword = createAsyncThunk(LOGGED_USER_ACTIONS.changeUsernamePassword, async (params: {password: string, newPassword: string, id: string} ,thunkAPI) => {
    try {

        console.log("params", params)
        const {password, newPassword, id} = params
        console.log(await usersService.changeUsernamePassword(password, newPassword,id))

    } catch(e) {
        console.log('changeUsernamePassword request failed')
        throw e;
    }
});


export const loggedUserActions = {
    findLoggedUser,
    changeUsernameUser,
    changeUsernamePassword
}
