import { generateJwt, verifyJwt } from "../src/index";

describe("generateJwt", () => {

    beforeEach(() => {
        process.env.JWT_SECRET = "secret";
    });

    afterAll(() => {
        delete process.env.JWT_SECRET;
    });

    it("should return a valid JWT", () => {
        // arrange
        const JWTRegex = new RegExp("^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$");
        // act
        const actual = generateJwt(new Date(), 1);
        // assert
        expect(JWTRegex.test(actual)).toBe(true);
    });

    it("without a secret set, it should throw the expected error", () => {
        // arrange
        delete process.env.JWT_SECRET;
        // act
        const actual = () => generateJwt(new Date(), 1);
        // assert
        expect(actual).toThrowError("secretOrPrivateKey must have a value");
    });

});

describe("verifyJwt", () => {

    beforeEach(() => {
        process.env.JWT_SECRET = "secret";
    });

    afterAll(() => {
        delete process.env.JWT_SECRET;
    });

    it("should resolve to the expected token is valid", async () => {
        // arrange
        const someDate = new Date();
        const token = generateJwt(someDate, 1);
        // act
        const actual = await verifyJwt(token);
        // assert
        expect(actual).toMatchObject({
            exp: Math.floor(someDate.getTime() / 1000) + (60 * 60),
            userId: 1
        });
    });

    it("without a secret set, it should throw the expected error", () => {
        // arrange
        const token = generateJwt(new Date(), 1);
        delete process.env.JWT_SECRET;
        // act
        const actual = async () => await verifyJwt(token);
        // assert
        expect(actual).rejects.toThrowError("secretOrPrivateKey must have a value");
    });
});