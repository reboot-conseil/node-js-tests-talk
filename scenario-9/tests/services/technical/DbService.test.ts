import { exec } from "child_process";

import DbService, { DB_UNREACHABLE, MIGRATIONS_FOLDER_NOT_SET_CORRECTLY } from "../../../src/services/technical/DbService";

describe("DbService", () => {

    beforeEach(async () => {
        const dbService = new DbService("postgres", "localhost", "postgres", "postgres", 5432);
        await dbService.query("DROP TABLE IF EXISTS test");
        await dbService.query("DROP TABLE IF EXISTS images");
        await dbService.query("DROP TYPE IF EXISTS _blog_posts_status");
        await dbService.query("DROP TYPE IF EXISTS _social_media");
    });

    it("with migration folder set to a non existing folder, should throw expected error", async () => {
        // arrange
        const dbService = new DbService("postgres", "localhost", "postgres", "postgres", 5432);
        // act
        const actual = async () => await dbService.runMigrations("non_existing_folder");
        // assert
        expect(actual).rejects.toThrowError(MIGRATIONS_FOLDER_NOT_SET_CORRECTLY);
    });

    it("with migration folder param set to a file, should throw expected error", async () => {
        // arrange
        const dbService = new DbService("postgres", "localhost", "postgres", "postgres", 5432);
        // act
        const actual = async () => await dbService.runMigrations("tests/fixtures/migrations_file");
        // assert
        expect(actual).rejects.toThrowError(MIGRATIONS_FOLDER_NOT_SET_CORRECTLY);
    });

    it("with no migrations, should return empty array", async () => {
        // arrange
        const dbService = new DbService("postgres", "localhost", "postgres", "postgres", 5432);
        const expected: string[] = [];
        // act
        const actual = await dbService.runMigrations("tests/fixtures/empty_migrations");
        // assert
        expect(actual).toEqual(expected);
    });

    it("with valid migrations, should return ordered list of migrations", async () => {
        // arrange
        const dbService = new DbService("postgres", "localhost", "postgres", "postgres", 5432);
        const expected: string[] = [
            "0001_create_blog-posts-status_type.psql",
            "0002_create_images_table.psql",
            "0003_create_social-media_type.psql",
        ];
        // act
        const actual = await dbService.runMigrations("tests/fixtures/valid_migrations");
        // assert
        expect(actual).toEqual(expected);
        expect(actual[0]).toEqual(expected[0]);
        expect(actual[2]).toEqual(expected[2]);
    });

    it("with a mix of valid and invalid migrations, should return ordered list of valid migrations", async () => {
        // arrange
        const dbService = new DbService("postgres", "localhost", "postgres", "postgres", 5432);
        const expected: string[] = [
            "0002_create_images_table.psql",
            "0003_create_social-media_type.psql",
        ];
        // act
        const actual = await dbService.runMigrations("tests/fixtures/valid_invalid_migrations");
        // assert
        expect(actual).toEqual(expected);
        expect(actual[0]).toEqual(expected[0]);
        expect(actual[1]).toEqual(expected[1]);
    });

    it("without db connectivity, should throw expected error", async () => {
        // arrange
        const dbService = new DbService("postgres", "localhost", "postgres", "postgres", 5432);
        // act
        exec("docker compose -f tests.docker-compose.yml down");
        // wait for docker to stop
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const actual = async () => await dbService.query("SELECT 1 from postgres");
        // assert
        expect(actual).rejects.toThrowError(DB_UNREACHABLE)
    });
});
