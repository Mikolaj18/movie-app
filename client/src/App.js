import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Movies from "./pages/Movies";
import SingleMovie from "./pages/SingleMovie";
import AddMovie from "./pages/AddMovie";
import UpdateMovie from "./pages/UpdateMovie";
import Category from "./pages/Category";

function App() {
    return (
        <div className="container-lg">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Movies />} />
                    <Route path="/add" element={<AddMovie/>}/>
                    <Route path="/movie/:id" element={<SingleMovie/>}/>
                    <Route path="/update/:id" element={<UpdateMovie/>}/>
                    <Route path="/category" element={<Category/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;

