import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken"
import { db } from "../db/connect";
import { IMember } from "../db/interfaces/Member";
import { memberSearch } from "../db/queries/memberSearch";

interface AuthRequest extends Request {
    member_uuid?: string
}

async function auth(req: AuthRequest, res: Response, next: NextFunction) {

    try {

        const token = req.header("Authorization")?.replace("Bearer ", "");

        if (!token)
            throw new Error();

        jwt.verify(token, process.env.JWT_SECRET as string, async (error: VerifyErrors | null, decoded: any) => {

            if (error) {
                throw error;
            }
            
            const { rows } = await db.query(memberSearch({ uuid: decoded.uuid as string, token: token }))

            const member: IMember = rows[0];

            if (!member)
                throw new Error();
            
            req.member_uuid = member.uuid

            next();
        });

    }
    catch (err) {
        res.status(401).send({ error: "Unauthorized Access!" });
    }
}

export { auth, AuthRequest }