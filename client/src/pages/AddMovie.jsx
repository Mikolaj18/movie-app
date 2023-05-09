import React, {useRef} from "react";
import {useNavigate} from "react-router-dom";
import FormInput from "../Components/FormInput/FormInput";
import {movieDataPost} from "../db/movie/movieDataPost";
import TextareaField from "../Components/TextareaField/TextareaField";
import Form from "../Components/Form/Form";

const AddMovie = () => {
    const titleRef = useRef();
    const shortDescRef = useRef();
    const longDescRef = useRef();
    const categoryRef = useRef();
    const imgRef = useRef();
    const navigate = useNavigate();


    const handleClick = async (e) => {
        e.preventDefault();
        const movieObject = {
            title: titleRef.current.value,
            short_desc: shortDescRef.current.value,
            long_desc: longDescRef.current.value,
            category: categoryRef.current.value,
            img: imgRef.current.value,
        }
        await movieDataPost(movieObject)
        navigate("/")
    };


    return (
        <>
        <div className='form d-flex flex-column gap-3'>
            <h1>Dodaj nowy film</h1>
            <Form>
                <FormInput type="text"
                           className="form-control"
                           labelText="Tytuł"
                           forLabel="title"
                           id="title"
                           name="title"
                           ref={titleRef}
                />
                <FormInput type="text"
                           className="form-control"
                           labelText="Zajawka"
                           forLabel="short_desc"
                           id="short_desc"
                           name="short_desc"
                           ref={shortDescRef}
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
                />
                <FormInput type="text"
                           className="form-control"
                           labelText="Kategoria"
                           forLabel="category"
                           id="category"
                           name="category"
                           ref={categoryRef}
                />
                <FormInput type="text"
                           className="form-control"
                           labelText="Obraz"
                           forLabel="img"
                           id="img"
                           name="img"
                           ref={imgRef}
                />
            </Form>
        </div>
            <button className="btn btn-success mt-4" onClick={handleClick}>Dodaj film</button>
        </>
    )
}

export default AddMovie;