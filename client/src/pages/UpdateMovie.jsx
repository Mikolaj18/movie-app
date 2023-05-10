import React, {useContext, useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import FormInput from "../Components/FormInput/FormInput";
import TextareaField from "../Components/TextareaField/TextareaField";
import {movieDataGet} from "../db/movie/movieDataGet";
import {movieDataUpdate} from "../db/movie/movieDataUpdate";
import Form from "../Components/Form/Form";
import SelectField from "../Components/SelectField/SelectField";
import {CategoriesContext} from "../Providers/CategoriesProvider";

const UpdateMovie = () => {
    const titleRef = useRef();
    const shortDescRef = useRef();
    const longDescRef = useRef();
    const categoryRef = useRef();
    const imgRef = useRef();
    const navigate = useNavigate();

    const {id} = useParams();
    const [movie, setMovie] = useState();
    const [selectedCategory, setSelectedCategory] = useState();
    const { categories } = useContext(CategoriesContext);

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value)
    }

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
                <Form>
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
                    <SelectField
                        className="form-select form-select-lg mb-3"
                        name="category-list"
                        id="category-list"
                        onChange={handleCategoryChange}
                        value={selectedCategory}
                        ref={categoryRef}
                        labelText="Kategoria"
                        forLabel="category-list"
                    >
                        {categories.map((cat) => (
                            <option key={cat.id}>{cat.name.toLowerCase()}</option>
                        ))}
                    </SelectField>
                    <FormInput type="text"
                               className="form-control"
                               labelText="Obraz"
                               forLabel="img"
                               id="img"
                               name="img"
                               ref={imgRef}
                               defaultValue={movie.img}
                    />
                </Form>
            </div>
            <button className="btn btn-success mt-4" onClick={handleClick}>Edytuj film</button>
        </>
    );
}

export default UpdateMovie;