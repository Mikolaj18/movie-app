import React, {useContext, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import FormInput from "../Components/FormInput/FormInput";
import {movieDataPost} from "../db/movie/movieDataPost";
import Form from "../Components/Form/Form";
import {CategoriesContext} from "../Providers/CategoriesProvider";
import SelectField from "../Components/SelectField/SelectField";
import ReactQuillField from "../Components/ReactQuillField";

const AddMovie = () => {
    const titleRef = useRef();
    const shortDescRef = useRef();
    const longDescRef = useRef();
    const categoryRef = useRef();
    const imgRef = useRef();
    const navigate = useNavigate();

    const [selectedCategory, setSelectedCategory] = useState();
    const [description, setDescription] = useState();
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
        await movieDataPost(movieObject)
        navigate("/")
    };

    return (
        <>
        <div>
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
                <ReactQuillField
                    value={description}
                    onChange={setDescription}
                    // formErrors={formErrors.description}
                    labelText="Długi tytuł"
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
                />
            </Form>
        </div>
            <button className="btn btn-success mt-4" onClick={handleClick}>Dodaj film</button>
        </>
    )
}

export default AddMovie;