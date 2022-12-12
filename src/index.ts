import express from "express"
import http from "http"
import path from "path";
import { Server } from "socket.io"
// import { adminsRouter } from "./routers/adminsRouter";
import { booksRouter } from "./routers/booksRouter"
import { membersRouter } from "./routers/membersRouter"


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*", }
});


const port = process.env.PORT;

// Serving Up Files
const publicDir = path.join(__dirname, "../public");
app.use(express.static(publicDir));



// Automatically Parses Request Body
app.use(express.json());


console.log();

// Routers
app.use(booksRouter);
app.use(membersRouter);
// app.use(adminsRouter);


app.get("/", (req, res) => {
    
    res.sendFile(path.join(__dirname, "../public/index.html"));
})

app.get("/test", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/login.html"));
})

io.on("connection", (socket) => {
    console.log("connected");
    socket.on("clicked", () => console.log("clicked!"))
})

console.log(undefined === null);
server.listen(port, () => console.log(`Server is up on port ${port}`))