import {Fragment, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { Button } from "@chakra-ui/button";
import { Text } from "@chakra-ui/layout";
import { useDispatch, useSelector } from "react-redux";
import { testSelectors } from "./store/testStore/testStore.selector";
import { testActions } from "./store/testStore/testStore.action";
import Navbar from "./components/Navbar";
import { Route, Routes, useNavigate } from "react-router-dom";
import React from 'react';

function App() {
    const visible = useSelector(testSelectors.getVisible);
    const dispatch = useDispatch();
    const [isLogged, setIsLogged] = useState<boolean>(false)
    const navigate = useNavigate();

    return (
        <>
            {
                isLogged ? (
                    <Routes>
                        <Route path={'/*'} element={<>
                            <div className="App">
                                <Navbar logOut={() => {
                                    setIsLogged(false);
                                    navigate('/')
                                }}
                                        isLogged={true} />
                                <Text fontSize="6xl" as="b">
                                    Pro.io
                                </Text>
                                <Text fontSize="2xl" color="blue.theme">
                                    Homepage
                                </Text>
                                <button
                                    onClick={() => {
                                        dispatch(testActions.testAction(!visible));
                                    }}
                                >
                                    Cliccami
                                </button>
                                {visible ? <h1> ciao sono visibile</h1> : null}
                            </div>
                        </>}>
                        </Route>
                    </Routes>
                ) : (
                    <>
                        <Navbar isLogged={false} />
                        <Routes>
                            <Route path={'/'} element={<>
                                HOMEPAGE PER UTENTE NON LOGGATO
                            </>} />
                            <Route path={'/login'} element={<><Button onClick={() => setIsLogged(true)}>LOGGATI</Button>
                            </>} />
                        </Routes>
                    </>
                )
            }
        </>
    );
}

export default App;
