import React, {useEffect, useState} from "react";
import {moviesDataGetAll} from "../db/moviesDataGetAll";
import {Link} from "react-router-dom";
import SingleMovie from "../Components/SingleMovie";

const Movies = () => {
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        const getAllMovies = async () => {
            setMovies(await moviesDataGetAll());
        }
        getAllMovies();
    }, [])
    console.log(movies);
    return (
        <div>
            <h1>Moja lista filmów</h1>
            {movies.map(movie => (
               <SingleMovie
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