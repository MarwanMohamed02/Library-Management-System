import express from "express"
import { db } from "../db/connect"
import { booksSearch } from "../db/queries/bookSearch"
import { insertBooks } from "../db/inserts/insertBooks"

const booksRouter = express.Router();

// GET
booksRouter.get("/books", async (req, res) => {
    const {
        book_name,
        genre,
        author,
        status,
        sort
    } = req.query;

    const sql = booksSearch(book_name, genre, author, status, sort);
    
    try {
        const [books] = await db.query(sql)
        console.log(books);
        res.json(books);
    }
    catch (err) {
        res.json(err);
    }  

})




// POST
booksRouter.post("/books", async(req, res) => {
    const { book_name, genre, book_description, author, quantity, avg_rating } = req.body;

    const sql = insertBooks(book_name, genre, book_description, author, quantity, avg_rating);
    
    try {
        const [result] = await db.query(sql);
    
        res.status(201).json(result);
    }
    catch (err) {
        res.status(400).json(err);
    }

})






export { booksRouter };

