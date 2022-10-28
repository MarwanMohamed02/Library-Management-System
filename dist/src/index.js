"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const socket_io_1 = require("socket.io");
const booksRouter_1 = require("./routers/booksRouter");
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
// Routers
app.use(booksRouter_1.booksRouter);
app.get("/", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../public/index.html"));
});
app.post("/test", (req, res) => {
    const { test_data } = req.body;
    console.log(test_data);
    res.status(201).json({ test_data });
});
io.on("connection", (socket) => {
    console.log("connected");
    socket.on("clicked", () => console.log("clicked!"));
});
server.listen(port, () => console.log(`Server is up on port ${port}`));
