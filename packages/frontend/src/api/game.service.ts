import axios, {AxiosResponse} from 'axios';
import {baseURL, EndpointResponse, EndpointResponseBaseInterface} from '@/api/axiosConfig';
import {Game} from '@/models/game';

const enum gamesEndpoints {
    games = "games/"
}

const getAllGames = (): EndpointResponse<{message:{games:Game[]}}, any> => {
    return axios.get(baseURL + gamesEndpoints.games);
}



export const gameService = {
    getAllGames
}
