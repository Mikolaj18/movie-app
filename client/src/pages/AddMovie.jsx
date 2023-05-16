import React, {useContext, useRef, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import FormInput from "../Components/FormInput/FormInput";
import {movieDataPost} from "../db/movie/movieDataPost";
import Form from "../Components/Form/Form";
import {CategoriesContext} from "../Providers/CategoriesProvider";
import SelectField from "../Components/SelectField/SelectField";
import ReactQuillField from "../Components/ReactQuillField";
import {movieDataUpdate} from "../db/movie/movieDataUpdate";

const AddMovie = () => {
    const state = useLocation().state;
    const navigate = useNavigate();

    const titleRef = useRef();
    const shortDescRef = useRef();
    const categoryRef = useRef();
    const imgRef = useRef();

    const { categories } = useContext(CategoriesContext);

    const [selectedCategory, setSelectedCategory] = useState();
    const [description, setDescription] = useState(state?.long_desc || "");

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value)
    }

    const handleClick = async (e) => {
        e.preventDefault();
        const movieObject = {
            title: titleRef.current.value,
            short_desc: shortDescRef.current.value,
            long_desc: description,
            category: categoryRef.current.value,
            img: imgRef.current.value,
        }
        try {
            state ? await movieDataUpdate(state.id, movieObject) : await movieDataPost(movieObject)
        } catch (e) {
            console.log(e);
        }
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
                           defaultValue={state?.title || ""}
                />
                <FormInput type="text"
                           className="form-control"
                           labelText="Zajawka"
                           forLabel="short_desc"
                           id="short_desc"
                           name="short_desc"
                           ref={shortDescRef}
                           defaultValue={state?.short_desc || ""}
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
                           defaultValue={state?.img || ""}
                />
            </Form>
        </div>
            <button className="btn btn-success mt-4" onClick={handleClick}>Dodaj film</button>
        </>
    )
}

export default AddMovie;