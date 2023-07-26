"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MailerService_1 = __importDefault(require("../technical/MailerService"));
class UsersService {
    constructor() {
        this.mailer = new MailerService_1.default();
    }
    createUser(email, password) {
        console.log("I am creating a user in the system");
        this.mailer.sendMail("greetings from the UsersService");
    }
}
exports.default = UsersService;
