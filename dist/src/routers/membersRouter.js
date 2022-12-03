"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.membersRouter = void 0;
const express_1 = __importDefault(require("express"));
const insertMember_1 = require("../db/inserts/insertMember");
const connect_1 = require("../db/connect");
const assignToken_1 = require("../utils/assignToken");
const insertSystemUser_1 = require("../db/inserts/insertSystemUser");
const membersRouter = express_1.default.Router();
exports.membersRouter = membersRouter;
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
membersRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Setting up system user data
    let { firstname, lastname, email, phone_number } = req.body;
    const sysUser = {
        firstname,
        lastname,
        email,
        phone_number
    };
    const sysSQL = (0, insertSystemUser_1.insertSystemUser)(sysUser);
    try {
        // First inserting into System_Users
        const results = yield connect_1.db.query(sysSQL);
        // If all is well, set up member data and insert into Members
        const { id: uuid } = results[1].rows[0]; // extracting uuid from second query
        const { username, password, membership_type } = req.body;
        const member = {
            uuid,
            username,
            password,
            membership_type
        };
        const memSQL = yield (0, insertMember_1.insertMember)(member);
        yield connect_1.db.query(memSQL);
        // After successful insertion a token is assigned to the member
        const token = yield (0, assignToken_1.assignToken)(uuid);
        res.status(201).json({ token });
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
}));
