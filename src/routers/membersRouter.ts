import express from "express"
import { insertMember } from "../db/inserts/insertMember";
import { IMember, IMemberQuery } from "../db/interfaces/Member";
import { db } from "../db/connect"
import { memberSearch } from "../db/queries/memberSearch";
import { assignToken } from "../utils/assignToken";
import { ISystemUser } from "../db/interfaces/System_User";
import { insertSystemUser } from "../db/inserts/insertSystemUser";
import { QueryResult } from "pg";
import { login } from "../utils/login";
import { auth, AuthRequest } from "../utils/auth";
import { updateMember } from "../db/updates/updateMember";
import { systemUserSearch } from "../db/queries/systemUserSearch";

const membersRouter = express.Router();



// GET
membersRouter.get("/members", auth, async (req: AuthRequest, res) => {

    const membersData = req.query as IMemberQuery;

    const sql = memberSearch(membersData);

    try {
        const {rows}= await db.query(sql);
        res.status(200).json({ members: rows });    
    }
    catch (err) {
        res.status(400).json(err);
    }

})



// POST
membersRouter.post("/members/signup", async (req, res) => {

    let { firstname, lastname, email, phone_number } = req.body as ISystemUser;
    
    
    try {
        const checkIfAlreadyExistsSQL = systemUserSearch({ email }) as string
        
        const { rows } = await db.query(checkIfAlreadyExistsSQL);
        
        let uuid = undefined;
        
        // If this is the member's first time signing up, insert him/her into the System_User table 
        if (!rows[0]) {
            
            // Setting up system user data
            const sysUser: ISystemUser = {
                firstname,
                lastname,
                email,
                phone_number
            }

            const sysSQL = insertSystemUser(sysUser);
        
            // First inserting into System_Users
            const results = await db.query(sysSQL) as unknown as QueryResult[];
        
            // If all is well, set up member data and insert into Members
            const { uuid: id } = results[1].rows[0];        // extracting uuid from second query
            uuid = id;
        }

        uuid = rows[0].uuid;
        const { username , pass, membership_type } = req.body as IMember;

        const member = {
            uuid,
            username,
            pass,
            membership_type 
        }

        const memSQL = await insertMember(member as IMember);
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


membersRouter.post("/members/login", async (req, res) => {

    // storing data used to login
    const memberData = req.body as IMemberQuery;

    try {

        // Waiting for token | null to determine next action
        const token = await login(memberData);

        console.log(token);
        
        if (token)
            res.status(201).send({ token });                                        // if token was returned send it to client for future requests
        else 
            res.status(400).send({ error: "Username or password is incorrect" })    // in case of null, deny access and display error message
    }
    catch (err) {
        res.status(400).send({ error: "Unauthorized Access!" });
    }
})


membersRouter.post("/members/logout", auth, async (req: AuthRequest, res) => {

    try {
        const removeTokenSQL = updateMember({ uuid: req.member_uuid }, { token: null }) as string;

        await db.query(removeTokenSQL);
        
        res.status(200).send();
    }
    catch (err) {
        res.status(500).send("An error from our side... Please refresh the page");
    }
})


membersRouter.post("/members/delete/account", auth, (req: AuthRequest, res) => {
    
})







export { membersRouter }