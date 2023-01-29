import {getDefaultMiddleware, configureStore} from '@reduxjs/toolkit'
import rootReducer from './reducer.config';
const middleware = [
    ...getDefaultMiddleware(),
];
const store = configureStore({
    reducer: rootReducer,
    middleware
});

export default store;
