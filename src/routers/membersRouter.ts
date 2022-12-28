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
import { callDibs } from "../db/inserts/callDibs";
import { getDibs } from "../db/queries/getDibs";
import { getBorrows } from "../db/queries/getBorrows";
import { getEnrollments } from "../db/queries/getEnrollments";
import { getAvailableWorkshops } from "../db/queries/getAvailableWorkshops";
import { getEvents } from "../db/queries/getEvents";
import { addReview } from "../db/inserts/addReview";
import { currSocket } from "../index"
import { getReviews } from "../db/queries/getReview";

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


membersRouter.get("/mydibs", auth, async (req: AuthRequest, res) => {
    try {
        const dibs = await getDibs(req.member?.uuid as string);
        
        res.status(200).json({ dibs });
    }
    catch (err) {
        console.log(err);
        res.status(400).send();
    }
})

membersRouter.get("/myborrows", auth, async (req: AuthRequest, res) => {
    try {
        const borrows = await getBorrows(req.member?.uuid as string);
        
        res.status(200).json({ borrows });
    }
    catch (err) {
        console.log(err);
        res.status(400).send();
    }
})

membersRouter.get("/myenrollments", auth, async (req: AuthRequest, res) => {
    try {
        const enrollments = await getEnrollments(req.member?.uuid as string);
        
        res.status(200).json({ enrollments });
    }
    catch (err) {
        console.log(err);
        res.status(400).send();
    }
})

membersRouter.get("/workshops", auth, async (req: AuthRequest, res) => {
    try {
        const availableWorkshops = await getAvailableWorkshops();
        
        res.status(200).json({ availableWorkshops });
    }
    catch (err) {
        console.log(err);
        res.status(400).send();
    }
})

membersRouter.get("/events", auth, async (req: AuthRequest, res) => {
    const { attended } = req.query;
    try {
        const events = attended ? await getEvents(req.member?.uuid) : await getEvents();
        
        res.status(200).json({ events });
    }
    catch (err) {
        console.log(err);
        res.status(400).send();
    }
})

membersRouter.get("/reviews/book", auth, async (req: AuthRequest, res) => {
    const { isbn } = req.query;

    try {
        const reviews = await getReviews(req.member?.uuid as string, isbn as string, "Books");

        res.status(200).json({ reviews });
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ err });
    }




})
membersRouter.get("/reviews/author", auth, async (req: AuthRequest, res) => {
    const { author_id } = req.query;

    try {
        const reviews = await getReviews(req.member?.uuid as string, author_id as string, "Author");

        res.status(200).json({ reviews });
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ err });
    }




})
membersRouter.get("/reviews/instructor", auth, async (req: AuthRequest, res) => {
    const { instructor_id } = req.query;

    try {
        const reviews = await getReviews(req.member?.uuid as string, instructor_id as string, "Instructor");

        res.status(200).json({ reviews });
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ err });
    }




})
membersRouter.get("/reviews/workshop", auth, async (req: AuthRequest, res) => {
    const { workshop_title } = req.query;

    try {
        const reviews = await getReviews(req.member?.uuid as string, workshop_title as string, "Workshop");

        res.status(200).json({ reviews });
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ err });
    }




})

// POST
membersRouter.post("/members/signup", async (req, res) => {

    let { firstname, lastname, email, phone_number } = req.body as ISystemUser;
    
    
    try {
        const checkIfAlreadyExistsSQL = systemUserSearch({ email }) as string
        
        const { rows } = await db.query(checkIfAlreadyExistsSQL);
        
        let uuid = undefined;

        console.log()
        
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
        else 
            uuid = rows[0].uuid;
        
        
        const { username , pass } = req.body as IMember;


        const member = {
            uuid,
            username,
            pass, 
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
        const removeTokenSQL = updateMember({ uuid: req.member?.uuid }, { token: null }) as string;

        await db.query(removeTokenSQL);
        
        res.status(200).send();
    }
    catch (err) {
        res.status(500).send("An error from our side... Please refresh the page");
    }
})


membersRouter.post("/members/delete/account", auth, (req: AuthRequest, res) => {
    
})


membersRouter.post("/calldibs", auth, async(req: AuthRequest, res) => {
    const { isbn } = req.body;

    try {
        console.log("HIII")
        // if (req.member?.warning_count as number >= 5)
        //     throw new Error("You cannot make any reservations until warnings are cleared");
        
        const {verification_code, error} = await callDibs(isbn, req.member as IMember, currSocket)
        
        if (error)
            throw error;
        
        res.status(201).json({ verification_code });
    }
    catch (err: any) {
        res.status(400).json({error: err.message})
    }
})



membersRouter.post("/review/instructor", auth, async (req: AuthRequest, res) => {
    const { instructor_id, comment, rating } = req.body;
    try {
        console.log(rating);
        await addReview(instructor_id as string, "Instructor", req.member?.uuid as string, comment, rating);
        res.status(200).send();
    }
    catch (err) {
        console.log(err);
        res.status(400).send();
    }
})

membersRouter.post("/review/author", auth, async (req: AuthRequest, res) => {
    const { author_id, comment, rating } = req.body;
    try {
        console.log(rating);
        await addReview(author_id as string, "Author", req.member?.uuid as string, comment, rating);
        res.status(200).send();
    }
    catch (err) {
        console.log(err);
        res.status(400).send();
    }
})

membersRouter.post("/review/book", auth, async (req: AuthRequest, res) => {
    const { isbn, comment, rating } = req.body;
    try {
        console.log(rating);
        await addReview(isbn as string, "Books", req.member?.uuid as string, comment, rating);
        res.status(200).send();
    }
    catch (err) {
        console.log(err);
        res.status(400).send();
    }
})

membersRouter.post("/review/workshop", auth, async (req: AuthRequest, res) => {
    const { workshop_title, comment, rating } = req.body;
    try {
        console.log(rating);
        await addReview(workshop_title as string, "Workshop", req.member?.uuid as string, comment, rating);
        res.status(200).send();
    }
    catch (err) {
        console.log(err);
        res.status(400).send();
    }
})



export { membersRouter }