"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const socket_io_1 = require("socket.io");
// import { adminsRouter } from "./routers/adminsRouter";
const booksRouter_1 = require("./routers/booksRouter");
const membersRouter_1 = require("./routers/membersRouter");
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
console.log(new Date('9 AM, 12/10/2022').toLocaleString());
// console.log(new Date(1671305720795).toLocaleString())
// Routers
app.use(booksRouter_1.booksRouter);
app.use(membersRouter_1.membersRouter);
// app.use(adminsRouter);
app.get("/", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../public/index.html"));
});
app.get("/home", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../public/home.html"));
});
app.get("/test", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../public/login.html"));
});
io.on("connection", (socket) => {
    console.log("connected");
    socket.on("clicked", () => console.log("clicked!"));
});
server.listen(port, () => console.log(`Server is up on port ${port}`));
