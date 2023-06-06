import {db} from "../connect.js";

export const getCategories = (req, res) => {
    const query = "SELECT * FROM categories";
    db.query(query, (err, data) => {
        return err ? res.json(err) : res.json(data);
    });
}

export const getCategory = (req, res) => {
    const categoryName = req.params.id;
    const query = "SELECT * FROM categories WHERE id = ?";
    db.query(query, [categoryName],(err, data) => {
        return err ? res.json(err) : res.json(data);
    });
}

export const addCategory = (req, res) => {
    const query = "INSERT INTO categories (`name`) VALUES (?)";
    const values = [
        req.body.name,
    ];

    db.query(query, [values], (err, data) => {
        return err ? res.json(err) : res.json("Category has been created!");
    });
}

export const deleteCategory = (req, res) => {
    const categoryId = req.params.id;
    const query = "DELETE FROM categories WHERE id = ?";
    db.query(query, [categoryId], (err, data) => {
        return err ? res.json(err) : res.json("Category has been deleted!");
    });
}