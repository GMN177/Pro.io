import axios, {AxiosResponse} from 'axios';
import {baseURL, EndpointResponse, EndpointResponseBaseInterface} from '@/api/axiosConfig';
import {Match} from '@/models/match';

const enum matchEndpoints {
    matches = "matches/",
    matchesByGame = "matches/matchByGame/"
}

const getAllMatches = (): EndpointResponse<any, any> => {
    return axios.get(baseURL + matchEndpoints.matches);
}

const getMatchesByGameId = (gameId: string): EndpointResponse<Array<Match>, any> => {
    return axios.get(baseURL + matchEndpoints.matchesByGame + gameId)
}

export const matchServices = {
    getAllMatches,
    getMatchesByGameId
}
