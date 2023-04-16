import axios from 'axios';
import {baseURL} from '@/api/axiosConfig';

const enum gamesEndpoints {
    games = "games/"
}

const getAllGames = () => {
    return axios.get(baseURL + gamesEndpoints.games);
}

export const gameService = {
    getAllGames
}
