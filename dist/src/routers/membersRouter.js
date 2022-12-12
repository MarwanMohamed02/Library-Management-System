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
const memberSearch_1 = require("../db/queries/memberSearch");
const assignToken_1 = require("../utils/assignToken");
const insertSystemUser_1 = require("../db/inserts/insertSystemUser");
const login_1 = require("../utils/login");
const auth_1 = require("../utils/auth");
const updateMember_1 = require("../db/updates/updateMember");
const systemUserSearch_1 = require("../db/queries/systemUserSearch");
const membersRouter = express_1.default.Router();
exports.membersRouter = membersRouter;
// GET
membersRouter.get("/members", auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const membersData = req.query;
    const sql = (0, memberSearch_1.memberSearch)(membersData);
    try {
        const { rows } = yield connect_1.db.query(sql);
        res.status(200).json({ members: rows });
    }
    catch (err) {
        res.status(400).json(err);
    }
}));
// POST
membersRouter.post("/members/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { firstname, lastname, email, phone_number } = req.body;
    try {
        const checkIfAlreadyExistsSQL = (0, systemUserSearch_1.systemUserSearch)({ email });
        const { rows } = yield connect_1.db.query(checkIfAlreadyExistsSQL);
        let uuid = undefined;
        // If this is the member's first time signing up, insert him/her into the System_User table 
        if (!rows[0]) {
            // Setting up system user data
            const sysUser = {
                firstname,
                lastname,
                email,
                phone_number
            };
            const sysSQL = (0, insertSystemUser_1.insertSystemUser)(sysUser);
            // First inserting into System_Users
            const results = yield connect_1.db.query(sysSQL);
            // If all is well, set up member data and insert into Members
            const { uuid: id } = results[1].rows[0]; // extracting uuid from second query
            uuid = id;
        }
        uuid = rows[0].uuid;
        const { username, pass, membership_type } = req.body;
        const member = {
            uuid,
            username,
            pass,
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
membersRouter.post("/members/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // storing data used to login
    const memberData = req.body;
    try {
        // Waiting for token | null to determine next action
        const token = yield (0, login_1.login)(memberData);
        console.log(token);
        if (token)
            res.status(201).send({ token }); // if token was returned send it to client for future requests
        else
            res.status(400).send({ error: "Username or password is incorrect" }); // in case of null, deny access and display error message
    }
    catch (err) {
        res.status(400).send({ error: "Unauthorized Access!" });
    }
}));
membersRouter.post("/members/logout", auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const removeTokenSQL = (0, updateMember_1.updateMember)({ uuid: req.member_uuid }, { token: null });
        yield connect_1.db.query(removeTokenSQL);
        res.status(200).send();
    }
    catch (err) {
        res.status(500).send("An error from our side... Please refresh the page");
    }
}));
membersRouter.post("/members/delete/account", auth_1.auth, (req, res) => {
});
