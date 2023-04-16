import {User} from '@/models/user';

export interface UserLoginState {
    isLoading: boolean
    isError: boolean
    accessToken?: string
    refreshToken?: string,
    user?: User,
    errorMessage: string,
    isSuccess: boolean
}
