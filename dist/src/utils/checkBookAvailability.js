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
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkBookAvailability = void 0;
const connect_1 = require("../db/connect");
const Book_1 = require("../db/interfaces/Book");
const bookSearch_1 = require("../db/queries/bookSearch");
function checkBookAvailability(isbn) {
    return __awaiter(this, void 0, void 0, function* () {
        const bookQuery = {
            isbn,
            status: "Available",
            type: Book_1.BookType.LIBRARY_BOOK
        };
        const sql = (0, bookSearch_1.booksSearch)(bookQuery);
        const { rows } = yield connect_1.db.query(sql);
        console.log(rows[0]);
        return rows[0];
    });
}
exports.checkBookAvailability = checkBookAvailability;
