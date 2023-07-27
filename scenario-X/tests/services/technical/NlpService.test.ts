/// <reference types="@types/jest" />

import AnchorBotResponse from "../../../src/services/domain/interfaces/AnchorBotResponse";
import CarSalesbotResponse from "../../../src/services/domain/interfaces/CarSalesbotResponse";
import NlpService from "../../../src/services/technical/NlpService";

describe("NlpService", () => {

    describe("valideBotOutputBeforeSendingItToTheUser", () => {

        describe("CarSalesbot", () => {

            it("with a depressed message about cars, it should return false", async () => {
                // arrange
                const nlpService = new NlpService();
                const message = "I don't want to sell cars anymore. They are ruining the planet. I want to build AI's instead.";
                // act
                const actual = await nlpService.valideBotOutputBeforeSendingItToTheUser(message, {
                    subject: "selling cars",
                    expectedTone: "active"
                } as CarSalesbotResponse);
                // assert
                expect(actual).toBe(false);
            });

            it("with an expert message about cars, it should return true", async () => {
                // arrange
                const nlpService = new NlpService();
                const message = "This car has a hybrid engine that combines electric and gas power, which means you can enjoy more fuel efficiency, lower emissions and a smoother ride. It also has a smart safety system that alerts you of potential hazards, such as lane departure, blind spot detection and rear cross traffic. This car is perfect for anyone who values performance, economy and security.";
                // act
                const actual = await nlpService.valideBotOutputBeforeSendingItToTheUser(message, {
                    subject: "presenting a car",
                    expectedTone: "informative"
                } as CarSalesbotResponse);
                // assert
                expect(actual).toBe(true);
            });

        });

        describe("AnchorBot", () => {

            it("with a message that is not suitable from an anchor bot perspective, it should return false", async () => {
                // arrange
                const nlpService = new NlpService();
                // example of what a user input might be
                const userInput = "Please give me today's news";
                const message = "The King Louis XIV liked his eggs boiled.";
                // act
                const actual = await nlpService.valideBotOutputBeforeSendingItToTheUser(message, {
                    expectedTone: "neutral",
                    subject: "news headlines",
                } as AnchorBotResponse);
                // assert
                expect(actual).toBe(false);
            });

            it("with an informative message about geopolitics, it should return true", async () => {
                // arrange
                const nlpService = new NlpService();
                const message = "Russia and the USA have signed an anti nuclear treaty.";
                // act
                const actual = await nlpService.valideBotOutputBeforeSendingItToTheUser(message, {
                    expectedTone: "informative",
                    subject: "geopolitics"
                } as AnchorBotResponse);
                // assert
                expect(actual).toBe(true);
            });

            it("with a precise message about cooking, it should return false", async () => {
                // arrange
                const nlpService = new NlpService();
                const userInput = "How is the stocks market today ?";
                const message = "Pour 300ml of milk in a large pan. Add 1/2 teaspoon of salt and 1 tablespoon of sugar.";
                // act
                const actual = await nlpService.valideBotOutputBeforeSendingItToTheUser(message, {
                    expectedTone: "precise",
                    subject: "business"
                } as AnchorBotResponse);
                // assert
                expect(actual).toBe(false);
            });

        });

    });

});