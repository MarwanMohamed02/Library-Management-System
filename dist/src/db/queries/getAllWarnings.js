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
exports.getAllWarnings = void 0;
const connect_1 = require("../connect");
function getAllWarnings(uuid) {
    return __awaiter(this, void 0, void 0, function* () {
        let sql = `   SELECT 
                        book_name, Books.isbn, CALL_DIBS_ON_Timestamp, pick_up_before, verification_code

                    FROM CALL_DIBS_ON 
                    JOIN Books  ON  Books.isbn = book_isbn
                    WHERE   pick_up_before < ${Date.now()};`;
        const { rows: warnings } = yield connect_1.db.query(sql);
        return warnings;
    });
}
exports.getAllWarnings = getAllWarnings;
