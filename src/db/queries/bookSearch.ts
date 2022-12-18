import { IBookQuery, BookType } from "../interfaces/Book";

export function booksSearch(bookQuery: IBookQuery): string {

    const { isbn, book_name, genre, author, status, sort, type } = bookQuery;

    const [qty, refTable] = type == BookType.LIBRARY_BOOK ? ["borrow_quantity", "Library_Books"] : ["selling_quantity", "Bookstore_Books"];

    let query = `SELECT Books.isbn, book_name, genre, book_description, author, ${qty}, avg_rating, ratings_count ` 
 
    query += type == BookType.BOOKSTORE_BOOK ? " ,price " : "";
    
    query += `FROM Books, ${refTable} WHERE Books.isbn = ${refTable}.isbn `;

    const filters       = [ isbn,  book_name,    genre,   author];
    const filterNames   = ["isbn" ,"book_name", "genre", "author"]

    for (let i = 0; i < filters.length; i++) {
        if (filters[i]) 
            query += `AND Books.${filterNames[i]} = '${filters[i]}' `;
    }
        
    if (status === "Available")
        query += `AND ${qty} > 0 `;
    
    if (sort)
        query += `ORDER BY avg_rating ${sort} `;

    query += ";";
    console.log(query);
    return query
}