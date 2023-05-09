export const movieDataGet = async (id) => {
    try {
        const res = await fetch(`http://localhost:8800/movie/${id}`)
        const data = await res.json();
        return data[0];
    } catch (err) {
        console.log(err)
    }
}