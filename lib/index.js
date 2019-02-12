"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stream_1 = require("stream");
require("util");
const util_1 = require("util");
function guid() {
    return "_" + Math.random().toString(36).substr(2, 9);
}
var MessageType;
(function (MessageType) {
    MessageType[MessageType["Global"] = 0] = "Global";
    MessageType[MessageType["Removed"] = 1] = "Removed";
    MessageType[MessageType["Engine"] = 2] = "Engine";
    MessageType[MessageType["IO"] = 3] = "IO";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
class Message {
    constructor(_data = "", _type = MessageType.Global, _single = false) {
        this._data = _data;
        this._type = _type;
        this._single = _single;
        this._uid = guid();
    }
    get uid() {
        return this._uid;
    }
    get type() {
        return this._type;
    }
    get single() {
        return this._single;
    }
    get data() {
        return this._data;
    }
    toString() {
        return JSON.stringify(this);
    }
}
exports.Message = Message;
class MessageSystem extends stream_1.Transform {
    constructor() {
        super({ highWaterMark: 100, readableObjectMode: true, writableObjectMode: true });
    }
    _transform(chunk, encoding, callback) {
        try {
            let output = chunk.toString();
            callback(undefined, output);
        }
        catch (err) {
            callback(err);
        }
    }
}
exports.MessageSystem = MessageSystem;
class SystemStream extends stream_1.Transform {
    constructor() {
        super({ highWaterMark: 100, readableObjectMode: true, writableObjectMode: true });
        this.type = MessageType.Global;
    }
    static fromJSON(chunk) {
        return JSON.parse(chunk);
    }
    static toJSON(chunk) {
        return JSON.stringify(chunk);
    }
    _transform(chunk, encoding, callback) {
        let message = SystemStream.fromJSON(chunk);
        if (message.single && (message.type === this.type || message.type === MessageType.Global)) {
            message = new Message(message.data, MessageType.Removed, true);
            callback(undefined, SystemStream.toJSON(message));
        }
        else {
            callback(undefined, chunk);
        }
    }
}
exports.SystemStream = SystemStream;
class EngineStream extends SystemStream {
    constructor() {
        super(...arguments);
        this.type = MessageType.Engine;
    }
}
exports.EngineStream = EngineStream;
class IOStream extends SystemStream {
    constructor() {
        super(...arguments);
        this.type = MessageType.IO;
    }
}
exports.IOStream = IOStream;
let ms = new MessageSystem();
let es = new EngineStream();
let io = new IOStream();
let pipeline = util_1.promisify(stream_1.Stream.pipeline);
async function start() {
    console.log("Running Message System");
    console.log("Writing new messages");
    console.log("Adding listeners");
    es.on("data", (data) => {
        console.log(`Engine stream recieved: ${data}`);
    });
    io.on("data", (data) => {
        console.log(`IO stream recieved: ${data}`);
    });
    ms.write(new Message("world!"));
    ms.write(new Message("Engine data", MessageType.Engine));
    ms.write(new Message("IO data", MessageType.IO));
    ms.write(new Message("Order matters in the pipe, even if Global", MessageType.Global, true));
    ms.end(new Message("Finished the messages", MessageType.Global));
    console.log("Piping data");
    // ms.pipe(es).pipe(io);
    pipeline(ms, es, io).catch((err) => {
        console.error(err);
    }).then(() => {
        console.log("Pipeline ran");
    });
}
start().then(() => {
    console.log("Finished");
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtQ0FBZ0Y7QUFDaEYsZ0JBQWM7QUFDZCwrQkFBaUM7QUFFakMsU0FBUyxJQUFJO0lBQ1QsT0FBTyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3pELENBQUM7QUFFRCxJQUFZLFdBS1g7QUFMRCxXQUFZLFdBQVc7SUFDbkIsaURBQU0sQ0FBQTtJQUNOLG1EQUFPLENBQUE7SUFDUCxpREFBTSxDQUFBO0lBQ04seUNBQUUsQ0FBQTtBQUNOLENBQUMsRUFMVyxXQUFXLEdBQVgsbUJBQVcsS0FBWCxtQkFBVyxRQUt0QjtBQUVELE1BQWEsT0FBTztJQUVoQixZQUNZLFFBQWdCLEVBQUUsRUFDbEIsUUFBcUIsV0FBVyxDQUFDLE1BQU0sRUFDdkMsVUFBbUIsS0FBSztRQUZ4QixVQUFLLEdBQUwsS0FBSyxDQUFhO1FBQ2xCLFVBQUssR0FBTCxLQUFLLENBQWtDO1FBQ3ZDLFlBQU8sR0FBUCxPQUFPLENBQWlCO1FBSjVCLFNBQUksR0FBVyxJQUFJLEVBQUUsQ0FBQztJQUlVLENBQUM7SUFDekMsSUFBVyxHQUFHO1FBQ1YsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFDRCxJQUFXLElBQUk7UUFDWCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDdEIsQ0FBQztJQUNELElBQVcsTUFBTTtRQUNiLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4QixDQUFDO0lBQ0QsSUFBVyxJQUFJO1FBQ1gsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUFDTSxRQUFRO1FBQ1gsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hD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