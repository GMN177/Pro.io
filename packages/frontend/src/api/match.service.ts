import axios, {AxiosResponse} from 'axios';
import {baseURL, EndpointResponse, EndpointResponseBaseInterface} from '@/api/axiosConfig';
import {Match} from '@/models/match';

const enum matchEndpoints {
    matches = "matches/",
    matchesByGame = "matches/matchByGame/",
    matchmaking = "matches/matchmaking/",
}

const getAllMatches = (): EndpointResponse<any, any> => {
    return axios.get(baseURL + matchEndpoints.matches);
}

const getMatchesByGameId = (gameId: string): EndpointResponse<Array<Match>, any> => {
    return axios.get(baseURL + matchEndpoints.matchesByGame + gameId)
}

const createMatch = (payload:{game:string, duration: number, startTime: number, endTime: number, status: string}): EndpointResponse<string, any> => {
    const {game, duration, status, startTime, endTime} = payload
    return axios.post(baseURL + matchEndpoints.matches, {
        game,
        duration,
        startTime,
        endTime,
        status
    })
}


const matchmaking = (payload:{gameId:string, userId: number}): EndpointResponse<any, any> => {
    const {gameId, userId} = payload
    return axios.post(baseURL + matchEndpoints.matchmaking, {
        gameId,
        userId
    })
}

export const matchServices = {
    getAllMatches,
    getMatchesByGameId,
    createMatch,
    matchmaking
}
