import {getDefaultMiddleware, configureStore} from '@reduxjs/toolkit'
const middleware = [
    ...getDefaultMiddleware(),
];
const store = configureStore({
    reducer: {},
    middleware
});

export default store;
