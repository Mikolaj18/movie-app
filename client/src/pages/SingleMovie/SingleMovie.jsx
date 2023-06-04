import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {movieDataGet} from "../../db/movie/movieDataGet";
import DOMPurify from "dompurify";


const SingleMovie = () => {
    const {id} = useParams();
    const [movie, setMovie] = useState([]);

    const {title, long_desc, category, img} = movie;

    useEffect(() => {
        const getMovie = async () => {
            setMovie(await movieDataGet(id));
        }
        getMovie();
    }, [id]);

    if(!movie) {
        return (
            <h1>Ładowanie...</h1>
        )
    } else {
        return (
            <div className="col-md-10 m-auto">
                <div className="mb-4">
                    <img className="mb-3 mw-400" src={`../upload/${img}`} alt="Picture"/>
                    <div>
                        <h4>{title}</h4>
                        <h5 className="text-muted">{category}</h5>
                        <p
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(long_desc),
                            }}
                        ></p>
                        <div className="d-flex flex-row flex-wrap gap-2">
                            <button type="button" className="btn btn-primary">
                                <Link className="text-white text-decoration-none" to="/">Powrót do listy filmów</Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SingleMovie;