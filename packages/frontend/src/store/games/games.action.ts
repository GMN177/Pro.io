import {createAction, createAsyncThunk} from '@reduxjs/toolkit'
import {gameService} from '@/api/game.service';

const enum GAMES_ACTIONS {
    fetchGamesList = 'fetchGamesList/',
}
export const fetchGamesList = createAsyncThunk(GAMES_ACTIONS.fetchGamesList, async() => {

    const resp = await gameService.getAllGames()
})

export const gamesActions = {

}
