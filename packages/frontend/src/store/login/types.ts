export interface UserLoginState {
    isLoading: boolean
    isError: boolean
    accessToken?: string
    refreshToken?: string,
    id?: string
}
