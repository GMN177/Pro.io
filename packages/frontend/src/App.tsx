import {useState} from "react";
import "./App.css";;
import { useDispatch, useSelector } from "react-redux";
import { testSelectors } from "./store/testStore/testStore.selector";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import { Route, Routes, useNavigate } from "react-router-dom";
import React from "react";
import {LoginPage} from '@/pages/LoginPage';

function App() {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <>
      {isLogged ? (
        <Routes>
          <Route
            path={"/*"}
            element={
              <>
                <div className="App">
                  <Navbar
                    logOut={() => {
                      setIsLogged(false);
                      navigate("/");
                    }}
                    isLogged={true}
                  />
                  <Homepage />
                </div>
              </>
            }
          ></Route>
        </Routes>
      ) : (
        <>
          <Navbar isLogged={false} />
          <Routes>
            <Route path={"/"} element={<>HOMEPAGE PER UTENTE NON LOGGATO</>} />
            <Route
              path={"/login"}
              element={
                <LoginPage onLogin={() => setIsLogged(true)}/>
              }
            />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
