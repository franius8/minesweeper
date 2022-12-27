import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from "./App";
import Info from "./Info";

const RouteSwitch = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<App />}/>
                <Route path="/info" element={<Info />}/>
            </Routes>
        </Router>
    )
}

export default RouteSwitch;