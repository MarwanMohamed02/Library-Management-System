"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callDibs = void 0;
const node_verification_code_1 = require("node-verification-code");
function callDibs(isbn, uuid) {
    return `INSERT INTO Reservations(book_id, member_id, verification_code, reservation_date)
            VALUES ("${isbn}",UUID_TO_BIN("${uuid}"), ${(0, node_verification_code_1.getDigitalCode)(3).join("")}, ${new Date().getTime() / 1000.000});`;
}
exports.callDibs = callDibs;
