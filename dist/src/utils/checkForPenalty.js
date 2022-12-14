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
exports.checkForPenalty = void 0;
const connect_1 = require("../db/connect");
function checkForPenalty(uuid, penalty) {
    return __awaiter(this, void 0, void 0, function* () {
        const sql = `   SELECT  COUNT(*) 
                    FROM    Penalties
                    WHERE   member_id = '${uuid}' 
                    AND     penalty_type = '${penalty.type}'; `;
        console.log(sql);
        const { rows } = yield connect_1.db.query(sql);
        const penaltyCount = rows[0].count;
        return penaltyCount;
    });
}
exports.checkForPenalty = checkForPenalty;
