import {createReducer} from '@reduxjs/toolkit'
import {LoggedUserState} from '@/store/loggedUser/types';
import {loggedUserActions} from '@/store/loggedUser/loggedUser.action';

const initialState: LoggedUserState = {
    isError: false,
    isLoading: false,
    isSuccess: false
}

export const loggedUserReducer = {
    loggedUser: createReducer(initialState, (builder) => {
        builder.addCase(loggedUserActions.findLoggedUser.pending, (state): LoggedUserState => {
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        });
        builder.addCase(loggedUserActions.findLoggedUser.fulfilled, (state, action): LoggedUserState => {
            const loggedUser = action.payload.user;
            console.log('loggedUser', loggedUser)
            return {
                ...state,
                isLoading: false,
                isError: false,
                loggedUser: {
                    ...loggedUser,
                    matchPlayingId: ''
                },

            }
        });
        builder.addCase(loggedUserActions.findLoggedUser.rejected, (state): LoggedUserState => {
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        });
        builder.addCase(loggedUserActions.changeUsernameUser.pending, (state): LoggedUserState => {
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        });
        builder.addCase(loggedUserActions.changeUsernameUser.fulfilled, (state, action): LoggedUserState => {
            return {
                ...state,
                isLoading: false,
                isError: false,
                isSuccess: true,
            }
        });
        builder.addCase(loggedUserActions.changeUsernameUser.rejected, (state, action): LoggedUserState => {
            console.log("action", action)
            return {
                ...state,
                isLoading: false,
                isError: true,

            }
        });
        builder.addCase(loggedUserActions.addUserToMatch, (state, action) => {
            const {matchId} = action.payload;
            return {
                ...state,
                loggedUser: {
                    ...state.loggedUser,
                    matchPlayingId: matchId
                }
            }

        });
    })
}
