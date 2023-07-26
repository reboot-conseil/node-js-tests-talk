import { Client, QueryResult } from 'pg';
import fs from 'fs';

export const BAD_SQL_QUERY = "Bad SQL query";
export const DB_UNREACHABLE = "Database is unreachable";
export const MIGRATIONS_FOLDER_NOT_SET_CORRECTLY = "Migrations folder not set correctly";
export const SQL_QUERY_CANNOT_BE_EMPTY = "SQL query cannot be empty";

class DbService {

    constructor(private db: string, private host: string, private user: string,
        private password: string, private port: number) {
    }

    public async query(sqlQuery: string, params: string[] = []): Promise<QueryResult<any>> {
        if (sqlQuery.trim() === "") {
            throw new Error(SQL_QUERY_CANNOT_BE_EMPTY);
        }
        let pgClient: Client;
        pgClient = new Client({
            database: this.db,
            host: this.host,
            port: this.port,
            user: this.user,
            password: this.password
        });
        try {
            await pgClient.connect();
        } catch (error) {
            throw new Error(DB_UNREACHABLE);
        }
        try {
            const res = await pgClient.query(sqlQuery, params);
            await pgClient.end();
            return res;
        } catch (error) {
            await pgClient.end();
            throw new Error(BAD_SQL_QUERY);
        }
    }

    public async runMigrations(migrationsFolder: string): Promise<string[]> {
        if (!fs.existsSync(migrationsFolder)) {
            throw new Error(MIGRATIONS_FOLDER_NOT_SET_CORRECTLY);
        }
        if (!fs.lstatSync(migrationsFolder).isDirectory()) {
            throw new Error(MIGRATIONS_FOLDER_NOT_SET_CORRECTLY);
        }
        const migrations: string[] = [];
        fs.readdirSync(migrationsFolder).forEach((fileName) => {
            const filePatternRegex = /^[0-9][0-9][0-9][1-9]\_[a-zA-Z0-9_-]+\.psql$/;
            if (filePatternRegex.test(fileName)) {
                migrations.push(fileName);
            }
        });
        migrations.sort();
        await this.query(`CREATE TABLE IF NOT EXISTS migrations(
            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL 
        );`);
        for(let i = 0; i < migrations.length; i++) {
            const migration = migrations[i];
            const migrationName = migration.split(".")[0];
            const migrationAlreadyRun = await this.query(`SELECT * FROM migrations WHERE name = $1`, [migrationName]);
            if (migrationAlreadyRun.rowCount === 0) {
                const migrationContent = fs.readFileSync(`${migrationsFolder}/${migration}`, "utf-8");
                await this.query(migrationContent);
                await this.query(`INSERT INTO migrations(name) VALUES($1)`, [migrationName]);
            }
        }
        return migrations;
    } 

};

export default DbService;