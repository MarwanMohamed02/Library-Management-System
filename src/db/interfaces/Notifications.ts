import { db } from "../connect"

export type Penalty_Types = "no pickup" | "late return"

type Notification_Types = "confirmation" | "no pickup penalty" | "late return penalty" | "no pickup warning"

export interface IWarnings {
    member_id?: string,
    book_isbn?: string,
    book_name: string
    reservation_time?: string,
    pick_up_before?: string,
    verification_code?: string
}


export interface INotification {
    data: any,
    type: Notification_Types,
    notification_time: string
}

export async function createNotification(data: any, type: Notification_Types): Promise<INotification> {
    const currTime = new Date(Date.now());
    const notification_time =currTime.toLocaleTimeString() + "$" + currTime.toLocaleDateString()
    
    if (!type.includes("penalty"))
        return { data, type, notification_time };
    
    const penalty_type: Penalty_Types = type.replace(" penalty", "") as Penalty_Types;

    const sql = `   SELECT  fee
                    FROM    Penalties
                    JOIN    Penalty_Types   ON      penalty_name = penalty_type
                    WHERE   penalty_type = '${penalty_type}'`;
    
    const { rows } = await db.query(sql);
    const fee = rows[0].fee;

    data = {
        ...data,
        fee
    }
    console.log("notification data")
    console.log(data)
    return {
        data,
        type,
        notification_time
    }
}