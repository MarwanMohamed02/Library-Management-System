import { db } from "../db/connect";


export async function checkMembershipLimit(uuid: string, membership_type: string) {
    
    const getLimitSQL = `   SELECT  dibs_quantity_limit, dibs_time_limit
                            FROM    Membership_Types
                            WHERE   membership_name = '${membership_type}'; `
    
    console.log(getLimitSQL);
    
    const { rows: membership_types_row } = await db.query(getLimitSQL);

    const membership_limit = parseInt(membership_types_row[0].dibs_quantity_limit);


    const getDibsCountSQL = `   SELECT  COUNT(*)
                                FROM    CALL_DIBS_ON
                                WHERE   member_id::UUID = '${uuid}'; `
                                
    console.log(getDibsCountSQL)
    const { rows: call_dibs_row } = await db.query(getDibsCountSQL);
    
    const currDibsCount = parseInt(call_dibs_row[0].count);

    console.log( "membership limit: " + membership_limit)
    console.log("currDibsCount: " + currDibsCount);

    if (membership_limit <= currDibsCount) 
        return null
    
    console.log("Can call dibs");
    return membership_types_row[0].dibs_time_limit;    
}