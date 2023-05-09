export const Filter = ({ category, filter, categories }) => {
    const uniqueCategories = [...new Set(categories.map((cat) => cat.category))];
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
                    {uniqueCategories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
};
