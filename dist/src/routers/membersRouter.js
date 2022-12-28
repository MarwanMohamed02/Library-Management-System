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
const callDibs_1 = require("../db/inserts/callDibs");
const getDibs_1 = require("../db/queries/getDibs");
const getBorrows_1 = require("../db/queries/getBorrows");
const getEnrollments_1 = require("../db/queries/getEnrollments");
const getAvailableWorkshops_1 = require("../db/queries/getAvailableWorkshops");
const getEvents_1 = require("../db/queries/getEvents");
const addReview_1 = require("../db/inserts/addReview");
const index_1 = require("../index");
const getReview_1 = require("../db/queries/getReview");
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
membersRouter.get("/mydibs", auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const dibs = yield (0, getDibs_1.getDibs)((_a = req.member) === null || _a === void 0 ? void 0 : _a.uuid);
        res.status(200).json({ dibs });
    }
    catch (err) {
        console.log(err);
        res.status(400).send();
    }
}));
membersRouter.get("/myborrows", auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const borrows = yield (0, getBorrows_1.getBorrows)((_b = req.member) === null || _b === void 0 ? void 0 : _b.uuid);
        res.status(200).json({ borrows });
    }
    catch (err) {
        console.log(err);
        res.status(400).send();
    }
}));
membersRouter.get("/myenrollments", auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const enrollments = yield (0, getEnrollments_1.getEnrollments)((_c = req.member) === null || _c === void 0 ? void 0 : _c.uuid);
        res.status(200).json({ enrollments });
    }
    catch (err) {
        console.log(err);
        res.status(400).send();
    }
}));
membersRouter.get("/workshops", auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const availableWorkshops = yield (0, getAvailableWorkshops_1.getAvailableWorkshops)();
        res.status(200).json({ availableWorkshops });
    }
    catch (err) {
        console.log(err);
        res.status(400).send();
    }
}));
membersRouter.get("/events", auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const { attended } = req.query;
    try {
        const events = attended ? yield (0, getEvents_1.getEvents)((_d = req.member) === null || _d === void 0 ? void 0 : _d.uuid) : yield (0, getEvents_1.getEvents)();
        res.status(200).json({ events });
    }
    catch (err) {
        console.log(err);
        res.status(400).send();
    }
}));
membersRouter.get("/reviews/book", auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    const { isbn } = req.query;
    try {
        const reviews = yield (0, getReview_1.getReviews)((_e = req.member) === null || _e === void 0 ? void 0 : _e.uuid, isbn, "Books");
        res.status(200).json({ reviews });
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ err });
    }
}));
membersRouter.get("/reviews/author", auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    const { author_id } = req.query;
    try {
        const reviews = yield (0, getReview_1.getReviews)((_f = req.member) === null || _f === void 0 ? void 0 : _f.uuid, author_id, "Author");
        res.status(200).json({ reviews });
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ err });
    }
}));
membersRouter.get("/reviews/instructor", auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _g;
    const { instructor_id } = req.query;
    try {
        const reviews = yield (0, getReview_1.getReviews)((_g = req.member) === null || _g === void 0 ? void 0 : _g.uuid, instructor_id, "Instructor");
        res.status(200).json({ reviews });
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ err });
    }
}));
membersRouter.get("/reviews/workshop", auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _h;
    const { workshop_title } = req.query;
    try {
        const reviews = yield (0, getReview_1.getReviews)((_h = req.member) === null || _h === void 0 ? void 0 : _h.uuid, workshop_title, "Workshop");
        res.status(200).json({ reviews });
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ err });
    }
}));
// POST
membersRouter.post("/members/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { firstname, lastname, email, phone_number } = req.body;
    try {
        const checkIfAlreadyExistsSQL = (0, systemUserSearch_1.systemUserSearch)({ email });
        const { rows } = yield connect_1.db.query(checkIfAlreadyExistsSQL);
        let uuid = undefined;
        console.log();
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
        else
            uuid = rows[0].uuid;
        const { username, pass } = req.body;
        const member = {
            uuid,
            username,
            pass,
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
    var _j;
    try {
        const removeTokenSQL = (0, updateMember_1.updateMember)({ uuid: (_j = req.member) === null || _j === void 0 ? void 0 : _j.uuid }, { token: null });
        yield connect_1.db.query(removeTokenSQL);
        res.status(200).send();
    }
    catch (err) {
        res.status(500).send("An error from our side... Please refresh the page");
    }
}));
membersRouter.post("/members/delete/account", auth_1.auth, (req, res) => {
});
membersRouter.post("/calldibs", auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { isbn } = req.body;
    try {
        console.log("HIII");
        // if (req.member?.warning_count as number >= 5)
        //     throw new Error("You cannot make any reservations until warnings are cleared");
        const { verification_code, error } = yield (0, callDibs_1.callDibs)(isbn, req.member, index_1.currSocket);
        if (error)
            throw error;
        res.status(201).json({ verification_code });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
}));
membersRouter.post("/review/instructor", auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _k;
    const { instructor_id, comment, rating } = req.body;
    try {
        console.log(rating);
        yield (0, addReview_1.addReview)(instructor_id, "Instructor", (_k = req.member) === null || _k === void 0 ? void 0 : _k.uuid, comment, rating);
        res.status(200).send();
    }
    catch (err) {
        console.log(err);
        res.status(400).send();
    }
}));
membersRouter.post("/review/author", auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _l;
    const { author_id, comment, rating } = req.body;
    try {
        console.log(rating);
        yield (0, addReview_1.addReview)(author_id, "Author", (_l = req.member) === null || _l === void 0 ? void 0 : _l.uuid, comment, rating);
        res.status(200).send();
    }
    catch (err) {
        console.log(err);
        res.status(400).send();
    }
}));
membersRouter.post("/review/book", auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _m;
    const { isbn, comment, rating } = req.body;
    try {
        console.log(rating);
        yield (0, addReview_1.addReview)(isbn, "Books", (_m = req.member) === null || _m === void 0 ? void 0 : _m.uuid, comment, rating);
        res.status(200).send();
    }
    catch (err) {
        console.log(err);
        res.status(400).send();
    }
}));
membersRouter.post("/review/workshop", auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _o;
    const { workshop_title, comment, rating } = req.body;
    try {
        console.log(rating);
        yield (0, addReview_1.addReview)(workshop_title, "Workshop", (_o = req.member) === null || _o === void 0 ? void 0 : _o.uuid, comment, rating);
        res.status(200).send();
    }
    catch (err) {
        console.log(err);
        res.status(400).send();
    }
}));
