export const baseURL = "http://100.115.181.114:4000/api/";

export interface EndpointResponseBaseInterface<T, V> {
    status: string,
    data?: T
    message?: V
}
