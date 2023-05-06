import {loginActions} from './login.action';
import {createReducer} from '@reduxjs/toolkit'
import {UserLoginState} from '@/store/login/types';

const initialState: UserLoginState = {
    isError: false,
    isLoading: false
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
        builder.addCase(loginActions.userLogin.rejected, (state): UserLoginState => {
            return {
                ...state,
                isLoading: false,
                isError: true
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
    })
}
