import {RootState} from '../reducer.config';
import {User} from '@/models/user';

const getIsError = (state: RootState): boolean => {
    return state.loggedUser.isError;
}

const getIsLoading = (state: RootState): boolean => {
    return state.loggedUser.isLoading;
}

const getIsSuccess = (state: RootState): boolean => {
    return state.loggedUser.isSuccess;
}

const getLoggedUserInfo = (state: RootState): User | undefined => {
    return state.loggedUser.loggedUser
}
export const loggedUserSelectors = {
    getIsLoading,
    getIsError,
    getLoggedUserInfo,
    getIsSuccess
}
