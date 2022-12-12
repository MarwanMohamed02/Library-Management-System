"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMember = void 0;
// Given uuid, updates new member data that is in "updatedMemberData"
function updateMember(member, updatedMemberData) {
    // console.log(updatedMemberData);
    const { uuid, username } = member;
    // console.log(uuid)
    // console.log(username)
    if (!uuid && !username)
        return;
    // const keys      = [  uuid,    username]
    // const keyNames  = [ "uuid",  "username"]
    let { firstname, lastname, email, phone_number, membership_type, warning_count, follower_count, token } = updatedMemberData;
    const sysUserUpdates = [firstname, lastname, email, phone_number];
    const sysUpdatesNames = ["firstname", "lastname", "email", "phone_number"];
    let sql = "";
    if (firstname || lastname || email || phone_number) {
        sql = "UPDATE System_Users SET ";
        for (let i = 0; i < sysUserUpdates.length; i++) {
            if (sysUserUpdates[i]) {
                sysUserUpdates[i] = sysUpdatesNames[i].includes("phone_number") ? sysUserUpdates[i] : `'${sysUserUpdates[i]}'`;
                sql += `${sysUpdatesNames[i]} = ${sysUserUpdates[i]}, `;
            }
        }
        sql = sql.substring(0, sql.length - 2);
        sql += `WHERE id::UUID = '${uuid}'; `;
        // for (let i = 0; i < keys.length; i++) {
        //     query += ``
        // }
    }
    if (membership_type || warning_count || follower_count || token !== undefined) {
        sql = "UPDATE Members SET";
        token = token ? `'${token}'` : token;
        const updates = [membership_type, warning_count, follower_count, token];
        const updatesNames = ["membership_type", "warning_count", "follower_count", "token"];
        for (let i = 0; i < updates.length; i++) {
            if (updates[i] !== undefined) {
                sql += ` ${updatesNames[i]} = ${updates[i]}, `;
            }
        }
        sql = sql.substring(0, sql.length - 2);
        sql += ` WHERE id::UUID = '${uuid}';`;
    }
    // console.log(sql);
    return sql;
}
exports.updateMember = updateMember;
