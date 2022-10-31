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
exports.assignToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const connect_1 = require("../db/connect");
const memberSearch_1 = require("../db/queries/memberSearch");
const updateMember_1 = require("../db/updates/updateMember");
function assignToken({ username }) {
    return __awaiter(this, void 0, void 0, function* () {
        const [found] = yield connect_1.db.query((0, memberSearch_1.memberSearch)({ username }));
        const member = found[0];
        member.token = jsonwebtoken_1.default.sign({ uuid: member.uuid }, process.env.JWT_SECRET);
        // console.log(member);
        yield connect_1.db.query((0, updateMember_1.updateMember)(member.uuid, member));
    });
}
exports.assignToken = assignToken;
