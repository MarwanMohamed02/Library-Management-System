import { db } from "../db/connect";
import { IBookQuery } from "../db/interfaces/Book";
import { BookType } from "../db/interfaces/Book";
import { booksSearch } from "../db/queries/bookSearch";

export async function checkBookAvailability(isbn: string) {
    const bookQuery:IBookQuery = {
        isbn,
        status: "Available",
        type: BookType.LIBRARY_BOOK
    }

    const sql = booksSearch(bookQuery)

    const { rows } = await db.query(sql);

    console.log(rows[0]);

    return rows[0];
}