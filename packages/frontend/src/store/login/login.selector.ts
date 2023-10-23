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

const getErrorMessage = (state: RootState) => {
    return state.login.errorMessage;
}

const getIsLoading = (state: RootState) => {
    return state.login.isLoading;
}

const getIsSuccess = (state: RootState) => {
    return state.login.isSuccess;
}

const getExpiresAt = (state: RootState): number | null => {
    return state.login.expiresAt;
}

const getUserId = (state: RootState): string | null => {
    return state.login.id;
}

export const loginSelectors = {
    getAccessToken,
    getRefreshToken,
    getIsError,
    getIsLoading,
    getUserId,
    getExpiresAt,
    getErrorMessage,
    getIsSuccess
}
