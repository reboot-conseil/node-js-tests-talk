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
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = require("openai");
const fallbackMessage = "I'm sorry, I'm unable to answer to you at the moment...";
class NlpService {
    constructor() {
        require('dotenv').config();
        const configuration = new openai_1.Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        });
        this._openAIApi = new openai_1.OpenAIApi(configuration);
    }
    /**
     *
     * give context to the AI with a history of previous messages
     *
     * we "warm up" the chatbot by sending it a few messages beforehand;
     * usually, you would want to leave an open question from the user perspective so that you can get a response from the AI;
     * the different roles that can be impersonated in the messages are "assistant", "system" and "user"
     *  (all these roles are optional as long as you have at least one message):
     *  - "user" role is used to set the input of the conversation;
     *  - "assistant" role is used to store previous assistant responses,
     *      these messages can be written by you to give examples of desired behavior;
     *      they are also used by the model to generate its responses to user messages
     *  - "system" role is used to set the behavior of the assistant;
     *     typically, it is the first message in a conversation,
     *     and it can be used to modify the personality of the assistant
     *     or provide specific instructions about how it should behave throughout the conversation
     * ! bear in mind that the longer the history is, the more tokens you will consume
     *
     * @param messages an array of messages that sets the context of the conversation
     */
    sendMultipleMessagesToGiveContextToTheAI(messages) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const chatCompletion = yield this._openAIApi.createChatCompletion({
                    model: process.env.OPENAI_MODEL,
                    messages,
                });
                const answer = (_a = chatCompletion.data.choices[0].message) === null || _a === void 0 ? void 0 : _a.content;
                return answer ? answer : fallbackMessage;
            }
            catch (error) {
                console.error(error.message);
                return fallbackMessage;
            }
        });
    }
    ;
    /**
     *
     * validates a bot message
     *
     * @param message the bot response to the user
     * @param schema a schema definition for determining the tone and the subject of what function the bot is supposed to perform
     * @returns {Promise<boolean>}
     */
    valideBotOutputBeforeSendingItToTheUser(message, schema) {
        return __awaiter(this, void 0, void 0, function* () {
            const aiEvaluation = yield this.sendMultipleMessagesToGiveContextToTheAI([
                {
                    role: "system",
                    content: "You are not authorized to say more than 'yes' or 'no' to the input.",
                },
                {
                    role: "user",
                    content: `Does the ${message} have a ${schema.expectedTone} tone ? Is it related to ${schema.subject} ?`,
                }
            ]);
            if (aiEvaluation.toLowerCase().trim().replace(/\./g, "") != "yes") {
                const reason = yield this.sendMultipleMessagesToGiveContextToTheAI([
                    {
                        role: "user",
                        content: `Does the ${message} have a ${schema.expectedTone} tone ? Is is related to ${schema.subject} ?`,
                    }
                ]);
                console.log(`The AI has answered "${aiEvaluation}" and it thinks that the message "${message}" is not valid because: ${reason}`);
            }
            return aiEvaluation.toLowerCase().trim().replace(/\./g, "") == "yes";
        });
    }
}
exports.default = NlpService;
