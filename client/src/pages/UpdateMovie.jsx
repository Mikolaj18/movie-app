import React, {useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {movieDataPost} from "../db/movieDataPost";
import FormInput from "../Components/FormInput";
import TextareaField from "../Components/TextareaField";
import {movieDataGet} from "../db/movieDataGet";
import {movieDataUpdate} from "../db/movieDataUpdate";

const UpdateMovie = () => {
    const titleRef = useRef();
    const shortDescRef = useRef();
    const longDescRef = useRef();
    const categoryRef = useRef();
    const imgRef = useRef();
    const navigate = useNavigate();

    const {id} = useParams();
    const [movie, setMovie] = useState();


    const handleClick = async (e) => {
        e.preventDefault();
        const movieObject = {
            title: titleRef.current.value,
            short_desc: shortDescRef.current.value,
            long_desc: longDescRef.current.value,
            category: categoryRef.current.value,
            img: imgRef.current.value,
        }
        await movieDataUpdate(id, movieObject)
        navigate("/")
    };

    useEffect(() => {
        const fetchMovie = async () => {
            setMovie(await movieDataGet(id))
        }
        fetchMovie();
    }, [id]);
    if(!movie) {
        return (
            <h1>Ładowanie...</h1>
        )
    }
    return (
        <>
            <div className='form d-flex flex-column gap-3'>
                <h1>Dodaj nowy film</h1>
                <FormInput type="text"
                           className="form-control"
                           labelText="Tytuł"
                           forLabel="title"
                           id="title"
                           name="title"
                           ref={titleRef}
                           defaultValue={movie.title}
                />
                <FormInput type="text"
                           className="form-control"
                           labelText="Zajawka"
                           forLabel="short_desc"
                           id="short_desc"
                           name="short_desc"
                           ref={shortDescRef}
                           defaultValue={movie.short_desc}
                />
                <TextareaField type="text"
                               className="form-control"
                               labelText="Długi tytuł"
                               forLabel="long_desc"
                               id="long_desc"
                               name="long_desc"
                               ref={longDescRef}
                               rows="10"
                               cols="20"
                               defaultValue={movie.long_desc}
                />
                <FormInput type="text"
                           className="form-control"
                           labelText="Kategoria"
                           forLabel="category"
                           id="category"
                           name="category"
                           ref={categoryRef}
                           defaultValue={movie.category}
                />
                <FormInput type="text"
                           className="form-control"
                           labelText="Obraz"
                           forLabel="img"
                           id="img"
                           name="img"
                           ref={imgRef}
                           defaultValue={movie.img}
                />
            </div>
            <button className="btn btn-success mt-4" onClick={handleClick}>Edytuj film</button>
        </>
    );
}

export default UpdateMovie;