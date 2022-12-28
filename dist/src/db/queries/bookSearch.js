"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksSearch = void 0;
const Book_1 = require("../interfaces/Book");
function booksSearch(bookQuery) {
    const { isbn, book_name, genre, author, status, sort, type } = bookQuery;
    const [qty, refTable] = type == Book_1.BookType.LIBRARY_BOOK ? ["borrow_quantity", "Library_Books"] : ["selling_quantity", "Bookstore_Books"];
    let query = `SELECT 
                        Books.isbn as isbn, 
                        book_name, 
                        genre, 
                        book_description, 
                        ${qty}, 
                        Books.avg_rating    as avg_rating, 
                        Books.reviews_count as reviews_count, 
                        author_id::UUID, 
                        firstname, 
                        lastname `;
    query += type == Book_1.BookType.BOOKSTORE_BOOK ? " ,price " : "";
    query += `  FROM Books 
                JOIN ${refTable}    ON  Books.isbn = ${refTable}.isbn 
                JOIN  System_Users  ON  author_id = System_Users.id
                JOIN  Author        ON  author_id = Author.id `;
    const filters = [isbn, book_name, genre, author];
    const filterNames = ["isbn", "book_name", "genre", "author"];
    for (let i = 0; i < filters.length; i++) {
        if (filters[i])
            query += query.includes("AND") ? `AND Books.${filterNames[i]} = '${filters[i]}' ` : `WHERE Books.${filterNames[i]} = '${filters[i]}' `;
    }
    if (status === "Available")
        query += `AND ${qty} > 0 `;
    if (sort)
        query += `ORDER BY avg_rating ${sort} `;
    query += ";";
    console.log(query);
    return query;
}
exports.booksSearch = booksSearch;
