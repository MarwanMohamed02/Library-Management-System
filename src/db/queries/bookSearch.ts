import { IBookQuery } from "../interfaces/Book";

export function booksSearch(bookQuery: IBookQuery): string {

    const { isbn, book_name, genre, author, status, sort } = bookQuery;

    let query =
        `SELECT isbn, book_name, genre, book_description, author, quantity, avg_rating FROM Books `;
    
    const filters = [isbn, book_name, genre, author];
    const filterNames = ["isbn" ,"book_name", "genre", "author"]

    for (let i = 0; i < filters.length; i++) {
        if (filters[i]) 
            query += !query.includes("WHERE") ? `WHERE ${filterNames[i]} = "${filters[i]}" ` : `AND ${filterNames[i]} = "${filters[i]}" `;
    }
        
    if (status === "Available")
        query += !query.includes("WHERE") ? `WHERE quantity > 0 ` : `AND quantity > 0 `;
    
    if (sort)
        query += `ORDER BY avg_rating ${sort} `;

    query += ";";
    return query
}