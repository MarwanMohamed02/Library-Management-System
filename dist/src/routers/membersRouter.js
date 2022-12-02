"use strict";
// import express from "express"
// import { insertMember } from "../db/inserts/insertMember";
// import { IMember, IMemberQuery } from "../db/interfaces/Member";
// import { db } from "../db/connect"
// import { memberSearch } from "../db/queries/memberSearch";
// import { assignToken } from "../utils/assignToken";
// const membersRouter = express.Router();
// // GET
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
// // POST
// membersRouter.post("/signup", async (req, res) => {
//     const member = req.body as IMember;
//     const sql = await insertMember(member);
//     try {
//         await db.query(sql);
//         await assignToken(member);
//         res.status(201).send();
//     }
//     catch (err) {
//         console.log(err);
//         res.status(400).json(err);
//     }
// })
// export { membersRouter }
