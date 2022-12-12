import bcrypt from "bcryptjs"
import { db } from "../db/connect";
import { IMember, IMemberQuery } from "../db/interfaces/Member";
import { memberSearch } from "../db/queries/memberSearch";
import { assignToken } from "./assignToken";


/**
 * Returns token if username & password match and null otherwise
 * @param memberQuery an object containing username & password
 * @returns token | null
 */
export async function login(memberQuery:IMemberQuery): Promise<string | null> {
    const { username, pass } = memberQuery;

    const { rows } = await db.query(memberSearch({ username }));

    let member = rows[0] as IMember

    console.log(member.token)

    if (member.token)
        return null;
    
    const found = await bcrypt.compare(pass as string, member.pass);

    if (found) {
        return await assignToken(member.uuid as string);
    }

    return null;
}