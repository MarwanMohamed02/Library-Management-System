export enum BookType {
    LIBRARY_BOOK,
    BOOKSTORE_BOOK
}

export interface IBook {
    isbn: string,
    book_name: string,
    genre: string,
    book_description: string,
    firstname: string,
    lastname: string,
    author_id: string,
    avg_rating: number,
    reviews_count: number
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



export interface IDibs {
    username: string,
    book_name: string,
    reservation_date: string,
    reservation_time: string,
    pick_up_before_date: string,
    pick_up_before_time: string,
    verification_code: number
}
export interface IBorrow {
    username: string,
    book_name: string,
    borrow_date: string,
    borrow_time: string,
    return_before_date: string,
    return_before_time: string
}