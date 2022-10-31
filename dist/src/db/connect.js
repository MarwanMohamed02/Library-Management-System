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
exports.db = void 0;
const promise_1 = require("mysql2/promise");
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        const { PORT, HOST, USER, PASSWORD, DATABASE_NAME } = process.env;
        return yield (0, promise_1.createConnection)({
            host: HOST,
            user: USER,
            password: PASSWORD,
            database: DATABASE_NAME
        });
    });
}
let db;
exports.db = db;
connect()
    .then(connection => exports.db = db = connection)
    .catch(err => console.log(err));
