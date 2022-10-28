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
const booksRouter = express_1.default.Router();
exports.booksRouter = booksRouter;
booksRouter.get("/books", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name = "?", genre = "?", author = "?", sort = "?", status = "?" } = req.query;
    const sql = (0, bookSearch_1.bookSearch)(name, genre, author, status, sort);
    try {
        const [books] = yield connect_1.db.query(sql);
        console.log(books);
        res.json({ books });
    }
    catch (err) {
        console.log(err);
    }
}));
