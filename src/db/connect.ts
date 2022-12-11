import { Client } from "pg"

let db: Client;

async function connect() {
    const { DATABASE_URL } = process.env;

    const client = new Client(DATABASE_URL as string);

    await client.connect();

    await client.query("USE booker ")

    console.log("done")

    return client;
}

connect()
    .then(client => db = client)
    .catch(err => console.log(err));


export { db };

// const { Client } = require("pg");

// const client = new Client(process.env.DATABASE_URL);

// (async () => {
//     await client.connect();
//     try {
//         const results = await client.query("SELECT NOW()");
//         console.log(results);
//     } catch (err) {
//         console.error("error executing query:", err);
//     } finally {
//         client.end();
//     }
// })();