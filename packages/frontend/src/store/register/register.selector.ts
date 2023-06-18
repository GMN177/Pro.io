import {RootState} from '../reducer.config';
const getIsError = (state: RootState) => {
    return state.register.isError;
}

const getIsLoading = (state: RootState) => {
    return state.register.isLoading;
}

const getErrorMessage = (state: RootState) => {
    return state.register.errorMessage;
}

export const registerSelectors = {
    getIsError,
    getIsLoading,
    getErrorMessage
}
