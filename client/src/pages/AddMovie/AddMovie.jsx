import React, {useContext, useEffect, useRef, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import FormInput from "../../Components/FormInput/FormInput";
import {movieDataPost} from "../../db/movie/movieDataPost";
import Form from "../../Components/Form/Form";
import {CategoriesContext} from "../../Providers/CategoriesProvider";
import SelectField from "../../Components/SelectField/SelectField";
import {movieDataUpdate} from "../../db/movie/movieDataUpdate";
import {fileDataSave} from "../../db/file/fileDataSave";
import TextareaField from "../../Components/TextareaField/TextareaField";
import {categoryDataPost} from "../../db/category/categoriesDataPost";

const AddMovie = () => {
    const state = useLocation().state;
    const navigate = useNavigate();

    const titleRef = useRef();
    const shortDescRef = useRef();
    const longDescRef = useRef();
    const categoryRef = useRef();
    const fileRef = useRef();

    const {categories} = useContext(CategoriesContext);
    const [selectedCategory, setSelectedCategory] = useState();
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    }

    const upload = async () => {
        try {
            const formData = new FormData();
            const file = fileRef.current.files[0];
            formData.append('file', file);
            return await fileDataSave(formData);
        } catch (error) {
            console.log(error);
            return "";
        }
    }

    useEffect(() => {
        const uploadAndProcess = async () => {
            let imgUrl;
            imgUrl = fileRef.current.files[0] ? await upload() : state.img;

            const movieObject = {
                title: titleRef.current.value,
                short_desc: shortDescRef.current.value,
                long_desc: longDescRef.current.value,
                category: categoryRef.current.value,
                img: imgUrl,
            };
            try {
                state ? movieDataUpdate(state.id, movieObject) : movieDataPost(movieObject);
            } catch (e) {
                console.log(e);
            }
            navigate("/");
        };

        if (Object.keys(formErrors).length === 0 && isSubmit) {
            uploadAndProcess();
        }
    }, [formErrors]);


    const onSubmitForm = (e) => {
        e.preventDefault();
        setFormErrors(validate());
        setIsSubmit(true);
    };

    const validate = () => {
        const errors = {};
        const titleValue = titleRef.current.value;
        const shortDescValue = shortDescRef.current.value;
        const longDescValue = longDescRef.current.value;
        const fileValue = fileRef.current.files;
        if (!titleValue.trim()) {
            errors.title = "Nazwa kategorii nie może być pusta!";
        }
        if (!shortDescValue.trim()) {
            errors.short_desc = "Zajawka nie może być pusta!";
        }
        if (!longDescValue.trim()) {
            errors.long_desc = "Opis nie może być pusty!";
        }
        if (fileValue.length === 0 && !state?.img) {
            errors.file = "Plik jest wymagany";
        }
        return errors;
    }


    return (
        <>
            <div>
                <h1>{state ? "Edytuj film" : "Dodaj nowy film"}</h1>
                <Form onSubmit={onSubmitForm}>
                    <FormInput type="text"
                               className="form-control"
                               labelText="Tytuł"
                               forLabel="title"
                               id="title"
                               name="title"
                               ref={titleRef}
                               defaultValue={state?.title || ""}
                               formErrors={formErrors.title}
                    />
                    <FormInput type="text"
                               className="form-control"
                               labelText="Zajawka"
                               forLabel="short_desc"
                               id="short_desc"
                               name="short_desc"
                               ref={shortDescRef}
                               defaultValue={state?.short_desc || ""}
                               formErrors={formErrors.short_desc}
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
                                   defaultValue={state?.long_desc || ""}
                                   formErrors={formErrors.long_desc}
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
                        defaultValue={state?.category || ""}
                    >
                        {categories.map((cat) => (
                            <option key={cat.id}>{cat.name.toLowerCase()}</option>
                        ))}
                    </SelectField>
                    <FormInput type="file"
                               className="form-control"
                               labelText="Obraz"
                               forLabel="img"
                               id="img"
                               name="img"
                               ref={fileRef}
                               formErrors={formErrors.file}
                    />
                    <button type="submit"
                            className="btn btn-success mt-4">{state ? "Edytuj film" : "Dodaj film"}</button>
                </Form>
            </div>
        </>
    )
}

export default AddMovie;