import express from "express";
import {addMovie, deleteMovie, editMovie, getMovie, getMovies} from "../controllers/movie.js";


const router = express.Router();

router.get("/movies", getMovies);
router.get("/movie/:id", getMovie);
router.post("/movies", addMovie);
router.put("/movie/:id", editMovie);
router.delete("/movie/:id", deleteMovie);

export default router;