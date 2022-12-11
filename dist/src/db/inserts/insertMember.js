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
exports.insertMember = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
function insertMember(member) {
    return __awaiter(this, void 0, void 0, function* () {
        let { uuid, username, password, membership_type, follower_count = 0, warning_count = 0 } = member;
        // Hashing Password
        password = yield bcryptjs_1.default.hash(password, 12);
        return "INSERT INTO Members(id, username, pass, membership_type, follower_count, warning_count) "
            + ` VALUES ('${uuid}'::UUID::BYTES, '${username}', '${password}', ${membership_type}, ${follower_count}, ${warning_count});`;
    });
}
exports.insertMember = insertMember;
