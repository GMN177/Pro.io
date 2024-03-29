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
            const {friends, users, sent, pending, myId} = action.payload;
            return {
                ...state,
                friends,
                pending,
                sent,
                usersWhoAreNotFriends: users.filter(u => !friends.find(f => u._id === f._id) && u._id !== myId && !sent.find(s => u._id === s._id) && !pending.find(p => u._id === p._id)),
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
        builder.addCase(friendsActions.sendFriendRequest.fulfilled, (state, action): FriendsState => {
            return {
                ...state,
                usersWhoAreNotFriends: state.usersWhoAreNotFriends.filter(u => u._id !== action.payload.friendId),
                sent: [...state.sent, {...state.usersWhoAreNotFriends.find(u => u._id === action.payload.friendId)}],
                isLoading: false,
                isError: true
            }
        });
        builder.addCase(friendsActions.acceptOrDeclineFriendRequest.fulfilled, (state, action): FriendsState => {
            if(action.payload.accept) {
              return {
                  ...state,
                  pending: state.pending.filter(p => p._id !== action.payload.friendId),
                  friends: [...state.friends, {...state.pending.find(p => p._id === action.payload.friendId)}]
              }
            } else {
                return {
                    ...state,
                    pending: state.pending.filter(p => p._id !== action.payload.friendId),
                    usersWhoAreNotFriends: [...state.usersWhoAreNotFriends, {...state.pending.find(p => p._id === action.payload.friendId)}]
                }
            }
        });
    })
}
