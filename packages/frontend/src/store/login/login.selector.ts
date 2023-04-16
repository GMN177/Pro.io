import {RootState} from '../reducer.config';

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

const getUserId = (state: RootState) => {
    return state.login.id
}

export const loginSelectors = {
    getAccessToken,
    getRefreshToken,
    getIsError,
    getIsLoading,
    getUserId
}
