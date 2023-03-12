import {createReducer} from '@reduxjs/toolkit'
import {registerActions} from './register.action';
import {RegisterState} from '@/store/register/types';

const initialState: RegisterState = {
    isError: false,
    isLoading: false
}

export const registerReducer = {
    register: createReducer(initialState, (builder) => {
        builder.addCase(registerActions.signUp.pending, (state): RegisterState => {
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        });
        builder.addCase(registerActions.signUp.fulfilled, (state): RegisterState => {
            return {
                ...state,
                isLoading: false,
                isError: false
            }
        });
        builder.addCase(registerActions.signUp.rejected, (state): RegisterState => {
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        });
    })
}
