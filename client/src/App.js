import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Movies from "./pages/Movies/Movies";
import SingleMovie from "./pages/SingleMovie/SingleMovie";
import AddMovie from "./pages/AddMovie/AddMovie";
import Category from "./pages/Category/Category";

function App() {
    return (
        <div className="container-lg">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Movies />} />
                    <Route path="/movie" element={<AddMovie/>}/>
                    <Route path="/movie/:id" element={<SingleMovie/>}/>
                    <Route path="/category" element={<Category/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;

