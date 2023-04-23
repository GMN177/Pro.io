import {createReducer} from '@reduxjs/toolkit'
import {gamesActions} from '@/store/games/games.action';
import {GamesState} from '@/store/games/types';

const initialState: GamesState = {
    isError: false,
    isLoading: false
}

export const gamesReducer = {
    games: createReducer(initialState, (builder) => {
        builder.addCase(gamesActions.fetchGamesList.pending, (state): GamesState => {
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        });
        builder.addCase(gamesActions.fetchGamesList.fulfilled, (state, action): GamesState => {
            return {
                ...state,
                games: action.payload.resp,
                isLoading: false,
                isError: false
            }
        });
        builder.addCase(gamesActions.fetchGamesList.rejected, (state): GamesState => {
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        });
    })
}
