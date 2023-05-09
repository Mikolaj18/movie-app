import Form from "../Components/Form/Form";
import FormInput from "../Components/FormInput/FormInput";
import React, {useEffect, useRef, useState} from "react";
import {categoryDataPost} from "../db/category/categoriesDataPost";
import {categoriesDataGetAll} from "../db/category/categoriesDataGetAll";
import {categoryDataGetByName} from "../db/category/categoryDataGetByName";

const Category = () => {
    const [categories, setCategories] = useState([]);
    const categoryRef = useRef();

    useEffect(() => {
        const fetchCategories = async () => {
            setCategories(await categoriesDataGetAll());
        }
        fetchCategories();
    }, [categories])

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
            <button className="btn btn-success mt-4" onClick={handleClick}>Dodaj kategorię</button>
        </Form>
            <div>
                {categories.map(cat => (
                    <div key={cat.id}>{cat.name}</div>
                ))}
            </div>
        </>
    );
}

export default Category