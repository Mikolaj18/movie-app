export const categoriesDataGetAll = async () => {
    try {
        const res = await fetch('http://localhost:8800/categories/')
        return await res.json();
    } catch (err) {
        console.log(err)
    }
}