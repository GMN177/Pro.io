import {createAsyncThunk} from '@reduxjs/toolkit';
import {User} from '@/models/user';
import {usersService} from '@/api/users.service';

const enum LOGGED_USER_ACTIONS {
    findLoggedUser = 'findLoggedUser/',
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

export const loggedUserActions = {
    findLoggedUser
}
