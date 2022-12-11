import { BookType, IBook } from "../interfaces/Book"

export function updateBookData(updatedBookData: IBook): string {

    const { book_name ,avg_rating, quantity, ratings_count, price, type } = updatedBookData;

    
    
    let sql: string = "";

    if (avg_rating || ratings_count) {
        const updates = [avg_rating, ratings_count];
        const updatesNames = ["avg_rating", "ratings_count"];
        sql += `UPDATE Books \nSET `;
    
    
        for (let i = 0; i < updates.length; i++) {
            if (updates[i]) 
                sql += `${updatesNames[i]} = ${updates[i]}, `;
            
        }
    
    
        sql = sql.substring(0, sql.length - 2);
    
        sql += ` WHERE book_name = '${book_name}'; `;
    }
    
    
    
    if (quantity || price) {

        const [qty, refTable] = type == BookType.LIBRARY_BOOK ? ["borrow_quantity", "Library_Books"] : ["selling_quantity", "Bookstore_Books"];
        
        sql += `\n  UPDATE  ${refTable} \nSET `;
        
        sql += quantity ? ` ${qty} = ${quantity},` : "";
        sql += price ? ` price = ${price},` : "";

        sql = sql.substring(0, sql.length - 1);
        
        sql += `\n  WHERE   isbn = (    SELECT Books.isbn 
                                        FROM Books, ${refTable} 
                                        WHERE ${refTable}.isbn = Books.isbn   AND     book_name = '${book_name}'); `;
    }

    console.log(sql);
    return sql;

}