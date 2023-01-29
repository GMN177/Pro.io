import {RootState} from '../reducer.config';

const getVisible = (state: RootState) => {
    if(state.test) {
        return state.test.visible;
    }
}
export const testSelectors = {
    getVisible
}
