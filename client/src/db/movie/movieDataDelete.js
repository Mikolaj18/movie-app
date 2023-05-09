export const movieDataDelete = async (id) => {
    try {
        await fetch(`http://localhost:8800/movie/${id}`, {
            method: "DELETE"
        });
        window.location.reload();
    } catch (err) {
        console.log(err);
    }
}