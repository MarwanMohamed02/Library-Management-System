import jwt from "jsonwebtoken"
import { db } from "../db/connect"
import { updateMember } from "../db/updates/updateMember";

export async function assignToken(uuid: string) {

    const token = jwt.sign({ uuid }, process.env.JWT_SECRET as string);

    console.log(token);

    await db.query(updateMember(uuid, { token }));

    return token;
}