import React, {useEffect, useMemo, useState} from "react";
import {moviesDataGetAll} from "../db/moviesDataGetAll";
import SingleMovie from "../Components/SingleMovie";
import {Filter} from "../Components/Filter";
import {Link} from "react-router-dom";
import {movieDataDelete} from "../db/movieDataDelete";

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState();

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
        return movies.filter((item) => item.category === selectedCategory);
    }
    const filteredList = useMemo(getFilteredList, [selectedCategory, movies]);
    if(!movies) {
        return (
            <h1>Ładowanie...</h1>
        )
    } else {
    return (
        <div>
            <Filter category={selectedCategory} categories={movies} filter={handleCategoryChange}/>
            <h1 className="text-primary">Moja lista filmów</h1>
            <button type="button" className="btn btn-primary mb-3 mt-3"><Link className="text-white text-decoration-none" to={`/add`}>Dodaj kolejny film</Link></button>
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
}

export default Movies;