import express from "express"
import http from "http"
import path from "path";
import { Server } from "socket.io"
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



// Routers
app.use(booksRouter);
app.use(membersRouter)


app.get("/", (req, res) => {
    
    res.sendFile(path.join(__dirname, "../public/index.html"));
})

app.post("/test", (req, res) => {
    const { test_data } = req.body;
    console.log(test_data);
    res.status(201).json({ test_data });
})

io.on("connection", (socket) => {
    console.log("connected");
    socket.on("clicked", () => console.log("clicked!"))
})


server.listen(port, () => console.log(`Server is up on port ${port}`))