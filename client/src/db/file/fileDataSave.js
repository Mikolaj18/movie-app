
export const fileDataSave = async (fileData) => {
    try {
        const response = await fetch('http://localhost:8800/api/upload', {
            method: "POST",
            body: fileData,
        });
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error("Image upload failed");
        }
    } catch (error) {
        console.log(error);
    }
}
