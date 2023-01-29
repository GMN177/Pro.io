import {Action} from 'redux';

export interface AppAction<T = any> extends Action {
    type: string,
    payload?: T,
    error?: boolean,
    meta?: any
}
