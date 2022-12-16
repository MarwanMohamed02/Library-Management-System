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
exports.getDibs = void 0;
const connect_1 = require("../connect");
function getDibs(uuid) {
    return __awaiter(this, void 0, void 0, function* () {
        const sql = `   SELECT username,book_name, CALL_DIBS_ON_Timestamp, pick_up_before, verification_code
                    FROM (CALL_DIBS_ON JOIN  Members ON id = member_id) JOIN books ON book_isbn = isbn 
                    WHERE   id::UUID = '${uuid}'`;
        console.log(sql);
        const { rows } = yield connect_1.db.query(sql);
        let dibs = [];
        for (let i = 0; i < rows.length; i++) {
            const reservation_date = (new Date(parseInt(rows[i].call_dibs_on_timestamp))).toLocaleDateString();
            const reservation_time = (new Date(parseInt(rows[i].call_dibs_on_timestamp))).toLocaleTimeString();
            const pick_up_before_date = (new Date(parseInt(rows[i].pick_up_before))).toLocaleDateString();
            const pick_up_before_time = (new Date(parseInt(rows[i].pick_up_before))).toLocaleTimeString();
            dibs.push({
                username: rows[i].username,
                book_name: rows[i].book_name,
                reservation_date,
                reservation_time,
                pick_up_before_date,
                pick_up_before_time,
                verification_code: parseInt(rows[i].verification_code)
            });
        }
        return dibs;
    });
}
exports.getDibs = getDibs;
