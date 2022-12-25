import express from "express"
import http from "http"
import path from "path";
import { Server } from "socket.io"
import { db } from "./db/connect";
import { IMember } from "./db/interfaces/Member";
import { IWarnings } from "./db/interfaces/Penalty";
import { getAllWarnings } from "./db/queries/getAllWarnings";
// import { adminsRouter } from "./routers/adminsRouter";
import { booksRouter } from "./routers/booksRouter"
import { membersRouter } from "./routers/membersRouter"
import { auth, AuthRequest, auth_socket } from "./utils/auth";


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


app.get("/", async (req, res) => {
    
    await db.query("USE Booker");

    res.sendFile(path.join(__dirname, "../public/index.html"));
})

app.get("/home", (req: AuthRequest, res) => {
    res.sendFile(path.join(__dirname, "../public/home.html"));
})

app.get("/test", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/login.html"));
})

io.use(auth_socket);

io.on("connection", async (socket) => {
    console.log("connected");
    
    const member = socket.data.member as IMember;
    const uuid = member.uuid as string;

    await socket.join(uuid);

    io.to(uuid).emit("ping", Date.now() );

    socket.on("pong", async (time) => {
        if (Date.now() - time < 60)
            io.to(uuid).emit("ping", time);
        else {
            const warnings = await getAllWarnings(uuid) as IWarnings;
            console.log(warnings);
            if (!warnings)
                io.to(uuid).emit("ping", Date.now());
            else
                io.to(uuid).emit("warnings", warnings);
        }
    })

})



server.listen(port, () => console.log(`Server is up on port ${port}`))