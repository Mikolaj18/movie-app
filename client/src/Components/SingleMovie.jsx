import {Link} from "react-router-dom";
import React from "react";

const SingleMovie = ({id, img, title, category, short_desc }) => {
    return (
        <div key={id}>
            <img src={img} alt="Image"/>
            <h1>{title}</h1>
            <h2>{category}</h2>
            <p>{short_desc}</p>
            <button><Link to={`movie/${id}`}>Zobacz pełny opis</Link></button>
        </div>
    )
}

export default SingleMovie;