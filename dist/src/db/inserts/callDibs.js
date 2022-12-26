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
exports.callDibs = void 0;
const node_verification_code_1 = require("node-verification-code");
const checkBookAvailability_1 = require("../../utils/checkBookAvailability");
const checkForPenalty_1 = require("../../utils/checkForPenalty");
const checkMembershipLimit_1 = require("../../utils/checkMembershipLimit");
const connect_1 = require("../connect");
const Book_1 = require("../interfaces/Book");
const updateBook_1 = require("../updates/updateBook");
function callDibs(isbn, member) {
    return __awaiter(this, void 0, void 0, function* () {
        // Checks if book is available
        const book = yield (0, checkBookAvailability_1.checkBookAvailability)(isbn);
        console.log("reserved book: " + book);
        if (!book)
            return { error: new Error("Sorry... Book is unavailable") };
        // Checks if there are any unpaid penalties related to a dibs that was not picked up
        const hasPenalty = yield (0, checkForPenalty_1.checkForPenalty)(member.uuid, "no pickup");
        console.log("Penalties:" + hasPenalty);
        if (hasPenalty > 0)
            return { error: new Error("Please pay past penalties before calling dibs") };
        // Checks if the member has reached the limit specified by his/her membership
        const dibsTimeLimit = yield (0, checkMembershipLimit_1.checkMembershipLimit)(member.uuid, member.membership_type);
        console.log("membership time limit: " + dibsTimeLimit);
        if (dibsTimeLimit === null)
            return { error: new Error("Dibs Limit Exceeded") };
        const currTime = Date.now();
        const verification_code = (0, node_verification_code_1.getDigitalCode)(3).join("");
        let callDibsSQL = `   INSERT INTO Transactions(member_id, book_isbn, transaction_timestamp)
                            VALUES  ('${member.uuid}'::UUID::BYTES, '${isbn}', ${currTime}); 
                            
                            INSERT INTO CALL_DIBS_ON(member_id, book_isbn, CALL_DIBS_ON_Timestamp, pick_up_before, verification_code)
                            VALUES  ('${member.uuid}'::UUID::BYTES, '${isbn}', ${currTime}, ${currTime + dibsTimeLimit}, '${verification_code}'); `;
        book.borrow_quantity = book.borrow_quantity ? book.borrow_quantity - 1 : book.borrow_quantity;
        const bookUpdates = {
            isbn: book.isbn,
            borrow_quantity: book.borrow_quantity
        };
        console.log("book updates: " + bookUpdates);
        callDibsSQL += (0, updateBook_1.updateBookData)(bookUpdates, Book_1.BookType.LIBRARY_BOOK);
        console.log(callDibsSQL);
        yield connect_1.db.query(callDibsSQL);
        return { verification_code };
    });
}
exports.callDibs = callDibs;
