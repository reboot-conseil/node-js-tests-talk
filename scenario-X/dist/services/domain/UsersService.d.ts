import MailerService from "../technical/MailerService";
declare class UsersService {
    mailer: MailerService;
    constructor();
    createUser(email: string, password: string): void;
}
export default UsersService;
