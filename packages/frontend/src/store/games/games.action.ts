import {createAsyncThunk} from '@reduxjs/toolkit'
import {gameService} from '@/api/game.service';

const enum GAMES_ACTIONS {
    fetchGamesList = 'fetchGamesList/',
}
export const fetchGamesList = createAsyncThunk(GAMES_ACTIONS.fetchGamesList, async() => {
    try {
        const resp = (await gameService.getAllGames()).data.data.message

        return {
            resp
        }
    } catch(e) {
        throw e;
    }
})

export const gamesActions = {
    fetchGamesList
}
