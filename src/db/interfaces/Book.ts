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
    avg_rating?: number,
    ratings_count?: number
}


export interface ILibraryBook extends IBook {
    borrow_quantity: number
}

export interface IBookstoreBook extends IBook {
    selling_quantity: number,
    price: number
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