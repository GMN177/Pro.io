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

const createMatch = (payload:{game:string, duration: number, startTime: number, endTime: number, status: string}): EndpointResponse<Match, any> => {
    const {game, duration, status, startTime, endTime} = payload
    return axios.post(baseURL + matchEndpoints.matches, {
        game,
        duration,
        startTime,
        endTime,
        status
    })
}

export const matchServices = {
    getAllMatches,
    getMatchesByGameId,
    createMatch
}
