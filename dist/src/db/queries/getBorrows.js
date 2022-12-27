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
exports.getBorrows = void 0;
const connect_1 = require("../connect");
function getBorrows(uuid) {
    return __awaiter(this, void 0, void 0, function* () {
        const sql = `   SELECT username,book_name, borrow_timestamp, return_before
                    FROM (Borrows JOIN  Members ON id = member_id) JOIN Books ON book_isbn = isbn 
                    WHERE   id::UUID = '${uuid}'`;
        console.log(sql);
        const { rows } = yield connect_1.db.query(sql);
        let borrows = [];
        for (let i = 0; i < rows.length; i++) {
            const borrow_date = (new Date(parseInt(rows[i].borrow_timestamp))).toLocaleDateString();
            const borrow_time = (new Date(parseInt(rows[i].borrow_timestamp))).toLocaleTimeString();
            const return_before_date = (new Date(parseInt(rows[i].return_before))).toLocaleDateString();
            const return_before_time = (new Date(parseInt(rows[i].return_before))).toLocaleTimeString();
            borrows.push({
                username: rows[i].username,
                book_name: rows[i].book_name,
                borrow_date,
                borrow_time,
                return_before_date,
                return_before_time,
            });
        }
        return borrows;
    });
}
exports.getBorrows = getBorrows;
