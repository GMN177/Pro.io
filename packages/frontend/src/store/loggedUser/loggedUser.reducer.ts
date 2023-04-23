import {createReducer} from '@reduxjs/toolkit'
import {LoggedUserState} from '@/store/loggedUser/types';
import {loggedUserActions} from '@/store/loggedUser/loggedUser.action';

const initialState: LoggedUserState = {
    isError: false,
    isLoading: false
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
            return {
                ...state,
                loggedUser: action.payload.user,
                isLoading: false,
                isError: false
            }
        });
        builder.addCase(loggedUserActions.findLoggedUser.rejected, (state): LoggedUserState => {
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        });
    })
}
