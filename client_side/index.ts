import { io } from "socket.io-client";


const socket = io({
    auth: {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiM2VhOTNlNTctYjg1Ni00OGYyLTkwMmMtM2Y2Njg5MWMzODk3IiwiaWF0IjoxNjcxODYyNzU5fQ.S6ONCS-PwaJqyHXeDyuN4OmblNglSdraHu8yWdpF9oI"
    }
});


socket.on("ping", (time) => {
    socket.emit("pong", time);
});

// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiNGUwMjgzNWQtN2RlZC00NTIxLWFhNWItYmZmMjY3N2M5NjA5IiwiaWF0IjoxNjcxMDAxMzIyfQ._aUPRC-Uz9y6ppzl_u_zBaenJZVcsDMl95f48YclJds"
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiNWRiODdjMzgtNDg2My00ODM3LWJlOGItNDhlZmQ3ODUwMjU1IiwiaWF0IjoxNjcxMjgxNjc2fQ._CHR9bbarOLLWHl15eBuOUxpRxvBbTmyacaiLB0u7Yo"
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiYTY4OGE2ODctYzJlOC00ZDZjLWFiZjYtYmY5MjY4NWFjMjdkIiwiaWF0IjoxNjcwOTA3MDYzfQ.LZ6FTv08yusy8zGPk-jT2q6-frPNBOBmL_1-Ld5eJZg"