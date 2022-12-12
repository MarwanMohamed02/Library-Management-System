"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.memberSearch = void 0;
function memberSearch(memberQuery) {
    const { uuid, firstname, lastname, phone_number, email, username, membership_type, warning_count, follower_count } = memberQuery;
    const attributes = [firstname, lastname, phone_number, email,
        username, membership_type];
    const attNames = ['firstname', 'lastname', 'phone_number', 'email',
        'username', 'membership_type'];
    const sorts = [warning_count, follower_count];
    const sortNames = ["warning_count", "follower_count"];
    let query = `SELECT 
                        Members.id::UUID AS uuid, firstname, lastname, phone_number, email,
                        username, pass, membership_type, warning_count, follower_count, token
                 FROM System_Users, Members
                 WHERE System_Users.id = Members.id `;
    // Special Attributes
    if (uuid)
        query += `AND Members.id::UUID = '${uuid}' `;
    for (let i = 0; i < attributes.length; i++) {
        if (attributes[i]) {
            attributes[i] = attNames[i] !== "phone_number" ? `'${attributes[i]}'` : attributes[i];
            query += `AND ${attNames[i]} = ${attributes[i]} `;
        }
    }
    for (let i = 0; i < sorts.length; i++) {
        if (sorts[i]) {
            query += `ORDER BY ${sortNames[i]} `;
            query += sorts[i] == 1 ? "ASC" : "DESC ";
            break;
        }
    }
    query += ";";
    // console.log(query);
    return query;
}
exports.memberSearch = memberSearch;
