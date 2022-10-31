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
exports.booksRouter = void 0;
const express_1 = __importDefault(require("express"));
const connect_1 = require("../db/connect");
const bookSearch_1 = require("../db/queries/bookSearch");
const insertBooks_1 = require("../db/inserts/insertBooks");
const booksRouter = express_1.default.Router();
exports.booksRouter = booksRouter;
// GET
booksRouter.get("/books", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookQuery = req.query;
    const sql = (0, bookSearch_1.booksSearch)(bookQuery);
    try {
        const [books] = yield connect_1.db.query(sql);
        console.log(books);
        res.json(books);
    }
    catch (err) {
        res.json(err);
    }
}));
// POST
booksRouter.post("/books", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookData = req.body;
    const sql = (0, insertBooks_1.insertBooks)(bookData);
    try {
        const [result] = yield connect_1.db.query(sql);
        res.status(201).json(result);
    }
    catch (err) {
        res.status(400).json(err);
    }
}));
