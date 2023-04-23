import {combineReducers} from 'redux'
import {AppAction} from './types';
import {testReducer} from './testStore/testStore.reducer';
import {loginReducer} from '@/store/login/login.reducer';
import {registerReducer} from '@/store/register/register.reducer';
import {gamesReducer} from '@/store/games/games.reducer';
import {loggedUserReducer} from '@/store/loggedUser/loggedUser.reducer';

const appReducer = combineReducers({
    ...testReducer,
    ...loginReducer,
    ...registerReducer,
    ...gamesReducer,
    ...loggedUserReducer
});


export const RESET_STORE = 'RESET_STORE';
export const rootReducer = (state: any, action: any) => {
    if (action.type === RESET_STORE) {
        state = undefined;
    }

    return appReducer(state, action);
};

export const resetStore = (): AppAction => ({
    type: RESET_STORE
});

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;
