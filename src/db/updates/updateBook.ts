import { BookType, IBook, IBookstoreBook, ILibraryBook } from "../interfaces/Book"

export function updateBookData(updatedBookData: any, type: BookType): string {

    let { isbn, avg_rating, reviews_count } = updatedBookData as IBook;
    let quantity , price;
    
    if (type === BookType.LIBRARY_BOOK) {
        const { borrow_quantity } = updatedBookData as ILibraryBook;
        quantity = borrow_quantity
    }
    else {
        const { selling_quantity, price: p } = updatedBookData as IBookstoreBook;
        quantity = selling_quantity;
        price = p;
    }
    
    console.log(quantity);
    
    let sql: string = "";

    if (avg_rating || reviews_count) {
        const updates = [avg_rating, reviews_count];
        const updatesNames = ["avg_rating", "ratings_count"];
        sql += `UPDATE Books \nSET `;
    
    
        for (let i = 0; i < updates.length; i++) {
            if (updates[i]) 
                sql += `${updatesNames[i]} = ${updates[i]}, `;
            
        }
    
    
        sql = sql.substring(0, sql.length - 2);
    
        sql += ` WHERE isbn = '${isbn}'; `;
    }
    
    
    
    if (quantity !== undefined || price) {

        const [qty, refTable] = type == BookType.LIBRARY_BOOK ? ["borrow_quantity", "Library_Books"] : ["selling_quantity", "Bookstore_Books"];
        
        sql += `\n  UPDATE  ${refTable} \nSET `;
        
        sql += quantity !== undefined ? ` ${qty} = ${quantity},` : "";
        sql += price ? ` price = ${price},` : "";

        sql = sql.substring(0, sql.length - 1);
        
        sql += `\n  WHERE   isbn = '${isbn}'; `;
    }

    console.log(sql);
    return sql;

}