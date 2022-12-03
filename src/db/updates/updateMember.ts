import { IMember } from "../interfaces/Member";


// Given uuid, updates new member data that is in "updatedMemberData"
export function updateMember(uuid: string, updatedMemberData: any) {
    console.log(updatedMemberData);
    let sql = "UPDATE Members SET"
    let { membership_type, warning_count, follower_count, token } = updatedMemberData;

    token = token? `'${token}'`: token;
    
    const updates = [membership_type, warning_count, follower_count, token];
    const updatesNames = ['membership_type', "warning_count", "follower_count", "token"];

    for (let i = 0; i < updates.length; i++) {
        if (updates[i]) {
            sql += ` ${updatesNames[i]} = ${updates[i]}, `;
        }
    }
    sql = sql.substring(0, sql.length - 2);

    sql += ` WHERE id::UUID = '${uuid}';`;

    console.log(sql);
    return sql;
}

