"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrow = void 0;
function borrow(isbn, uuid) {
    return "INSERT INTO Borrows(book_id, member_id, borrow_date_u)"
        + `VALUES ("${isbn}","${uuid}", ${new Date().getTime() / 1000.000});`;
}
exports.borrow = borrow;
