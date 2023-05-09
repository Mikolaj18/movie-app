import React, {useEffect, useMemo, useState} from "react";
import {moviesDataGetAll} from "../db/movie/moviesDataGetAll";
import SingleMovie from "../Components/SingleMovie/SingleMovie";
import {Filter} from "../Components/Filter/Filter";
import {Link} from "react-router-dom";
import {movieDataDelete} from "../db/movie/movieDataDelete";
import {categoriesDataGetAll} from "../db/category/categoriesDataGetAll";

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState();
    const [categories, setCategories] = useState();



    useEffect(() => {
        const getAllMovies = async () => {
            setMovies(await moviesDataGetAll());
        }

        const getAllCategories = async () => {
            setCategories(await categoriesDataGetAll());
        }
        getAllMovies();
        getAllCategories();
    }, [])

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value)
    }

    const handleDelete = async (id) => {
        await movieDataDelete(id);
    }

    const getFilteredList = () => {
        if(!selectedCategory) {
            return movies;
        }
        return movies.filter((item) => item.category.toLowerCase() === selectedCategory);
    }
    const filteredList = useMemo(getFilteredList, [selectedCategory, movies]);
    if(!movies || !categories) {
        return (
            <h1>Ładowanie...</h1>
        )
    }
    return (
        <div>
            <Filter category={selectedCategory} categories={categories} filter={handleCategoryChange}/>
            <h1 className="text-primary">Moja lista filmów</h1>
            <button type="button" className="btn btn-primary mb-3 mt-3"><Link className="text-white text-decoration-none" to={`/add`}>Dodaj kolejny film</Link></button>
            <button type="button" className="btn btn-primary mb-3 mx-3 mt-3"><Link className="text-white text-decoration-none" to={`/category`}>Dodaj kategorię</Link></button>
            <div className="py-5 mb-5 bg-light">
                <div className="container">
                    <div className="row">
                        {filteredList.map(movie => (
                            <SingleMovie
                                key={movie.id}
                                id={movie.id}
                                title={movie.title}
                                category={movie.category}
                                img={movie.img}
                                short_desc={movie.short_desc}
                                onDelete={() => handleDelete(movie.id)}
                            />
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Movies;