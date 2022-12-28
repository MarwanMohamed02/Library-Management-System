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
exports.getReviews = void 0;
const connect_1 = require("../connect");
const Reviews_1 = require("../interfaces/Reviews");
function getReviews(reviewed_item_id, reviewedItemTable) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id_name, id_type } = (0, Reviews_1.getQueryParams)(reviewedItemTable);
        const sql = `  SELECT 
                            firstname, lastname,
                            comment, rating, review_timestamp
                    
                    FROM    ${reviewedItemTable}_Review
                    
                    JOIN    System_Users    ON      id = member_id
                    
                    WHERE   ${id_name}= '${reviewed_item_id}'${id_type}; `;
        console.log(sql);
        const { rows } = yield connect_1.db.query(sql);
        let reviews = [];
        rows.forEach(rvw => {
            const { firstname, lastname, comment, rating, review_timestamp } = rvw;
            let review = {
                member_name: firstname + " " + lastname,
                comment,
                rating,
                review_time: new Date(review_timestamp).toLocaleDateString()
            };
            reviews.push(review);
        });
        console.log(reviews);
        return reviews;
    });
}
exports.getReviews = getReviews;
