import React, {useContext, useEffect, useMemo, useState} from "react";
import {moviesDataGetAll} from "../../db/movie/moviesDataGetAll";
import SingleMovie from "../../Components/SingleMovie/SingleMovie";
import {Filter} from "../../Components/Filter/Filter";
import {Link, useLocation} from "react-router-dom";
import {movieDataDelete} from "../../db/movie/movieDataDelete";
import {CategoriesContext} from "../../Providers/CategoriesProvider";

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState();
    const { categories } = useContext(CategoriesContext);

    useEffect(() => {
        const getAllMovies = async () => {
            setMovies(await moviesDataGetAll());
        }

        getAllMovies();
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
                <Link className="text-white text-decoration-none" to={`/movie`}>
                    <button type="button" className="btn btn-primary mb-3 mt-3">
                        Dodaj kolejny film
                    </button>
                </Link>
                <Link className="text-white text-decoration-none" to={`/category`}>
                    <button type="button" className="btn btn-primary mb-3 mx-3 mt-3">
                        Dodaj kategorię
                    </button>
                </Link>
            <div className="py-5 mb-5 bg-light">
                <div className="container">
                    <div className="row">
                        {filteredList.map(movie => (
                            <SingleMovie
                                key={movie.id}
                                id={movie.id}
                                title={movie.title}
                                category={movie.category}
                                img={`../upload/${movie.img}`}
                                short_desc={movie.short_desc}
                                state={movie}
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