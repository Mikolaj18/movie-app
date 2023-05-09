export const movieDataUpdate = async (id, movieData) => {
    try {
        const response = await fetch(`http://localhost:8800/movie/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(movieData)
        });

        if (!response.ok) throw new Error("Błąd podczas dodawania książki.");

    } catch (err) {
        console.log(err);
    }
}
