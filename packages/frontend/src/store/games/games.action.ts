import {createAsyncThunk} from '@reduxjs/toolkit'
import {gameService} from '@/api/game.service';

const enum GAMES_ACTIONS {
    fetchGamesList = 'fetchGamesList/',
}
export const fetchGamesList = createAsyncThunk(GAMES_ACTIONS.fetchGamesList, async() => {
    try {
        const resp = (await gameService.getAllGames()).data.data

        return {
            resp
        }
    } catch(e) {
        console.log('fetchGamesList request failed')
        throw e;
    }
})

export const gamesActions = {
    fetchGamesList
}
