"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.memberSearch = void 0;
function memberSearch(memberQuery) {
    const { uuid, username, membership_type, warning_count, follower_count } = memberQuery;
    const sorts = [warning_count, follower_count];
    const sortNames = ["warning_count", "follower_count"];
    let query = "SELECT uuid,username,email,membership_type,warning_count,follower_count FROM Members ";
    if (uuid)
        query += `WHERE id = UUID_TO_BIN("${uuid}")`;
    if (username)
        query += query.includes("WHERE") ? `AND username = "${username}" ` : `WHERE username = "${username}" `;
    if (membership_type)
        query += query.includes("WHERE") ? `AND membership_type = "${membership_type}" ` : `WHERE membership_type = "${membership_type}" `;
    for (let i = 0; i < sorts.length; i++)
        if (sorts[i])
            query += query.includes("WHERE") ? `AND ${sortNames[i]} > ${sorts[i]} ` : `WHERE ${sortNames[i]} > ${sorts[i]} `;
    for (let i = 0; i < sorts.length; i++) {
        if (sorts[i]) {
            query += query.includes("ORDER BY") ? `AND ${sortNames[i]} ` : `ORDER BY ${sortNames[i]} `;
            if (i === sorts.length - 1)
                query += "DESC";
        }
    }
    query += ";";
    return query;
}
exports.memberSearch = memberSearch;
