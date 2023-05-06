import {getDefaultMiddleware, configureStore} from '@reduxjs/toolkit'
import rootReducer from './reducer.config';
import {useDispatch} from 'react-redux';
const middleware = [
    ...getDefaultMiddleware(),
];
const store = configureStore({
    reducer: rootReducer,
    middleware
});

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();

export default store;
