import { QueryResult } from "pg";
import { db } from "../connect"
import { addPenalty } from "../inserts/addPenalty";
import { createNotification, INotification, IWarnings } from "../interfaces/Notifications";
import { updateMember } from "../updates/updateMember";



export async function getAllLatePickups(uuid: string): Promise<INotification[]> {
    let sql = `   SELECT 
                        book_name, 
                        Books.isbn              as book_isbn, 
                        CALL_DIBS_ON_Timestamp  as reservation_time, 
                        pick_up_before, 
                        verification_code

                    FROM    CALL_DIBS_ON 
                    JOIN    Books  ON  Books.isbn = book_isbn
                    WHERE   pick_up_before < ${Date.now()}
                    AND     turned_to_warning = 0::BIT
                    AND     member_id::UUID = '${uuid}'
                    
                    ORDER BY  reservation_time  DESC;
                    
                    SELECT warning_count
                    FROM   Members
                    WHERE  id::UUID = '${uuid}'; `
    
    const result = await db.query(sql) as unknown as QueryResult[];

    let warnings = result[0].rows as IWarnings[];
    const warning_count: number = parseInt(result[1].rows[0].warning_count);

    if (warnings.length == 0)
        return [];
    
    let notifications: INotification[] = [];
    
    let updateSQL = "";

    console.log(`member warning_count: ${warning_count}`);
    console.log(`additional warnings count: ${warnings.length}`);
    
    if (warning_count + warnings.length >= 5) {
        // add no pickup penalty and the book that resulted in the final warning
        await addPenalty("no pickup", uuid, warnings[0].book_isbn as string, parseInt(warnings[0].reservation_time as string))
        
        // create notification for no-pickup penalty
        const last_warning = warnings.pop() as IWarnings;

        const resrv_time = new Date(last_warning.reservation_time as string)
        last_warning.reservation_time = resrv_time.toLocaleTimeString() + " " + resrv_time.toLocaleDateString();

        const pickup_time = new Date(last_warning.pick_up_before as string)
        last_warning.pick_up_before = pickup_time.toLocaleTimeString() + " " + pickup_time.toLocaleDateString();

        // verification code is no longer valid so it is not included in the notification
        delete last_warning["verification_code"];

        const notificationData = last_warning;
        notifications.push(await createNotification(notificationData, "no pickup penalty"));

        // reset the warnings_count
        updateSQL += updateMember({ uuid }, { warning_count: 0 });
    }
    else {
        updateSQL += updateMember({ uuid }, { warning_count: warning_count + warnings.length });
    
    
        // verification codes that will be used for queries on the CALL_DIBS_ON table
        let verificationCodes = "";

        // convert timestamps to human readable dates
        for (let i = 0; i < warnings.length; i++) {
            const resrv_time = new Date(warnings[i].reservation_time as string)
            warnings[i].reservation_time = resrv_time.toLocaleTimeString() + " " + resrv_time.toLocaleDateString();
        
            const pickup_time = new Date(warnings[i].pick_up_before as string)
            warnings[i].pick_up_before = pickup_time.toLocaleTimeString() + " " + pickup_time.toLocaleDateString();
            
            // save verification codes in the format (vc1,vc2,vc3..)
            verificationCodes += `${warnings[i].verification_code},`

            notifications.push(await createNotification(warnings[i], "no pickup warning"));

        }

        // removing extra comma
        verificationCodes = verificationCodes.substring(0, verificationCodes.length - 1);

        // documenting that warnings related to this reservation have been sent to the member
        updateSQL += `  UPDATE  CALL_DIBS_ON
                    SET     turned_to_warning = 1::BIT
                    WHERE   verification_code IN (${verificationCodes});`
    
    
    }
    await db.query(updateSQL);
    
    return notifications;

}

export async function getAllLateReturns(uuid: string): Promise<INotification[]> {
    
    let sql = `   SELECT 
                        book_name, 
                        Books.isbn              as book_isbn, 
                        borrow_timestamp        as borrow_time, 
                        return_before,
                        staff_id::UUID 

                    FROM    Borrows 
                    JOIN    Books  ON  Books.isbn = book_isbn
                    WHERE   return_before <= ${Date.now()}
                    AND     returned = 0::BIT
                    AND     turned_to_penalty = 0::BIT
                    AND     member_id::UUID = '${uuid}'
                    
                    ORDER BY  borrow_time  DESC; `;
    
    const { rows: lateReturns } = await db.query(sql);
    
    if (lateReturns.length == 0)
        return [];

    let notifications: INotification[] = [];

    let updateSQL = "";

    // save update data
    let updateData: any[] = [];

    console.log("raw:")
    console.log(lateReturns)
    
    lateReturns.forEach((lateReturn) => {
        const { book_isbn,
            staff_id,
            borrow_time } = lateReturn;
            
            updateData.push({
                member_id: uuid,
                book_isbn,
                staff_id,
                borrow_time
            })
            
            delete lateReturn["staff_id"];
        })
        
    console.log("removing staff_id:")
    console.log(lateReturns)
    
    for (let i = 0; i < lateReturns.length; i++) {
        
        // add no pickup penalty and the book that resulted in the final warning
        await addPenalty("late return", uuid, lateReturns[i].book_isbn as string, parseInt(lateReturns[i].borrow_time as string));
        
        const borr_time = new Date(lateReturns[i].borrow_time as string)
        lateReturns[i].borrow_time = borr_time.toLocaleTimeString() + " " + borr_time.toLocaleDateString();
        
        const ret_bef_time = new Date(lateReturns[i].return_before as string)
        lateReturns[i].return_before = ret_bef_time.toLocaleTimeString() + " " + ret_bef_time.toLocaleDateString();
        
        console.log(`before notification:`)
        console.log(lateReturns[i])
        notifications.push(await createNotification(lateReturns[i], "late return penalty"));
        
    }
    
    updateData.forEach(({ member_id, staff_id, book_isbn, borrow_time }) => {

        // documenting that penalties related to these borrows have been sent to the member
        updateSQL += `  UPDATE  Borrows
                        SET     turned_to_penalty = 1::BIT
                        WHERE   member_id::UUID = '${member_id}'
                        AND     staff_id::UUID = '${staff_id}' 
                        AND     book_isbn = '${book_isbn}'
                        AND     borrow_timestamp = ${borrow_time}; `
        
    })

    
    await db.query(updateSQL);

    return notifications;
}
