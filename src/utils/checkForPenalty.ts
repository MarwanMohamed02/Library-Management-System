import { db } from "../db/connect";
import { Penalty_Types } from "../db/interfaces/Notifications";



export async function checkForPenalty(uuid: string, penalty_type: Penalty_Types) {
    const sql = `   SELECT  COUNT(*) 
                    FROM    Penalties
                    WHERE   member_id::UUID = '${uuid}' 
                    AND     penalty_type = '${penalty_type}'
                    AND     paid = 0::BIT; `;
    
    console.log(sql);
    
    const { rows } = await db.query(sql);
    
    const penaltyCount = rows[0].count;
    
    return penaltyCount
}