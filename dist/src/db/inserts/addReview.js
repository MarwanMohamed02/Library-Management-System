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
exports.addReview = void 0;
const connect_1 = require("../connect");
function getQueryParams(reviewedItemTable) {
    let params = {};
    switch (reviewedItemTable) {
        case 'Author':
            params = { id_name: "Author_ID", id_type: "::UUID::BYTES" };
            break;
        case 'Instructor':
            params = { id_name: "Instructor_ID", id_type: "::UUID::BYTES" };
            break;
        case 'Workshop':
            params = { id_name: "Workshop_Title", id_type: "" };
            break;
        case 'Book':
            params = { id_name: "Book_ISBN", id_type: "" };
            break;
    }
    return params;
}
function addReview(reviewed_item_id, reviewedItemTable, member_id, comment, rating) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id_name, id_type } = getQueryParams(reviewedItemTable);
        let sql = ` INSERT INTO ${reviewedItemTable}_Review (Member_ID, ${id_name}, comment, rating, review_timestamp)
                VALUES  ('${member_id}'::UUID::BYTES, '${reviewed_item_id}'${id_type}, '${comment}', ${rating}, ${Date.now()}); `;
        console.log(sql);
        yield connect_1.db.query(sql);
    });
}
exports.addReview = addReview;
