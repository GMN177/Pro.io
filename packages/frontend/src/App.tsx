import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import Homepage from "./pages/HomepagePage/Homepage";
import { Route, Routes, useNavigate } from "react-router-dom";
import { LoginPage } from "./pages/LoginRegisterPage/LoginPage";
import { loginSelectors } from "@/store/login/login.selector";
import { loginActions } from "@/store/login/login.action";
import { useAppDispatch } from "@/store/store.config";
import { RegisterPage } from "./pages/LoginRegisterPage/RegisterPage";
import { GameLibrary } from "./pages/GameLibraryPage/GameLibrary";
import {ProfilePage} from "./pages/ProfilePage";
import {Game} from '@/pages/Game';
import {loggedUserActions} from '@/store/loggedUser/loggedUser.action';
import {FriendsPage} from '@/pages/friendsPage/friendsPage.component';

let tokenAutoRefresh = null;

function App() {
  const dispatch = useAppDispatch();
  const accessToken = useSelector(loginSelectors.getAccessToken);
  const refreshToken = useSelector(loginSelectors.getRefreshToken);
  const userId = useSelector(loginSelectors.getUserId)

  useEffect(() => {
    if(userId) {
      dispatch(loggedUserActions.findLoggedUser(userId))
    }
  }, [userId])

  useEffect(() => {
    if (!accessToken) {
      clearInterval(tokenAutoRefresh);
      tokenAutoRefresh = null;
    }

    if (refreshToken) {
      clearInterval(tokenAutoRefresh)
      tokenAutoRefresh = setInterval(() => {
        dispatch(loginActions.userTokenRefresh({ refreshToken }));
      }, 840000); // 14 minutes refresh for a 15 minutes access token
    }
  }, [accessToken, refreshToken]);

  return (
      <>
        {accessToken ? (
            <Routes>
              <Route
                  path={"/*"}
                  element={
                    <>
                      <div className="App">
                        <Navbar isLogged={true} />
                        <Homepage />
                      </div>
                    </>
                  }
              />
              <Route
                  path={"/games"}
                  element={
                    <>
                      <Navbar isLogged={true} />
                      <GameLibrary />
                    </>
                  }
              />
              <Route
                  path={"/settings"}
                  element={
                    <>
                      <Navbar isLogged={true} />
                      <ProfilePage />
                    </>
                  }
              />
              <Route
                  path={"/friends"}
                  element={
                    <>
                      <Navbar isLogged={true} />
                      <FriendsPage />
                    </>
                  }
              />
              <Route
                  path={"/:game/:matchId"}
                  element={
                    <>
                      <Navbar isLogged={true} />
                      <Game />
                    </>
                  }
              />
              <Route path={"*"} element={<Homepage />} />
            </Routes>

        ) : (
            <>
              <Navbar isLogged={false} />
              <Routes>
                <Route path={"/"} element={<Homepage />} />
                <Route path={"/login"} element={<LoginPage />} />
                <Route path={"/signup"} element={<RegisterPage />} />
                <Route path={"*"} element={<Homepage />} />
              </Routes>
            </>
        )}
      </>
  );
}

export default App;
