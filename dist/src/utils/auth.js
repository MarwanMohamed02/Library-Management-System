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
exports.auth = exports.auth_socket = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const connect_1 = require("../db/connect");
const memberSearch_1 = require("../db/queries/memberSearch");
function auth(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
            if (!token)
                throw new Error();
            jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (error, decoded) => __awaiter(this, void 0, void 0, function* () {
                if (error) {
                    next(error);
                    return;
                }
                const { rows } = yield connect_1.db.query((0, memberSearch_1.memberSearch)({ uuid: decoded.uuid, token: token }));
                const member = rows[0];
                if (!member) {
                    next(new Error());
                    return;
                }
                req.member = member;
                next();
            }));
        }
        catch (err) {
            res.status(401).send({ error: "Unauthorized Access!" });
        }
    });
}
exports.auth = auth;
function auth_socket(socket, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = socket.handshake.auth.token;
        if (!token)
            socket.data.error = new Error("Authorization Needed");
        else {
            // console.log(token);
            // console.log(db);
            try {
                const member = yield verify_token(token);
                // console.log(member);
                socket.data.member = member;
            }
            catch (err) {
                console.log(err);
            }
        }
        next();
    });
}
exports.auth_socket = auth_socket;
function verify_token(token) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (error, decoded) => __awaiter(this, void 0, void 0, function* () {
                if (error)
                    reject(error);
                try {
                    const { rows } = yield connect_1.db.query((0, memberSearch_1.memberSearch)({ uuid: decoded.uuid, token: token }));
                    const member = rows[0];
                    if (!member) {
                        reject(new Error("User Not Found!"));
                    }
                    resolve(member);
                }
                catch (err) {
                    reject(err);
                }
                // console.log(member);
            }));
        });
    });
}
