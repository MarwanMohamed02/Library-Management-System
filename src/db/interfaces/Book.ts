export interface IBook {
    isbn: string,
    book_name: string,
    genre?: string, 
    book_description?: string,
    author?: string,
    quantity?: number,
    avg_rating?: number,
    ratings_count?: number
}



export interface IBookQuery {
    isbn?: string,
    book_name?: string,
    genre?: string,
    author?: string,
    status?: string,
    sort?: string,
}