import UsersService from "../../../src/services/domain/UsersService";

describe("UsersService", () => {
    
        describe("createUser", () => {
    
            it("should call the mailer service", () => {
                // arrange
                const mockMailer = {sendMail: jest.fn()};
                const usersService = new UsersService();
                usersService.mailer = mockMailer;
                // act
                usersService.createUser("me", "my_password");
                // assert
                expect(mockMailer.sendMail).toHaveBeenCalledWith("greetings from the UsersService");
            });
        });
});