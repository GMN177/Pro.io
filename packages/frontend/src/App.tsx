import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { Button } from "@chakra-ui/button";
import { Text } from "@chakra-ui/layout";
import { useDispatch, useSelector } from "react-redux";
import { testSelectors } from "./store/testStore/testStore.selector";
import { testActions } from "./store/testStore/testStore.action";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";

function App() {
  const visible = useSelector(testSelectors.getVisible);
  console.log("visible", visible);
  const dispatch = useDispatch();

  return (
    <>
      <Navbar />
      <Homepage />
      <div className="App">
        {/*   <Text fontSize="6xl" as="b">
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
        {visible ? <h1> ciao sono visibile</h1> : null}  */}
      </div>
    </>
  );
}

export default App;
