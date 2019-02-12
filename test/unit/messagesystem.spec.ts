import { expect } from "chai";
import { Message, MessageSystem } from "../../src/index";

describe("Message system unit testing", () => {
    var messageSystem: MessageSystem;
    beforeEach(() => {
        messageSystem = new MessageSystem();
    });
    afterEach(() => {
        messageSystem.push(null);
    });
    it("should take a message as input and pipe it process.stdout", async () => {
        let m: Message = new Message("Hello world!");
        messageSystem.write(m);
        messageSystem.pipe(process.stdout); // printing here
        process.stdout.on("data", (data) => {
            expect(data).to.equal(m); // uid must be the same
        });
    });
    it("should take a maximum of 100 messages, but still parse all messages", async () => {
        for (var i = 0; i < 102; i++) {
            messageSystem.write(new Message(i.toString()));
        }
        messageSystem.pipe(process.stdout); // printing here
        process.stdout.on("data", (data) => {
            expect((data as Message).data).to.be("number");
        });
    });
});