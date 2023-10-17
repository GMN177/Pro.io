import {createAsyncThunk, createAction} from '@reduxjs/toolkit'
import {usersService} from '@/api/users.service';

const enum FRIENDS_ACTIONS {
    fetchFriendsList = 'fetchFriendsList/',
    sendFriendRequest = 'sendFriendRequest/',
    acceptOrDeclineFriendRequest= 'acceptOrDeclineFriendRequest/'
}
export const fetchFriendsList = createAsyncThunk(FRIENDS_ACTIONS.fetchFriendsList, async(userId: string) => {
    try {
        const {friends, sent, pending} = (await usersService.findFriends(userId)).data.data
        const {users} = (await usersService.findUsers()).data.data

        return {
            friends,
            users,
            sent,
            pending
        }
    } catch(e) {
        throw e;
    }
})

export const sendFriendRequest = createAsyncThunk(FRIENDS_ACTIONS.sendFriendRequest, async(bean: {userId: string, friendId: string}, thunkAPI) => {
    try {
        await usersService.addFriend(bean);
        thunkAPI.dispatch(fetchFriendsList(bean.userId))
        return null
    } catch(e) {
        throw e;
    }
})

export const acceptOrDeclineFriendRequest = createAsyncThunk(FRIENDS_ACTIONS.acceptOrDeclineFriendRequest, async(bean: {friendId: string, accept: boolean, userId: string}, thunkAPI) => {
    try {
        await usersService.acceptOrDeclineFriendRequest(bean);
        thunkAPI.dispatch(fetchFriendsList(bean.userId))
        return bean
    } catch(e) {
        throw e;
    }
})

export const friendsActions = {
    fetchFriendsList,
    sendFriendRequest,
    acceptOrDeclineFriendRequest
}
