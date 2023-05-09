export const Filter = ({ category, filter, categories }) => {

    return (
        <>
            <h2>Wyszukaj wg kategorii</h2>
            <div>
                <select
                    className="form-select form-select-lg mb-3"
                    name="category-list"
                    id="category-list"
                    onChange={filter}
                    value={category}
                >
                    <option value="">Wszystkie</option>
                    {categories.map((cat) => (
                        <option key={cat.id}>{cat.name.toLowerCase()}</option>
                    ))}
                </select>
            </div>
        </>
    );
};
