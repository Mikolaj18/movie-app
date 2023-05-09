import SelectField from "../SelectField/SelectField";
import React from "react";

export const Filter = ({ category, filter, categories }) => {

    return (
        <>
            <h2>Wyszukaj wg kategorii</h2>
            <div>
                    <SelectField
                        className="form-select form-select-lg mb-3"
                        name="category-list"
                        id="category-list"
                        onChange={filter}
                        value={category}
                        forLabel="category-list"
                        labelVisible={false}
                    >
                        <option value="">Wszystkie</option>
                        {categories.map((cat) => (
                            <option key={cat.id}>{cat.name.toLowerCase()}</option>
                        ))}
                    </SelectField>
            </div>
        </>
    );
};
