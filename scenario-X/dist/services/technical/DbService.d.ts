import { QueryResult } from 'pg';
export declare const BAD_SQL_QUERY = "Bad SQL query";
export declare const DB_UNREACHABLE = "Database is unreachable";
export declare const MIGRATIONS_FOLDER_NOT_SET_CORRECTLY = "Migrations folder not set correctly";
export declare const SQL_QUERY_CANNOT_BE_EMPTY = "SQL query cannot be empty";
declare class DbService {
    private db;
    private host;
    private user;
    private password;
    private port;
    constructor(db: string, host: string, user: string, password: string, port: number);
    query(sqlQuery: string, params?: string[]): Promise<QueryResult<any>>;
    runMigrations(migrationsFolder: string): Promise<string[]>;
}
export default DbService;
