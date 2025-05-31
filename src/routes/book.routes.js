import {Router} from "express";
import {createBook, deleteBook, getBooks, updateBook} from "../controllers/book.controller.js";

const router = Router();

router.route("/book").post(createBook)
router.route("/books").get(getBooks)
router.route("/books/:id").put(updateBook)
router.route("/books/:id").delete(deleteBook)

export  default router;