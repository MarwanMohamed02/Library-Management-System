import express from "express"
import { db } from "../db/connect"
import { booksSearch } from "../db/queries/bookSearch"
import { insertBooks } from "../db/inserts/insertBooks"
import {IBook, IBookQuery} from "../utils/interfaces/Book"

const booksRouter = express.Router();

// GET
booksRouter.get("/books", async (req, res) => {
    const bookQuery = req.query as IBookQuery;

    const sql = booksSearch(bookQuery);
    
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
    const bookData = req.body as IBook;

    const sql = insertBooks(bookData);
    
    try {
        const [result] = await db.query(sql);
    
        res.status(201).json(result);
    }
    catch (err) {
        res.status(400).json(err);
    }

})






export { booksRouter };

