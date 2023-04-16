import {loginActions} from './login.action';
import {createReducer} from '@reduxjs/toolkit'
import {UserLoginState} from '@/store/login/types';

const initialState: UserLoginState = {
    isError: false,
    isLoading: false,
    errorMessage: '',
    isSuccess: false
}

export const loginReducer = {
    login: createReducer(initialState, (builder) => {
        builder.addCase(loginActions.userLogin.pending, (state): UserLoginState => {
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        });
        builder.addCase(loginActions.userLogin.fulfilled, (state, action): UserLoginState => {
            return {
                ...state,
                isLoading: false,
                isError: false,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken
            }
        });
        builder.addCase(loginActions.userLogin.rejected, (state, action): UserLoginState => {
            console.log("action", action)
            return {
                ...state,
                isLoading: false,
                isError: true,
             
            }
        });
        builder.addCase(loginActions.userTokenRefresh.fulfilled, (state, action): UserLoginState => {
            return {
                ...state,
                accessToken: action.payload.accessToken
            }
        });
        builder.addCase(loginActions.userLogout.fulfilled, (state): UserLoginState => {
            return {
                ...state,
                accessToken: undefined,
                refreshToken: undefined
            }
        });
        builder.addCase(loginActions.findLoggedUser.fulfilled, (state, action): UserLoginState => {
            return {
                ...state,
                user: action.payload.user
            }
        });
        builder.addCase(loginActions.changeUsernameUser.pending, (state): UserLoginState => {
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        });
        builder.addCase(loginActions.changeUsernameUser.fulfilled, (state, action): UserLoginState => {
            return {
                ...state,
                isLoading: false,
                isError: false,
                isSuccess: true,
            }
        });
        builder.addCase(loginActions.changeUsernameUser.rejected, (state, action): UserLoginState => {
            console.log("action", action)
            return {
                ...state,
                isLoading: false,
                isError: true,
             
            }
        });
    })
}
