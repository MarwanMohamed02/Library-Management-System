import express from "express"
import { insertMember } from "../db/inserts/insertMember";
import { IMember, IMemberQuery } from "../db/interfaces/Member";
import { db } from "../db/connect"
import { memberSearch } from "../db/queries/memberSearch";
import { assignToken } from "../utils/assignToken";
import { ISystemUser } from "../db/interfaces/System_User";
import { insertSystemUser } from "../db/inserts/insertSystemUser";
import { QueryArrayResult, QueryResult } from "pg";

const membersRouter = express.Router();



// GET
// membersRouter.get("/members", async(req, res) => {
//     const membersData = req.query as IMemberQuery;

//     const sql = memberSearch(membersData);

//     try {
//         const [members] = await db.query(sql);
//         res.status(200).json(members);    
//     }
//     catch (err) {
//         res.status(400).json(err);
//     }

// })



// POST
membersRouter.post("/signup", async (req, res) => {

    // Setting up system user data
    let { firstname, lastname, email, phone_number } = req.body as ISystemUser;

    const sysUser: ISystemUser = {
        firstname,
        lastname,
        email,
        phone_number
    }
    
    const sysSQL = insertSystemUser(sysUser);

    try {

        // First inserting into System_Users
        const results = await db.query(sysSQL) as unknown as QueryResult[];
        
        // If all is well, set up member data and insert into Members
        const { id: uuid } = results[1].rows[0];        // extracting uuid from second query
        const { username , password, membership_type } = req.body as IMember;

        const member: IMember = {
            uuid,
            username,
            password,
            membership_type 
        }

        const memSQL = await insertMember(member);
        await db.query(memSQL);
        
        // After successful insertion a token is assigned to the member
        const token = await assignToken(uuid);

        res.status(201).json({ token });
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
    
})







export { membersRouter }