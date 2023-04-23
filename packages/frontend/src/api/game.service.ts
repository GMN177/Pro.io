import axios, {AxiosResponse} from 'axios';
import {baseURL, EndpointResponseBaseInterface} from '@/api/axiosConfig';

const enum gamesEndpoints {
    games = "games/"
}

const getAllGames = (): Promise<AxiosResponse<EndpointResponseBaseInterface<any, any>>> => {
    return axios.get(baseURL + gamesEndpoints.games);
}

export const gameService = {
    getAllGames
}
