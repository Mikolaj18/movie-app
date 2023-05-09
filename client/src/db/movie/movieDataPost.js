export const movieDataPost = async (movieData) => {
    try {
        const response = await fetch(`http://localhost:8800/movies/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(movieData)
        });

        if (!response.ok) throw new Error("Błąd podczas dodawania filmu.");

    } catch (err) {
        console.log(err);
    }
}
