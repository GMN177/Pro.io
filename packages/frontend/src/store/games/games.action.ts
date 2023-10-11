import {createAsyncThunk, createAction} from '@reduxjs/toolkit'
import {gameService} from '@/api/game.service';
import { matchServices } from '@/api/match.service';

const enum GAMES_ACTIONS {
    fetchGamesList = 'fetchGamesList/',
    filterGamesByNameAsc = 'filterGamesByNameAsc/'
}
export const fetchGamesList = createAsyncThunk(GAMES_ACTIONS.fetchGamesList, async() => {
    try {
        const resp = (await gameService.getAllGames()).data.data.message

        const matches = (await matchServices.getAllMatches()).data.data.message
        console.log("matches",matches);

        return {
            resp,
            matches
        }
    } catch(e) {
        throw e;
    }
})

export const filterGamesByNameAsc = createAction(GAMES_ACTIONS.filterGamesByNameAsc, (games) => {
    console.log('payload', games)
    return {
        payload: {
            games: games
        }
    }
});

export const gamesActions = {
    fetchGamesList,
    filterGamesByNameAsc
}
