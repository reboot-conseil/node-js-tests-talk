import MailerService from "../technical/MailerService";

class UsersService {

    public mailer!: MailerService;

    constructor() {
        this.mailer = new MailerService();
    }

    createUser(email: string, password: string): void {
        console.log("I am creating a user in the system");
        this.mailer.sendMail("greetings from the UsersService");
    }

}

export default UsersService;