import Form from "../../Components/Form/Form";
import FormInput from "../../Components/FormInput/FormInput";
import React, {useEffect, useRef, useState} from "react";
import {categoryDataPost} from "../../db/category/categoriesDataPost";
import {categoriesDataGetAll} from "../../db/category/categoriesDataGetAll";
import {Link} from "react-router-dom";
import {categoryDataDelete} from "../../db/category/categoryDataDelete";

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const categoryRef = useRef();

    useEffect(() => {
        const fetchCategories = async () => {
            setCategories(await categoriesDataGetAll());
        }
        fetchCategories();
    }, [categories])

    const handleDelete = async (id) => {
        await categoryDataDelete(id);
    }

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            const categoryObject = {
                name: categoryRef.current.value,
            }
            categoryDataPost(categoryObject);
        }
    }, [formErrors]);

    const onSubmitForm =  (e) => {
        e.preventDefault();
        setFormErrors(validate());
        setIsSubmit(true);
    };

    const validate =  () => {
        const errors = {};
        const categoryValue = categoryRef.current.value;
        if (!categoryValue.trim()) {
            errors.name = "Nazwa kategorii nie może być pusta!";
        }
        return errors;
    }

    return (
        <>
        <Form onSubmit={onSubmitForm}>
            <div>
                <FormInput type="text"
                           className="form-control"
                           labelText="Nazwa kategorii"
                           forLabel="name"
                           id="name"
                           name="name"
                           ref={categoryRef}
                           formErrors={formErrors.name}
                />
            </div>
            <div className="d-flex flex-wrap gap-3 mt-4">
                <button className="btn btn-success">Dodaj kategorię</button>
                    <Link className="text-white text-decoration-none" to="/movie">
                        <button type="submit" className="btn btn-primary">
                            Dodaj film
                        </button>
                    </Link>
                <Link className="text-white text-decoration-none" to="/">
                    <button className="btn btn-primary">Powrót do listy filmów</button>
                </Link>
            </div>
        </Form>
            <div className="mt-5">
                <h2 className="mb-3">Aktywne kategorie:</h2>
                <ul className="list-group m-0 mt-2 p-0 w-25">
                    {categories.map(cat => (
                        <li role="listitem" className="list-group-item d-flex justify-content-between align-items-center" key={cat.id}>
                            {cat.name}
                            <button onClick={() => handleDelete(cat.id)} className="btn btn-danger">Usuń</button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default Category