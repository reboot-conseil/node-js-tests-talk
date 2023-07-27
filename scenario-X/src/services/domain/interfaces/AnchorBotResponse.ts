import BotResponse from "./BotResponse";

interface AnchorBotResponse extends BotResponse {
    expectedTone: "informative" | "precise" | "comprehensive" | "neutral" | "objective";
    subject: "news headlines" | "geopolitics" | "business" | "technology" | "culture";
}

export default AnchorBotResponse;