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
const pg_1 = require("pg");
let db;
exports.db = db;
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        const { DATABASE_URL } = process.env;
        let client = new pg_1.Client(DATABASE_URL);
        try {
            yield client.connect();
            console.log("Connected to database");
        }
        catch (err) {
            console.log(err);
            client = yield connect();
        }
        return client;
    });
}
connect()
    .then(client => exports.db = db = client)
    .catch(err => console.log(err));
// const { Client } = require("pg");
// const client = new Client(process.env.DATABASE_URL);
// (async () => {
//     await client.connect();
//     try {
//         const results = await client.query("SELECT NOW()");
//         console.log(results);
//     } catch (err) {
//         console.error("error executing query:", err);
//     } finally {
//         client.end();
//     }
// })();
