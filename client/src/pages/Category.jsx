import Form from "../Components/Form/Form";
import FormInput from "../Components/FormInput/FormInput";
import React, {useEffect, useRef, useState} from "react";
import {categoryDataPost} from "../db/category/categoriesDataPost";
import {categoriesDataGetAll} from "../db/category/categoriesDataGetAll";
import {categoryDataGetByName} from "../db/category/categoryDataGetByName";
import {Link} from "react-router-dom";
import {categoryDataDelete} from "../db/category/categoryDataDelete";

const Category = () => {
    const [categories, setCategories] = useState([]);
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

    const handleClick = async (e) => {
        e.preventDefault();
        const checkIfCategoryExists = await categoryDataGetByName(categoryRef.current.value)

        const categoryObject = {
            name: categoryRef.current.value
        }
        if(!checkIfCategoryExists) {
            await categoryDataPost(categoryObject);
        }
    };

    return (
        <>
        <Form>
            <div>
                <FormInput type="text"
                           className="form-control"
                           labelText="Nazwa kategorii"
                           forLabel="name"
                           id="name"
                           name="name"
                           ref={categoryRef}
                />
            </div>
            <div className="d-flex flex-wrap gap-3 mt-4">
                <button className="btn btn-success" onClick={handleClick}>Dodaj kategorię</button>
                <button className="btn btn-primary"><Link className="text-white text-decoration-none" to="/add">Dodaj film</Link></button>
                <button className="btn btn-primary"><Link className="text-white text-decoration-none" to="/">Powrót do listy filmów</Link></button>
            </div>
        </Form>
            <div className="mt-5">
                <h2 className="mb-3">Aktywne kategorie:</h2>
                <ul className="list-group m-0 mt-2 p-0 w-25">
                    {categories.map(cat => (
                        <li className="list-group-item d-flex justify-content-between align-items-center" key={cat.id}>
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