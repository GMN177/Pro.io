export const baseURL = "http://44.201.73.136/api/";

export interface EndpointResponseBaseInterface<T, V> {
    status: string,
    data: {message: T | V}
}
