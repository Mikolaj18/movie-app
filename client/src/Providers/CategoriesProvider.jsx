import React, { createContext, useState, useEffect } from 'react';
import {categoriesDataGetAll} from "../db/category/categoriesDataGetAll";

export const CategoriesContext = createContext();

export function CategoriesProvider({ children }) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            setCategories(await categoriesDataGetAll());
        }
        fetchCategories();
    }, []);


    return (
        <CategoriesContext.Provider value={{ categories, setCategories }}>
            {children}
        </CategoriesContext.Provider>
    );
}
