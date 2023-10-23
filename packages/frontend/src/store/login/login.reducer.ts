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
                refreshToken: action.payload.refreshToken,
                expiresAt: action.payload.expiresAt,
                id: action.payload.id
            }
        });
        builder.addCase(loginActions.userLogin.rejected, (state, action): UserLoginState => {
            console.log("action", action)
            let message: string = "";
            try{
                message = action.payload as string
            }catch(e) {
                message = "Unexpected error"
            }

            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMessage: message
            }
        });
        builder.addCase(loginActions.userTokenRefresh.fulfilled, (state, action): UserLoginState => {
            return {
                ...state,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
                expiresAt: action.payload.expiresAt
            }
        });
        builder.addCase(loginActions.userLogout.fulfilled, (state): UserLoginState => {
            return {
                ...state,
                accessToken: undefined,
                refreshToken: undefined
            }
        });
        builder.addCase(loginActions.setStoredInfo.fulfilled, (state, action): UserLoginState => {
            if(action.payload) {
                return {
                    ...state,
                    ...action.payload
                }
            }
        });

    })
}
