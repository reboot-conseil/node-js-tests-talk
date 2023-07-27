import BotResponse from "./BotResponse";

interface CarSalesbotResponse extends BotResponse {
    expectedTone: "active" | "adaptable" | "informative" | "curious";
    subject: "selling cars" | "purchasing cars" | "repairing cars" | "presenting a car" | "driving cars";
}

export default CarSalesbotResponse;