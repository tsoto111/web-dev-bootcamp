import pg from "pg";
import { env } from "../config/environment.js";

class Database {
    constructor(user, host, database, password, port) {
        this.db = new pg.Client({
            user: user ?? env?.db?.user,
            host: host ?? env?.db?.host,
            database: database ?? env?.db?.database,
            password: password ?? env?.db?.password,
            port: port ?? env?.db?.port
        });

        this.db.connect();
    }

    async query(statement) {
        try {
            const { rows } = await this.db.query(statement);
            return rows;
        } catch(error) {
            console.error('Database query error:', err);
            return []
        }
    }
}

export default Database;