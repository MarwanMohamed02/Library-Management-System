import jwt from "jsonwebtoken"
import { db } from "../db/connect"
import { updateMember } from "../db/updates/updateMember";


/**
 * Assigns a token to member corresponding to the uuid and returns the token for future requests 
 * @param uuid 
 * @returns token after assigning it to the member
 */
export async function assignToken(uuid: string) {

    const token = await genToken(uuid);
    
    const sql = updateMember({ uuid }, { token })

    if (sql)
        await db.query(sql);

    return token;
        
}

/**
 * A promise wrapper for the synchronus jwt.sign function
 * @param uuid payload
 * @returns generated token
 */
function genToken(uuid: string): Promise<string> {
    return new Promise(function (resolve, reject) {
        resolve(jwt.sign({ uuid }, process.env.JWT_SECRET as string));
    })
}

