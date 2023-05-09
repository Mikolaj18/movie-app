export const categoryDataPost = async (categoryData) => {
    try {
        const response = await fetch(`http://localhost:8800/categories/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(categoryData)
        });

        if (!response.ok) throw new Error("Błąd podczas dodawania kategorii.");

    } catch (err) {
        console.log(err);
    }
}
