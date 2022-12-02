import express from "express"
import { db } from "../db/connect"
import { booksSearch } from "../db/queries/bookSearch"
import { insertBooks } from "../db/inserts/insertBooks"
import {IBook, IBookQuery} from "../db/interfaces/Book"
import { updateBookData } from "../db/updates/updateBook"
import { callDibs } from "../db/inserts/callDibs"
import { getMemberDibs } from "../db/joins/getMemberDibs"

const booksRouter = express.Router();



// GET
booksRouter.get("/books", async (req, res) => {
    const bookQuery = req.query as IBookQuery;

    const sql = booksSearch(bookQuery);
    
    try {
        const {rows} = await db.query(sql)
        console.log(rows);
        res.json(rows);
    }
    catch (err) {
        res.json(err);
    }  

})


booksRouter.get("/books/mydibs", async (req, res) => {
    const { uuid, sort = "ASC" } = req.query;

    const sql = getMemberDibs(uuid, sort);
    console.log(sql);

    try {
        const books = await db.query(sql);
        res.status(200).json(books);
    }
    catch (err) {
        res.status(400).json(err);
    }

})




// POST
booksRouter.post("/books", async(req, res) => {
    const bookData = req.body as IBook;

    const sql = insertBooks(bookData);
    
    try {
        const result = await db.query(sql);
    
        res.status(201).json(result);
    }
    catch (err) {
        res.status(400).json(err);
    }

})

booksRouter.post("/books/callDibs", async (req, res) => {
    const { isbn, uuid } = req.body;
    const sql = callDibs(isbn, uuid);

    try {
        await db.query(sql);
        res.status(201).send();
    }
    catch (err) {
        res.status(400).json(err);
    }
})


// PATCH
booksRouter.patch("/books", async (req, res) => {
    const updatedBookData = req.body as IBook;

    const sql = updateBookData(updatedBookData);

    try {
        await db.query(sql);
        res.status(200).send();
    }
    catch (err) {
        res.status(400).json(err);
    }
    
})





export { booksRouter };

