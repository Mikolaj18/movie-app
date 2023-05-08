import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Movies from "./pages/Movies";
import SingleMovie from "./pages/SingleMovie";

function App() {
    return (
        <div className="app">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Movies />} />
                    <Route path="/movie/:id" element={<SingleMovie/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
