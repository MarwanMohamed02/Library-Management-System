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
exports.addPenalty = void 0;
const connect_1 = require("../connect");
function addPenalty(penalty_type, uuid, last_reserved_isbn, timestamp) {
    return __awaiter(this, void 0, void 0, function* () {
        // inserting the penalty and deleting the late reservations 
        let sql = ` INSERT INTO Penalties (member_id, book_isbn, transaction_timestamp, penalty_type)
                VALUES  ('${uuid}'::UUID::BYTES, '${last_reserved_isbn}', ${timestamp}, '${penalty_type}'); `;
        sql += penalty_type == "no pickup" ?
            ` DELETE FROM CALL_DIBS_ON
                WHERE  member_id::UUID = '${uuid}'
                AND    pick_up_before <= ${Date.now()}
                RETURNING  book_isbn; `
            : "";
        const results = yield connect_1.db.query(sql);
        // updating borrow quantities for the cancelled reservations
        if (penalty_type === "no pickup") {
            const ISBNS = results[1].rows;
            console.log(`restored books isbn: ${ISBNS}`);
            sql = "";
            ISBNS.forEach((isbn) => {
                sql += `UPDATE Library_Books
                SET   borrow_quantity = borrow_quantity + 1
                WHERE isbn = '${isbn.book_isbn}'; `;
            });
            yield connect_1.db.query(sql);
        }
        console.log(sql);
    });
}
exports.addPenalty = addPenalty;
