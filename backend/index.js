import express from "express";
import mysql from "mysql";
import cors from "cors";
import multer from "multer";

const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    port: "3307",
    password: "",
    database: "movies-js",
})

app.use(express.json());
app.use(cors());


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../client/public/upload");
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});


const upload = multer({storage});

app.post('/api/upload', upload.single('file'), (req, res, next) => {
    const file = req.file;
    res.status(200).json(file.filename);
});


app.get("/", (req, res) => {
    res.json("Connected");
});

app.get("/movies", (req, res) => {
    const query = "SELECT * FROM movies";
    db.query(query, (err, data) => {
        return err ? res.json(err) : res.json(data);
    });
});

app.get("/movie/:id", (req, res) => {
    const movieId = req.params.id;
    const query = "SELECT * FROM movies WHERE id = ?";
    db.query(query, [movieId],(err, data) => {
        return err ? res.json(err) : res.json(data);
    });
});

app.post("/movies", (req, res) => {
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
});

app.delete("/movie/:id", (req, res) => {
    const movieId = req.params.id;
    const query = "DELETE FROM movies WHERE id = ?";
    db.query(query, [movieId], (err, data) => {
        return err ? res.json(err) : res.json("Movie has been deleted!");
    });
});

app.put("/movie/:id", (req, res) => {
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
});

app.get("/categories", (req, res) => {
    const query = "SELECT * FROM categories";
    db.query(query, (err, data) => {
        return err ? res.json(err) : res.json(data);
    });
});

app.get("/category/:name", (req, res) => {
    const categoryName = req.params.name;
    const query = "SELECT * FROM categories WHERE name = ?";
    db.query(query, [categoryName],(err, data) => {
        return err ? res.json(err) : res.json(data);
    });
});

app.post("/categories", (req, res) => {
    const query = "INSERT INTO categories (`name`) VALUES (?)";
    const values = [
        req.body.name,
    ];

    db.query(query, [values], (err, data) => {
        return err ? res.json(err) : res.json("Category has been created!");
    });
});

app.delete("/category/:id", (req, res) => {
    const categoryId = req.params.id;
    const query = "DELETE FROM categories WHERE id = ?";
    db.query(query, [categoryId], (err, data) => {
        return err ? res.json(err) : res.json("Category has been deleted!");
    });
});

app.listen(8800, () => {
    console.log("Connected to backend!");
});

