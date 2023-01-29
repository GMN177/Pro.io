import {createAction} from '@reduxjs/toolkit'

export const testAction = createAction('testAction', (payload) => {
    return {payload}
})

export const testActions = {
    testAction
}
