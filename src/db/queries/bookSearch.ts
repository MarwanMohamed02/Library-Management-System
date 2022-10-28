
export function booksSearch(book_name: any, genre: any, author: any, status: any, sort: any): string {
    let query =
        `SELECT book_name, genre, book_description, author, quantity, avg_rating FROM Books `;
    
    const filters = [book_name, genre, author];
    const filterNames = ["book_name", "genre", "author"]

    for (let i = 0; i < filters.length; i++) {
        if (filters[i]) 
            query += !query.includes("WHERE") ? `WHERE ${filterNames[i]} = "${filters[i]}" ` : `AND ${filterNames[i]} = "${filters[i]}" `;
    }
        
    if (status === "Available")
        query += !query.includes("WHERE") ? `WHERE quantity > 0 ` : `AND quantity > 0 `;
    
    if (sort)
        query += `ORDER BY avg_rating ${sort} `;

    return query
}