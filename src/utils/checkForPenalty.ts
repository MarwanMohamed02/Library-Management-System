import { db } from "../db/connect";
import { Penalty } from "../db/interfaces/Penalty";



export async function checkForPenalty(uuid: string, penalty: Penalty) {
    const sql = `   SELECT  COUNT(*) 
                    FROM    Penalties
                    WHERE   member_id = '${uuid}' 
                    AND     penalty_type = '${penalty.type}'; `;
    
    console.log(sql);
    
    const { rows } = await db.query(sql);
    
    const penaltyCount = rows[0].count;
    
    return penaltyCount
}