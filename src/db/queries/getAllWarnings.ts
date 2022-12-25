import { db } from "../connect"



export async function getAllWarnings(uuid: string) {
    let sql = `   SELECT 
                        book_name, Books.isbn, CALL_DIBS_ON_Timestamp, pick_up_before, verification_code

                    FROM CALL_DIBS_ON 
                    JOIN Books  ON  Books.isbn = book_isbn
                    WHERE   pick_up_before < ${Date.now()};`
    
    const { rows: warnings } = await db.query(sql);

    return warnings;
}