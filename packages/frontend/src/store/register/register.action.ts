import {createAsyncThunk} from '@reduxjs/toolkit';
import {mocks} from '@/mocks';
import axios from 'axios';
import {loginActions} from '@/store/login/login.action';
import {NavigateFunction} from 'react-router-dom';
import {authenticationService} from '@/api/authentication.service';


const enum REGISTER_ACTIONS {
    signUp = 'signUp/'
}

const signUp = createAsyncThunk(REGISTER_ACTIONS.signUp, async (bean:{username:string, email: string, password:string, navigate: NavigateFunction}, thunkAPI) => {
    try {
        const {username, email, password, navigate} = bean
        const resp = await authenticationService.signUp(username, email, password)
        console.log("resp signUp", resp)
        thunkAPI.dispatch(loginActions.userLogin({username, password, navigate}))
        return ;
    } catch(e) {
       // retrieve error message from exception
       console.log('reject')
       if(e.message) {
              return thunkAPI.rejectWithValue(e.message);
         }
       return thunkAPI.rejectWithValue(e.response.data.message);
        //throw e;
    }
});

export const registerActions = {
    signUp
}
