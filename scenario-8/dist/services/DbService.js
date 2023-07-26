"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SQL_QUERY_CANNOT_BE_EMPTY = exports.MIGRATIONS_FOLDER_NOT_SET_CORRECTLY = exports.DB_UNREACHABLE = exports.BAD_SQL_QUERY = void 0;
const pg_1 = require("pg");
const fs_1 = __importDefault(require("fs"));
exports.BAD_SQL_QUERY = "Bad SQL query";
exports.DB_UNREACHABLE = "Database is unreachable";
exports.MIGRATIONS_FOLDER_NOT_SET_CORRECTLY = "Migrations folder not set correctly";
exports.SQL_QUERY_CANNOT_BE_EMPTY = "SQL query cannot be empty";
class DbService {
    constructor(db, host, user, password, port) {
        this.db = db;
        this.host = host;
        this.user = user;
        this.password = password;
        this.port = port;
    }
    query(sqlQuery, params = []) {
        return __awaiter(this, void 0, void 0, function* () {
            if (sqlQuery.trim() === "") {
                throw new Error(exports.SQL_QUERY_CANNOT_BE_EMPTY);
            }
            let pgClient;
            pgClient = new pg_1.Client({
                database: this.db,
                host: this.host,
                port: this.port,
                user: this.user,
                password: this.password
            });
            try {
                yield pgClient.connect();
            }
            catch (error) {
                throw new Error(exports.DB_UNREACHABLE);
            }
            try {
                const res = yield pgClient.query(sqlQuery, params);
                yield pgClient.end();
                return res;
            }
            catch (error) {
                yield pgClient.end();
                throw new Error(exports.BAD_SQL_QUERY);
            }
        });
    }
    runMigrations(migrationsFolder) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!fs_1.default.existsSync(migrationsFolder)) {
                throw new Error(exports.MIGRATIONS_FOLDER_NOT_SET_CORRECTLY);
            }
            if (!fs_1.default.lstatSync(migrationsFolder).isDirectory()) {
                throw new Error(exports.MIGRATIONS_FOLDER_NOT_SET_CORRECTLY);
            }
            const migrations = [];
            fs_1.default.readdirSync(process.env.MIGRATIONS_FOLDER).forEach((fileName) => {
                const filePatternRegex = /^[0-9][0-9][0-9][1-9]\_[a-zA-Z0-9_-]+\.psql$/;
                if (filePatternRegex.test(fileName)) {
                    migrations.push(fileName);
                }
            });
            migrations.sort();
            yield this.query(`CREATE TABLE IF NOT EXISTS migrations(
            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL 
        );`);
            for (let i = 0; i < migrations.length; i++) {
                const migration = migrations[i];
                const migrationName = migration.split(".")[0];
                const migrationAlreadyRun = yield this.query(`SELECT * FROM migrations WHERE name = $1`, [migrationName]);
                if (migrationAlreadyRun.rowCount === 0) {
                    const migrationContent = fs_1.default.readFileSync(`${process.env.MIGRATIONS_FOLDER}/${migration}`, "utf-8");
                    yield this.query(migrationContent);
                    yield this.query(`INSERT INTO migrations(name) VALUES($1)`, [migrationName]);
                }
            }
            return migrations;
        });
    }
}
;
exports.default = DbService;
