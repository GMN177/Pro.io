import {useEffect, useState} from 'react';
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { testSelectors } from "./store/testStore/testStore.selector";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import { Route, Routes, useNavigate } from "react-router-dom";
import React from "react";
import { LoginPage } from "./pages/LoginPage";
import {loginSelectors} from '@/store/login/login.selector';
import {loginActions} from '@/store/login/login.action';
import {useAppDispatch} from '@/store/store.config';
import {RegisterPage} from '@/pages/RegisterPage';
let tokenAutoRefresh = null;

function App() {
  const dispatch = useAppDispatch()
  const accessToken = useSelector(loginSelectors.getAccessToken)
  const refreshToken = useSelector(loginSelectors.getRefreshToken)

  useEffect(() => {
    if(!accessToken) {
      clearInterval(tokenAutoRefresh)
      tokenAutoRefresh = null;
    }

    if(refreshToken) {
      tokenAutoRefresh = setInterval(() => {
        dispatch(loginActions.userTokenRefresh({refreshToken}))
      }, 840000) // 14 minutes refresh for a 15 minutes access token
    }

  }, [accessToken, refreshToken])

  return (
    <>
      {accessToken ? (
        <Routes>
          <Route
            path={"/*"}
            element={
              <>
                <div className="App">
                  <Navbar
                    isLogged={true}
                  />
                  <Homepage />
                </div>
              </>
            }
          />
        </Routes>
      ) : (
        <>
          <Navbar isLogged={false} />
          <Routes>
            <Route path={"/"} element={<>HOMEPAGE PER UTENTE NON LOGGATO</>} />
            <Route
              path={"/login"}
              element={<LoginPage />}
            />
            <Route
              path={"/signUp"}
              element={<RegisterPage />}
            />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
