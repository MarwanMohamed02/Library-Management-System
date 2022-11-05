"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertBooks = void 0;
function insertBooks(book) {
    const { isbn, book_name, genre, book_description, author, quantity = 1, avg_rating = 0, ratings_count = 0 } = book;
    return `INSERT INTO Books(isbn, book_name, genre, book_description, author, avg_rating, quantity, ratings_count)
            VALUES   ("${isbn}","${book_name}","${genre}","${book_description}","${author}",${avg_rating},${quantity}, ${ratings_count});`;
}
exports.insertBooks = insertBooks;
