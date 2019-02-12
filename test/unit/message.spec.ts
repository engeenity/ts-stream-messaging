import {expect} from "chai";
import { Message, MessageType } from "../../src";

describe("Message unit testing", () => {
    describe("Empty message", () => {
        var message: Message;
        before(() => {
            message = new Message();
        });
        it("should be able to be created empty", () => {
            expect(message.uid).to.not.be.false;
        });
        it("should have a default type Global", () => {
            expect(message.type).to.equal(MessageType.Global);
        });
        it("should have single set to false to allow all recievers to recieve the message", () => {
            expect(message.single).to.be.false;
        });
        it("should have no data to start with", () => {
            expect(message.data).to.be.empty;
        });
    });
    describe("Filled message", () => {
        it("should allow data to be set", () => {
            var message = new Message("Hello world!");
            expect(message.data).to.equal("Hello world!");
        });
        it("should allow the user to set the type to Enigne (or any of the message types)", () => {
            var message = new Message("", MessageType.Engine);
            expect(message.type).to.equal(MessageType.Engine);
            message = new Message("", MessageType.IO);
            expect(message.type).to.equal(MessageType.IO);
        });
        it("should allow the user to set the visibility of the message from single to false", () => {
            var message = new Message("", MessageType.Engine, false);
            expect(message.single).to.be.false;
        });
    });
});