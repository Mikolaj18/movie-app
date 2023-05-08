export const moviesDataGetAll = async () => {
    try {
        const res = await fetch('http://localhost:8800/movies/')
        return await res.json();
    } catch (err) {
        console.log(err)
    }
}