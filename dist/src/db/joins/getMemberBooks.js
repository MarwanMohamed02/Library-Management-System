"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMemberDibs = void 0;
function getMemberDibs(uuid) {
    return "SELECT * FROM  Reservations "
        + `RIGHT JOIN Books ON Reservations.book_id = Books.isbn `
        + `WHERE Reservations.member_id = UUID_TO_BIN("${uuid}");`;
}
exports.getMemberDibs = getMemberDibs;
