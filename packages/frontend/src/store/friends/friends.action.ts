import {createAsyncThunk, createAction} from '@reduxjs/toolkit'
import {usersService} from '@/api/users.service';

const enum FRIENDS_ACTIONS {
    fetchFriendsList = 'fetchFriendsList/',
    sendFriendRequest = 'sendFriendRequest/'
}
export const fetchFriendsList = createAsyncThunk(FRIENDS_ACTIONS.fetchFriendsList, async(userId: string) => {
    try {
        const {friends} = (await usersService.findFriends(userId)).data.data
        const {users} = (await usersService.findUsers()).data.data

        return {
            friends,
            users
        }
    } catch(e) {
        throw e;
    }
})
export const sendFriendRequest = createAsyncThunk(FRIENDS_ACTIONS.sendFriendRequest, async(bean: {userId: string, friendId: string}) => {
    try {
        await usersService.addFriend(bean);
        return null
    } catch(e) {
        throw e;
    }
})

export const friendsActions = {
    fetchFriendsList,
    sendFriendRequest
}
