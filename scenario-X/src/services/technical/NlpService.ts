import { Configuration, OpenAIApi } from "openai";

import BotResponse from "../domain/interfaces/BotResponse";

type ChatCompletionsRole = "assistant" | "system" | "user";

export interface ChatCompletionsMessage {
    content: string;
    role: ChatCompletionsRole;
}

const fallbackMessage = "I'm sorry, I'm unable to answer to you at the moment...";

class NlpService {

    private _openAIApi!: OpenAIApi;

    constructor() {
        require('dotenv').config();
        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        });
        this._openAIApi = new OpenAIApi(configuration);
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
    public async sendMultipleMessagesToGiveContextToTheAI(messages: ChatCompletionsMessage[]): Promise<string> {
        try {
            const chatCompletion = await this._openAIApi.createChatCompletion({
                model: process.env.OPENAI_MODEL as string,
                messages,
            });
            const answer = chatCompletion.data.choices[0].message?.content;
            return answer ? answer : fallbackMessage;
        } catch (error) {
            console.error((error as Error).message);
            return fallbackMessage;
        }
    };

    /**
     * 
     * validates a bot message
     * 
     * @param message the bot response to the user
     * @param schema a schema definition for determining the tone and the subject of what function the bot is supposed to perform
     * @returns {Promise<boolean>}
     */
    public async valideBotOutputBeforeSendingItToTheUser(message: string, schema: BotResponse): Promise<boolean> {
        const aiEvaluation = await this.sendMultipleMessagesToGiveContextToTheAI([
            {
                role: "system",
                content: "You are to answer only 'yes' or 'no' to all inputs.",
            },
            {
                role: "user",
                content: `Does the ${message} have a ${schema.expectedTone} tone ? Is is related to ${schema.subject} ?`,
            }
        ]);
        if (aiEvaluation.toLowerCase().trim().replace(/\./g, "") != "yes") {
            const reason = await this.sendMultipleMessagesToGiveContextToTheAI([
                {
                    role: "user",
                    content: `Does the ${message} have a ${schema.expectedTone} tone ? Is is related to ${schema.subject} ?`,
                }
            ]);
            console.log(`The AI has answered "${aiEvaluation}" and it thinks that the message "${message}" is not valid because: ${reason}`);
        }
        return aiEvaluation.toLowerCase().trim().replace(/\./g, "") == "yes";
    }

}

export default NlpService;