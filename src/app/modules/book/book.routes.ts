import express from "express";
import { BookController } from "./book.controller";
const router = express.Router();

// Routes
router.get("/", BookController.getBooks);
router.post("/", BookController.createBook);
router.post("/comment/:id", BookController.addComment);
router.patch("/:id", BookController.editBook);
router.delete("/:id", BookController.deleteBook);

export const BookRoutes = router;
