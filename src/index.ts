import express from "express"
import http from "http"
import path from "path";
import { Server } from "socket.io"
import { db } from "./db/connect";
// import { adminsRouter } from "./routers/adminsRouter";
import { booksRouter } from "./routers/booksRouter"
import { membersRouter } from "./routers/membersRouter"
import { auth, AuthRequest } from "./utils/auth";


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

// async function test() {
//     console.log(db)
//     await db.query("select count(*) from Members");
// }
// test().then(count => console.log(count));

// const date = Date.now();
// console.log(date)
console.log(Date.now())
console.log(new Date(1671305720795).toLocaleString())

// Routers
app.use(booksRouter);
app.use(membersRouter);
// app.use(adminsRouter);


app.get("/", (req, res) => {
    
    res.sendFile(path.join(__dirname, "../public/index.html"));
})

app.get("/home", (req: AuthRequest, res) => {
    res.sendFile(path.join(__dirname, "../public/home.html"));
})

app.get("/test", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/login.html"));
})

io.on("connection", (socket) => {
    console.log("connected");
    socket.on("clicked", () => console.log("clicked!"))
})


server.listen(port, () => console.log(`Server is up on port ${port}`))