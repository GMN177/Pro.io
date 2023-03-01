import {RootState} from '../reducer.config';
const getIsError = (state: RootState) => {
    return state.register.isError;
}

const getIsLoading = (state: RootState) => {
    return state.register.isLoading;
}

export const registerSelectors = {
    getIsError,
    getIsLoading
}
