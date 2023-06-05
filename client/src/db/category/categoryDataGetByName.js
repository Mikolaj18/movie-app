export const categoryDataGetByName = async (name) => {
    try {
        if (!name) return;
        const res = await fetch(`http://localhost:8800/category/${name}`);
        const data = await res.json();
        return data[0];
    } catch (err) {
        console.log(err);
    }
};
