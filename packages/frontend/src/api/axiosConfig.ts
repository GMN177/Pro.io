import {AxiosResponse} from 'axios';

export const baseURL = "http://44.212.3.204/api/";

export interface EndpointResponseBaseInterface<T, V> {
    status: string,
    data?: T
    message?: V
}

export type EndpointResponse<T,V> = Promise<AxiosResponse<EndpointResponseBaseInterface<T, V>>>
