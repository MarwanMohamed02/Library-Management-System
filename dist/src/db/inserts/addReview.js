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
const Reviews_1 = require("../interfaces/Reviews");
function addReview(reviewed_item_id, reviewedItemTable, member_id, comment, rating) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id_name, id_type, original_table_id } = (0, Reviews_1.getQueryParams)(reviewedItemTable);
        let sql = ` INSERT INTO ${reviewedItemTable}_Review (Member_ID, ${id_name}, comment, rating, review_timestamp)
                VALUES  ('${member_id}'::UUID::BYTES, '${reviewed_item_id}'${id_type}, '${comment}', ${rating}, ${Date.now()}); 
                
                UPDATE ${reviewedItemTable}
                SET  
                    avg_rating = (avg_rating * reviews_count::FLOAT + ${rating}::FLOAT) / (reviews_count::FLOAT + 1.0),
                    reviews_count = reviews_count + 1
                WHERE ${original_table_id} = '${reviewed_item_id}'${id_type}; `;
        console.log(sql);
        yield connect_1.db.query(sql);
    });
}
exports.addReview = addReview;
