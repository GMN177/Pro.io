import {AxiosResponse} from 'axios';

export const baseURL = "http://3.95.164.113/";

export interface EndpointResponseBaseInterface<T, V> {
    status: string,
    data?: T
    message?: V
}

export type EndpointResponse<T,V> = Promise<AxiosResponse<EndpointResponseBaseInterface<T, V>>>
