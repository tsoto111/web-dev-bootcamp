import pg from "pg";
import { env } from "../config/config.js";

class Database {
    constructor(user, host, database, password, port) {
        this.db = new pg.Client({
            user: user ?? env?.postgres?.user,
            host: host ?? env?.postgres?.host,
            database: database ?? env?.postgres?.database,
            password: password ?? env?.postgres?.password,
            port: port ?? env?.postgres?.port
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