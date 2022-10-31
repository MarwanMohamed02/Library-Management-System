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
const membersRouter = express_1.default.Router();
exports.membersRouter = membersRouter;
// GET
membersRouter.get("/members", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const membersData = req.query;
    const sql = (0, memberSearch_1.memberSearch)(membersData);
    try {
        const [members] = yield connect_1.db.query(sql);
        res.status(200).json(members);
    }
    catch (err) {
        res.status(400).json(err);
    }
}));
// POST
membersRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const member = req.body;
    const sql = yield (0, insertMember_1.insertMember)(member);
    try {
        yield connect_1.db.query(sql);
        yield (0, assignToken_1.assignToken)(member);
        res.status(201).send();
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
}));
