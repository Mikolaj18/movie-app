export const categoryDataDelete = async (id) => {
    try {
        await fetch(`http://localhost:8800/category/${id}`, {
            method: "DELETE"
        });
    } catch (err) {
        console.log(err);
    }
}