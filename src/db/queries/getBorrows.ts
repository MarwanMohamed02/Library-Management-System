import { db } from "../connect";
import { IBorrow } from "../interfaces/Book";


export async function getBorrows(uuid: string): Promise<IBorrow[]> {
    const sql = `   SELECT username,book_name, borrow_timestamp, return_before
                    FROM (Borrows JOIN  Members ON id = member_id) JOIN Books ON book_isbn = isbn 
                    WHERE   id::UUID = '${uuid}'`

    console.log(sql);

    const { rows } = await db.query(sql);


    let dibs: IBorrow[] = [];

    for (let i = 0; i < rows.length; i++) {
        const borrow_date = (new Date(parseInt(rows[i].borrow_timestamp))).toLocaleDateString();
        const borrow_time = (new Date(parseInt(rows[i].borrow_timestamp))).toLocaleTimeString();

        const return_before_date = (new Date(parseInt(rows[i].return_before))).toLocaleDateString();
        const return_before_time = (new Date(parseInt(rows[i].return_before))).toLocaleTimeString();

        dibs.push({
            username: rows[i].username,
            book_name: rows[i].book_name,
            borrow_date,
            borrow_time,
            return_before_date,
            return_before_time,
        })
    }

    return dibs;

}