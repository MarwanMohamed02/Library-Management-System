import { IMember } from "../interfaces/Member"
import bcrypt from "bcryptjs"


export async function insertMember(member: IMember): Promise<string> {

    let { uuid, username,password, membership_type, follower_count = 0, warning_count = 0 } = member;


    // Hashing Password
    password = await bcrypt.hash(password, 12);
      

    return "INSERT INTO Members(id, username, pass, membership_type, follower_count, warning_count) "
        + ` VALUES ('${uuid}'::UUID::BYTES, '${username}', '${password}', ${membership_type}, ${follower_count}, ${warning_count});`;   
}