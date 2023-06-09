import {Link} from "react-router-dom";
import React from "react";

const SingleMovie = ({id, img, title, category, short_desc, state, onDelete }) => {
    return (
        <div className="col-md-4">
            <div className="card mb-4 shadow">
                <img className="bd-placeholder-img card-img-top" src={img} alt="Picture"/>
                <div className="card-body">
                    <h4>{title}</h4>
                    <h5 className="text-muted">{category}</h5>
                    <p className="card-text">{short_desc}</p>
                    <div className="d-flex flex-row flex-wrap gap-2">
                        <Link className="text-white text-decoration-none" to={`movie/${id}`}>
                            <button type="button" className="btn btn-primary">
                                Zobacz pełny opis
                            </button>
                        </Link>

                            <Link className="text-white text-decoration-none" to={`/movie?edit=${id}`} state={state}>
                                <button type="button" className="btn btn-success">
                                    Edytuj
                                </button>
                            </Link>
                        <button onClick={onDelete} type="button" className="btn btn-danger">Usuń</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleMovie;