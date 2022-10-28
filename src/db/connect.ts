import {createConnection, Connection} from "mysql2/promise"

async function connect() {
    return await createConnection({
        host: "localhost",
        user: "Marwan",
        password: "marwanisamazing",
        database: "Booker"
    })
}

let db: Connection;
connect()
    .then(connection => db = connection)
    .catch(err => console.log(err))


export { db };