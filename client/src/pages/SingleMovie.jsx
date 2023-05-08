import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {movieDataGet} from "../db/movieDataGet";


const SingleMovie = () => {
    const {id} = useParams();
    const [movie, setMovie] = useState([]);

    const {title, long_desc, category, img} = movie;

    useEffect(() => {
        const getMovie = async () => {
            setMovie(await movieDataGet(id));
        }
        getMovie();
    }, []);

    return (
        <div>
            <img src={img} alt="picture"/>
            <h1>{title}</h1>
            <h2>{category}</h2>
            <p>{long_desc}</p>
            <button><Link to="/">Powrót do listy filmów</Link></button>
        </div>
    );
}
export default SingleMovie;