import { useEffect} from "react";
import "./App.css";
import {useSelector} from "react-redux";
import Navbar from "./components/Navbar";
import Homepage from "./pages/HomepagePage/Homepage";
import { Route, Routes } from "react-router-dom";
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
import {Leaderboard} from '@/pages/Leaderboard';

let tokenAutoRefresh = null;

function App() {
  const dispatch = useAppDispatch();
  const accessToken = useSelector(loginSelectors.getAccessToken);
  const refreshToken = useSelector(loginSelectors.getRefreshToken);
  const userId = useSelector(loginSelectors.getUserId)
  const expiresAt = useSelector(loginSelectors.getExpiresAt)

  useEffect(() => {
    const storedSessionData = sessionStorage.getItem('PRO_IO_SESSION');
    if(storedSessionData) {
      const parsedData = JSON.parse(storedSessionData)

      if (parsedData.accessToken && parsedData.refreshToken && parsedData.expiresAt && parsedData.id) {
        dispatch(loginActions.setStoredInfo(parsedData))
      }
    }

    return () => {
      if(tokenAutoRefresh) {
        clearInterval(tokenAutoRefresh)
        tokenAutoRefresh = null
      }
    }
  }, [])

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

    if (refreshToken && expiresAt) {
      clearInterval(tokenAutoRefresh)
      tokenAutoRefresh = setTimeout(() => {
        dispatch(loginActions.userTokenRefresh({ refreshToken }));
      }, ((expiresAt - Date.now()) - (60 * 1000))); // 14 minutes refresh for a 15 minutes access token
    }
  }, [accessToken, refreshToken, expiresAt]);

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
              <Route path={'/leaderboard'} element={<><Navbar isLogged={true} /><Leaderboard /></>} />
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
