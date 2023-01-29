import { useState} from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { Button } from "@chakra-ui/button";
import {useDispatch, useSelector} from 'react-redux'
import {testSelectors} from './store/testStore/testStore.selector';
import {testActions} from './store/testStore/testStore.action';

function App() {
    const [count, setCount] = useState(0);
    const visible = useSelector(testSelectors.getVisible)
    console.log('visible', visible)
    const dispatch = useDispatch()
    return (
        <div className="App">
            <button onClick={() => {
                dispatch(testActions.testAction(!visible))
            }}>Cliccami</button>
            {
                visible ? <h1> ciao sono visibile</h1> : null
            }
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src="/vite.svg" className="logo" alt="Vite logo" />
                </a>
                <a href="https://reactjs.org" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <Button
                    onClick={() => setCount((count) => count + 1)}
                    color="yellow.300"
                >
                    count is {count}
                </Button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </div>
    );
}

export default App;
