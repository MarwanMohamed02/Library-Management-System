import { IBook } from "../interfaces/Book";

export function insertBooks(book: IBook): string {
    const { book_name, genre, book_description, author, quantity = 1, avg_rating = 0, ratings_count = 0 } = book;
   
    return `INSERT INTO Books(book_name, genre, book_description, author, avg_rating, quantity, ratings_count)
            VALUES   ("${book_name}","${genre}","${book_description}","${author}",${avg_rating},${quantity}, ${ratings_count});`;
}