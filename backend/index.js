import express from "express";
import cors from "cors";
import multer from "multer";
import moviesRoutes from"./routes/movies.js";
import categoriesRoutes from"./routes/categories.js";


const app = express();
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

app.use("/", moviesRoutes);
app.use("/", categoriesRoutes);


app.listen(8800, () => {
    console.log("Connected to backend!");
});

