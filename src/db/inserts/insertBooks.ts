export function insertBooks(book_name: string, genre: string, book_description = "", author: string, quantity = 1, avg_rating = 0): string {
    return `INSERT INTO Books(book_name, genre, book_description, author, avg_rating, quantity)
            VALUES   ("${book_name}","${genre}","${book_description}","${author}",${avg_rating},${quantity})`;
}