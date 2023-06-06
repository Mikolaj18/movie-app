import {db} from "../connect.js";

export const getMovies = (req, res) => {
    const query = "SELECT * FROM movies";
    db.query(query, (err, data) => {
        return err ? res.json(err) : res.json(data);
    });
}

export const getMovie = (req, res) => {
    const movieId = req.params.id;
    const query = "SELECT * FROM movies WHERE id = ?";
    db.query(query, [movieId],(err, data) => {
        return err ? res.json(err) : res.json(data);
    });
}

export const addMovie = (req, res) => {
    const query = "INSERT INTO movies (`title`, `short_desc`, `long_desc`, `category`, `img`) VALUES (?)";
    const values = [
        req.body.title,
        req.body.short_desc,
        req.body.long_desc,
        req.body.category,
        req.body.img,
    ];

    db.query(query, [values], (err, data) => {
        return err ? res.json(err) : res.json("Movie has been created!");
    });
}

export const editMovie = (req, res) => {
    const movieId = req.params.id;
    const query = "UPDATE movies SET `title`= ?, `short_desc`= ?, `long_desc`= ?, `category`= ?, `img`= ? WHERE id = ?";

    const values = [
        req.body.title,
        req.body.short_desc,
        req.body.long_desc,
        req.body.category,
        req.body.img,
    ];

    db.query(query, [...values, movieId], (err, data) => {
        return err ? res.json(err) : res.json("Movie has been updated!");
    });
}

export const deleteMovie = (req, res) => {
    const movieId = req.params.id;
    const query = "DELETE FROM movies WHERE id = ?";
    db.query(query, [movieId], (err, data) => {
        return err ? res.json(err) : res.json("Movie has been deleted!");
    });
}