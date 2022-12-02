export enum BookType {
    LIBRARY_BOOK,
    BOOKSTORE_BOOK
}

export interface IBook {
    isbn: string,
    book_name: string,
    genre?: string, 
    book_description?: string,
    author?: string,
    quantity?: number,
    avg_rating?: number,
    ratings_count?: number,
    type: BookType,
    price?: number
}



export interface IBookQuery {
    isbn?: string,
    book_name?: string,
    genre?: string,
    author?: string,
    status?: string,
    sort?: string,
    type?: BookType
}