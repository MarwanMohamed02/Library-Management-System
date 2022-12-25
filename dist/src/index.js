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
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const socket_io_1 = require("socket.io");
const connect_1 = require("./db/connect");
const getAllWarnings_1 = require("./db/queries/getAllWarnings");
// import { adminsRouter } from "./routers/adminsRouter";
const booksRouter_1 = require("./routers/booksRouter");
const membersRouter_1 = require("./routers/membersRouter");
const auth_1 = require("./utils/auth");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: { origin: "*", }
});
const port = process.env.PORT;
// Serving Up Files
const publicDir = path_1.default.join(__dirname, "../public");
app.use(express_1.default.static(publicDir));
// Automatically Parses Request Body
app.use(express_1.default.json());
// async function test() {
//     console.log(db)
//     await db.query("select count(*) from Members");
// }
// test().then(count => console.log(count));
// const date = Date.now();
// console.log(date)
console.log(Date.now());
console.log(new Date(1671305720795).toLocaleString());
// Routers
app.use(booksRouter_1.booksRouter);
app.use(membersRouter_1.membersRouter);
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield connect_1.db.query("USE Booker");
    res.sendFile(path_1.default.join(__dirname, "../public/index.html"));
}));
app.get("/home", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../public/home.html"));
});
app.get("/test", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../public/login.html"));
});
io.use(auth_1.auth_socket);
io.on("connection", (socket) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("connected");
    const member = socket.data.member;
    const uuid = member.uuid;
    yield socket.join(uuid);
    io.to(uuid).emit("ping", Date.now());
    socket.on("pong", (time) => __awaiter(void 0, void 0, void 0, function* () {
        if (Date.now() - time < 60)
            io.to(uuid).emit("ping", time);
        else {
            const warnings = yield (0, getAllWarnings_1.getAllWarnings)(uuid);
            console.log(warnings);
            if (!warnings)
                io.to(uuid).emit("ping", Date.now());
            else
                io.to(uuid).emit("warnings", warnings);
        }
    }));
}));
server.listen(port, () => console.log(`Server is up on port ${port}`));
