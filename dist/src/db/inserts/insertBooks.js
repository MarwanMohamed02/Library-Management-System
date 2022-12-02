"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertBooks = void 0;
const Book_1 = require("../interfaces/Book");
function insertBooks(book) {
    const { isbn, book_name, genre, book_description, author, price, type, quantity = 1, avg_rating = 0, ratings_count = 0 } = book;
    let query = `   INSERT INTO Books (isbn, book_name, genre, book_description, author, avg_rating, ratings_count)
                    VALUES  ('${isbn}','${book_name}','${genre}','${book_description}','${author}',${avg_rating}, ${ratings_count}); `;
    const [qty, refTable] = type == Book_1.BookType.LIBRARY_BOOK ? ["borrow_quantity", "Library_Books"] : ["selling_quantity", "Bookstore_Books"];
    query += `  INSERT INTO ${refTable} (isbn, ${qty}`;
    query += price ? `, price)` : ")";
    query += `\nVALUES  ('${isbn}', ${quantity}`;
    query += price ? `, ${price}); ` : "); ";
    console.log(query);
    return query;
}
exports.insertBooks = insertBooks;
