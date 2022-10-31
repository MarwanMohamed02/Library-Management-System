export interface IBook {
    book_name: string,
    genre: string, 
    book_description?: string,
    author: string,
    quantity: number,
    avg_rating: number,
}



export interface IBookQuery {
    book_name?: string,
    genre?: string,
    author?: string,
    status?: string,
    sort?: string,
}