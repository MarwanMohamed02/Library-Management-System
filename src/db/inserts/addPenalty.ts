import { QueryResult } from "pg";
import { db } from "../connect";
import { Penalty_Types } from "../interfaces/Notifications";



export async function addPenalty(penalty_type: Penalty_Types, uuid: string, last_reserved_isbn: string, timestamp: number) {
    
    // inserting the penalty and deleting the late reservations 
    let sql = ` INSERT INTO Penalties (member_id, book_isbn, transaction_timestamp, penalty_type)
                VALUES  ('${uuid}'::UUID::BYTES, '${last_reserved_isbn}', ${timestamp}, '${penalty_type}'); `
                
    sql += penalty_type == "no pickup" ?
              ` DELETE FROM CALL_DIBS_ON
                WHERE  member_id::UUID = '${uuid}'
                AND    pick_up_before <= ${Date.now()}
                RETURNING  book_isbn; `
        :    "";
    
    const results = await db.query(sql) as unknown as QueryResult[];

    // updating borrow quantities for the cancelled reservations
    if (penalty_type === "no pickup") {
        const ISBNS = results[1].rows;
        console.log(`restored books isbn: ${ISBNS}`);
        sql = "";
        ISBNS.forEach((isbn) => {
            sql += `UPDATE Library_Books
                SET   borrow_quantity = borrow_quantity + 1
                WHERE isbn = '${isbn.book_isbn}'; `
        })
        await db.query(sql);
    }


    console.log(sql)


}