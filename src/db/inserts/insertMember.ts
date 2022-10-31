import { IMember } from "../interfaces/Member"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export async function insertMember(member: IMember): Promise<string> {

    let { username, email, password, membership_type, follower_count = 0, warning_count = 0 } = member;


    // Hashing Password
    password = await bcrypt.hash(password, 12);
      

    return "INSERT INTO Members(id, username, email, pass, membership_type, follower_count, warning_count) "
        + `VALUES (UUID_TO_BIN(uuid(),true), "${username}", "${email}", "${password}", ${membership_type}, ${follower_count}, ${warning_count});`;
    
}