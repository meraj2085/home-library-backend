"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("./book.controller");
const router = express_1.default.Router();
// Routes
router.get("/", book_controller_1.BookController.getBooks);
router.post("/", book_controller_1.BookController.createBook);
router.post("/comment/:id", book_controller_1.BookController.addComment);
router.patch("/:id", book_controller_1.BookController.editBook);
router.delete("/:id", book_controller_1.BookController.deleteBook);
exports.BookRoutes = router;
