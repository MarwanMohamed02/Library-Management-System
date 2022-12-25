import { NextFunction, Request, Response } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken"
import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";
import { db } from "../db/connect";
import { IMember } from "../db/interfaces/Member";
import { memberSearch } from "../db/queries/memberSearch";

interface AuthRequest extends Request {
    member?: IMember
}


async function auth(req: AuthRequest, res: Response, next: NextFunction) {

    try {

        const token = req.header("Authorization")?.replace("Bearer ", "");

        if (!token)
            throw new Error();

        jwt.verify(token, process.env.JWT_SECRET as string, async (error: VerifyErrors | null, decoded: any) => {

            if (error) {
                next(error);
                return;
            }
            
            const { rows } = await db.query(memberSearch({ uuid: decoded.uuid as string, token: token }))

            const member: IMember = rows[0];

            if (!member) {
                next(new Error());
                return;
            }
            
            req.member = member;

            next();
        });

    }
    catch (err) {
        res.status(401).send({ error: "Unauthorized Access!" });
    }
}

export async function auth_socket(socket: Socket, next: (err?: ExtendedError | undefined) => void) {
    
    const token = socket.handshake.auth.token;

    if (!token)
        socket.data.error = new Error("Authorization Needed");
    
    else {
        // console.log(token);
        // console.log(db);
        try {

            const member = await verify_token(token);
            // console.log(member);

            socket.data.member = member;
        }
        catch (err) {
            console.log(err);
        }
        
            
    }
    next();
}

async function verify_token(token: string): Promise<IMember> {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET as string, async (error: VerifyErrors | null, decoded: any) => {
            if (error) 
                reject(error);
            

            const { rows } = await db.query(memberSearch({ uuid: decoded.uuid as string, token: token }))

            const member: IMember = rows[0];

            // console.log(member);

            if (!member) {
                reject(new Error("User Not Found!"));
            }

            resolve(member);

        });
    })
}
        export { auth, AuthRequest }