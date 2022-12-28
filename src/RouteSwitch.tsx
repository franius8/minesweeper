import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from "./App";
import Info from "./Info";
import Start from "./Start";

const RouteSwitch = () => {
    return (
        <Router>
            <Routes>
                <Route path="/game-beginner" element={<App difficulty={"Beginner"}/>}/>
                <Route path="/game-intermediate" element={<App difficulty={"Intermediate"}/>}/>
                <Route path="/game-expert" element={<App difficulty={"Expert"}/>}/>
                <Route path="/info" element={<Info />}/>
                <Route path="/" element={<Start />}/>
            </Routes>
        </Router>
    )
}

export default RouteSwitch;