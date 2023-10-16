import {createReducer} from '@reduxjs/toolkit'
import {FriendsState} from '@/store/friends/types';
import {friendsActions} from '@/store/friends/friends.action';

const initialState: FriendsState = {
    isError: false,
    isLoading: false
}

export const friendsReducer = {
    friends: createReducer(initialState, (builder) => {
        builder.addCase(friendsActions.fetchFriendsList.pending, (state): FriendsState => {
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        });
        builder.addCase(friendsActions.fetchFriendsList.fulfilled, (state, action): FriendsState => {
            const {friends, users} = action.payload;
            return {
                ...state,
                friends,
                usersWhoAreNotFriends: users.filter(u => !friends.find(f => u.id === f.id)),
                isLoading: false,
                isError: false
            }
        });
        builder.addCase(friendsActions.fetchFriendsList.rejected, (state): FriendsState => {
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        });
    })
}
