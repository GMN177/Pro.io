import {RootState} from '../reducer.config';

const getIsError = (state: RootState): boolean => {
    return state.games.isError;
}

const getIsLoading = (state: RootState): boolean => {
    return state.games.isLoading;
}

const getGamesList = (state: RootState): any[] => {
    return state.games.games
}
export const gamesSelectors = {
    getIsLoading,
    getIsError,
    getGamesList
}
