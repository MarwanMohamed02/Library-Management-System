// import { Router } from "express"
// import { db } from "../db/connect"
// import { getDibs } from "../db/queries/getDibs";


// const adminsRouter = Router();


// // GET
// adminsRouter.get("/reservations", async (req, res) => {
//     const { username, book_name} = req.query;

//     const sql = getDibs(username, book_name);

//     try {
//         const [dibs] = await db.query(sql);
//         res.status(200).json(dibs);
//     }
//     catch (err) {
//         res.status(400).json(err);
//     }

// })












// export { adminsRouter };