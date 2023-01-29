import {testActions} from './testStore.action';
import {createReducer} from '@reduxjs/toolkit'

const initialState = {
    visible: false
}

export const testReducer = {
    test: createReducer(initialState, (builder) => {
        builder.addCase(testActions.testAction, (state, action) => {
            console.log(action, 'action')
            return {
                ...state,
                visible: action.payload
            }
        });
    })
}
