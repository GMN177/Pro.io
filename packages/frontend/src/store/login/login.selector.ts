import {RootState} from '../reducer.config';
import {User} from '@/models/user';

const getAccessToken = (state: RootState) => {
    return state.login.accessToken;
}

const getRefreshToken = (state: RootState) => {
    return state.login.refreshToken;
}

const getIsError = (state: RootState) => {
    return state.login.isError;
}

const getIsLoading = (state: RootState) => {
    return state.login.isLoading;
}

const getUser = (state: RootState): User => {
    return state.login.user;
}

export const loginSelectors = {
    getAccessToken,
    getRefreshToken,
    getIsError,
    getIsLoading,
    getUser
}
