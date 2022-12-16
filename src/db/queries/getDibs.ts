import { db } from "../connect";
import { IDibs } from "../interfaces/Book";


export async function getDibs(uuid: string): Promise<IDibs[]> {
    const sql = `   SELECT username,book_name, CALL_DIBS_ON_Timestamp, pick_up_before, verification_code
                    FROM (CALL_DIBS_ON JOIN  Members ON id = member_id) JOIN books ON book_isbn = isbn 
                    WHERE   id::UUID = '${uuid}'`

    console.log(sql);

    const { rows } = await db.query(sql);

    
    let dibs: IDibs[] = [];

    for (let i = 0; i < rows.length; i++) {
        const reservation_date = (new Date(parseInt(rows[i].call_dibs_on_timestamp))).toLocaleDateString();
        const reservation_time = (new Date(parseInt(rows[i].call_dibs_on_timestamp))).toLocaleTimeString();
        
        const pick_up_before_date   = (new Date(parseInt(rows[i].pick_up_before))).toLocaleDateString();
        const pick_up_before_time   = (new Date(parseInt(rows[i].pick_up_before))).toLocaleTimeString();

        dibs.push({
            username: rows[i].username,
            book_name: rows[i].book_name,
            reservation_date,
            reservation_time,
            pick_up_before_date,
            pick_up_before_time,
            verification_code: parseInt(rows[i].verification_code)            
        })
    }

    return dibs;

}