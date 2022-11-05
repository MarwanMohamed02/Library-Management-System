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
exports.adminsRouter = void 0;
const express_1 = require("express");
const connect_1 = require("../db/connect");
const getDibs_1 = require("../db/queries/getDibs");
const adminsRouter = (0, express_1.Router)();
exports.adminsRouter = adminsRouter;
// GET
adminsRouter.get("/reservations", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, book_name } = req.query;
    const sql = (0, getDibs_1.getDibs)(username, book_name);
    try {
        const [dibs] = yield connect_1.db.query(sql);
        res.status(200).json(dibs);
    }
    catch (err) {
        res.status(400).json(err);
    }
}));
