import React, {useEffect, useMemo, useState} from "react";
import {moviesDataGetAll} from "../db/moviesDataGetAll";
import SingleMovie from "../Components/SingleMovie";
import {Filter} from "../Components/Filter";

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

    const getFilteredList = () => {
        if(!selectedCategory) {
            return movies;
        }
        return movies.filter((item) => item.category === selectedCategory);
    }
    const filteredList = useMemo(getFilteredList, [selectedCategory, movies]);

    return (
        <div>
            <Filter category={selectedCategory} categories={movies} filter={handleCategoryChange}/>
            <h1>Moja lista filmów</h1>
            {filteredList.map(movie => (
               <SingleMovie
                   key={movie.id}
                   id={movie.id}
                   title={movie.title}
                   category={movie.category}
                   img={movie.img}
                   short_desc={movie.short_desc}/>
            ))}
        </div>
    );
}

export default Movies;