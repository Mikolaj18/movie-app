export const Filter = ({category, filter, categories}) => {
    return (
        <>
            <div>Wyszukaj wg kategorii</div>
            <div>
                <select
                    name="category-list"
                    id="category-list"
                    onChange={filter}
                    value={category}
                >
                    <option value=""></option>
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.category}>{cat.category}</option>
                    ))}
                </select>
            </div>
        </>
    )
}