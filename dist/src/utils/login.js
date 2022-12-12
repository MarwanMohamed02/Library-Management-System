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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const connect_1 = require("../db/connect");
const memberSearch_1 = require("../db/queries/memberSearch");
const assignToken_1 = require("./assignToken");
/**
 * Returns token if username & password match and null otherwise
 * @param memberQuery an object containing username & password
 * @returns token | null
 */
function login(memberQuery) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, pass } = memberQuery;
        const { rows } = yield connect_1.db.query((0, memberSearch_1.memberSearch)({ username }));
        let member = rows[0];
        console.log(member.token);
        if (member.token)
            return null;
        const found = yield bcryptjs_1.default.compare(pass, member.pass);
        if (found) {
            return yield (0, assignToken_1.assignToken)(member.uuid);
        }
        return null;
    });
}
exports.login = login;
