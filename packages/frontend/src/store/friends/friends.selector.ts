import {RootState} from '../reducer.config';

const getIsError = (state: RootState): boolean => {
    return state.friends.isError;
}

const getIsLoading = (state: RootState): boolean => {
    return state.friends.isLoading;
}

const getFriendsList = (state: RootState): any[] => {
    return state.friends.friends
}

const getUsersWhoAreNotFriends = (state: RootState): any[] => {
    return state.friends.usersWhoAreNotFriends
}
export const friendsSelector = {
    getIsLoading,
    getIsError,
    getFriendsList,
    getUsersWhoAreNotFriends
}
