import MailerService from "../../../src/services/technical/MailerService";

describe("MailerService", () => {

    describe("sendMail", () => {

        it("should send an email", () => {
            // arrange
            const stdOutSpy = jest.spyOn(console, "info");
            // act
            const mailer = new MailerService();
            mailer.sendMail("hello world");
            // assert
            expect(stdOutSpy).toHaveBeenNthCalledWith(1, "MailerService");
            expect(stdOutSpy).toHaveBeenNthCalledWith(2, "Sending mail...");

        });
    });

});