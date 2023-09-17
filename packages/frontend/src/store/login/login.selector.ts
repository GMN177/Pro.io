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

const getErrorMessage = (state: RootState) => {
    return state.login.errorMessage;
}

const getIsLoading = (state: RootState) => {
    return state.login.isLoading;
}

const getUser = (state: RootState): User => {
    return state.login.user;
}

const getExpiresAt = (state: RootState): number | null => {
    return state.login.expiresAt;
}

export const loginSelectors = {
    getAccessToken,
    getRefreshToken,
    getIsError,
    getIsLoading,
    getUser,
    getExpiresAt,
    getErrorMessage
}
