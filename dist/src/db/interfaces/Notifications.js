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
exports.createNotification = void 0;
const connect_1 = require("../connect");
function createNotification(data, type) {
    return __awaiter(this, void 0, void 0, function* () {
        const currTime = new Date(Date.now());
        const notification_time = currTime.toLocaleTimeString() + "$" + currTime.toLocaleDateString();
        if (!type.includes("penalty"))
            return { data, type, notification_time };
        const penalty_type = type.replace(" penalty", "");
        const sql = `   SELECT  fee
                    FROM    Penalties
                    JOIN    Penalty_Types   ON      penalty_name = penalty_type
                    WHERE   penalty_type = '${penalty_type}'`;
        const { rows } = yield connect_1.db.query(sql);
        const fee = rows[0].fee;
        data = Object.assign(Object.assign({}, data), { fee });
        console.log("notification data");
        console.log(data);
        return {
            data,
            type,
            notification_time
        };
    });
}
exports.createNotification = createNotification;
