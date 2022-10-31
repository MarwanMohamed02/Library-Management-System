import {createConnection, Connection} from "mysql2/promise"

async function connect() {
    const { HOST, USER, PASSWORD, DATABASE_NAME } = process.env;

    return await createConnection({
        host: HOST,
        user: USER,
        password: PASSWORD,
        database: DATABASE_NAME
    })
}

let db: Connection;
connect()
    .then(connection => db = connection)
    .catch(err => console.log(err))


export { db };