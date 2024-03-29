import axios, {AxiosResponse} from 'axios';
import {baseURL, EndpointResponse, EndpointResponseBaseInterface} from '@/api/axiosConfig';
import {Match} from '@/models/match';

const enum matchEndpoints {
    matches = "matches/",
    matchesByGame = "matches/matchByGame/",
    matchmaking = "matches/matchmaking/",
    createPrivateMatch = "matches/createPrivateMatch/",
    joinPrivateMatch = "matches/joinPrivateMatch"
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


const matchmaking = (payload:{game:string, user: number}): EndpointResponse<any, any> => {
    const {game, user} = payload
    return axios.post(baseURL + matchEndpoints.matchmaking, {
        game,
        user
    })
}

const createPrivateMatch = (payload:{game:string, user: number}): EndpointResponse<string, any> => {
    const {game, user} = payload
    return axios.post(baseURL + matchEndpoints.createPrivateMatch, {
        game,
        user
    })
}

const joinPrivateMatch = (payload:{user: number, matchId: string}): EndpointResponse<string,any> => {
    const {user, matchId} = payload
    return axios.post(baseURL + matchEndpoints.joinPrivateMatch, {
        user,
        matchId
    })
}

export const matchServices = {
    getAllMatches,
    getMatchesByGameId,
    createMatch,
    matchmaking,
    createPrivateMatch,
    joinPrivateMatch
}
