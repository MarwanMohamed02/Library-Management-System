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
exports.checkMembershipLimit = void 0;
const connect_1 = require("../db/connect");
function checkMembershipLimit(uuid, membership_type) {
    return __awaiter(this, void 0, void 0, function* () {
        const getLimitSQL = `   SELECT  dibs_quantity_limit, dibs_time_limit
                            FROM    Membership_Types
                            WHERE   membership_name = '${membership_type}'; `;
        console.log(getLimitSQL);
        const { rows: membership_types_row } = yield connect_1.db.query(getLimitSQL);
        const membership_limit = parseInt(membership_types_row[0].dibs_quantity_limit);
        const getDibsCountSQL = `   SELECT  COUNT(*)
                                FROM    CALL_DIBS_ON
                                WHERE   member_id::UUID = '${uuid}'; `;
        console.log(getDibsCountSQL);
        const { rows: call_dibs_row } = yield connect_1.db.query(getDibsCountSQL);
        const currDibsCount = parseInt(call_dibs_row[0].count);
        console.log("membership limit: " + membership_limit);
        console.log("currDibsCount: " + currDibsCount);
        if (membership_limit <= currDibsCount)
            return null;
        console.log("Can call dibs");
        return membership_types_row[0].dibs_time_limit;
    });
}
exports.checkMembershipLimit = checkMembershipLimit;
