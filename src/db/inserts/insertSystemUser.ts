import { ISystemUser } from "../interfaces/System_User";



// Inserts System User and returns the uuid
export function insertSystemUser(sysUser: ISystemUser): string {
    const { firstname, lastname, email, phone_number } = sysUser;

    return `INSERT INTO System_Users(firstname,lastname,email,phone_number)
            VALUES  ('${firstname}', '${lastname}', '${email}', ${phone_number}); 
            
            SELECT id::UUID
            FROM System_Users
            WHERE email = '${email}'; `;
}