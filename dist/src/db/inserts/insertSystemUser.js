"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertSystemUser = void 0;
// Inserts System User and returns the uuid
function insertSystemUser(sysUser) {
    const { firstname, lastname, email, phone_number } = sysUser;
    return `INSERT INTO System_Users(firstname,lastname,email,phone_number)
            VALUES  ('${firstname}', '${lastname}', '${email}', ${phone_number}); 
            
            SELECT id::UUID as uuid
            FROM System_Users
            WHERE email = '${email}'; `;
}
exports.insertSystemUser = insertSystemUser;
