import {User} from '@/models/user';

export interface LoggedUserState {
    loggedUser?: User
    isLoading: boolean,
    isError: boolean
}
