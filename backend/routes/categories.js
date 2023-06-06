import express from "express";
import {addCategory, deleteCategory, getCategories, getCategory} from "../controllers/category.js";


const router = express.Router();

router.get("/categories", getCategories);
router.get("/category/:id", getCategory);
router.post("/categories", addCategory);
router.delete("/category/:id", deleteCategory);


export default router;