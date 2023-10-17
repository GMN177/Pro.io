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
            const {friends, users, sent, pending} = action.payload;
            return {
                ...state,
                friends,
                pending,
                sent,
                usersWhoAreNotFriends: users.filter(u => !friends.find(f => u._id === f.id) && !sent.find(s => u._id === s.id) && !pending.find(p => u._id === p.id)),
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
