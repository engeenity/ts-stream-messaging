import { Duplex, Stream, Transform, TransformCallback, Writable } from "stream";
import "util";
import { promisify } from "util";

function guid(): string {
    return "_" + Math.random().toString(36).substr(2, 9);
}

export enum MessageType {
    Global,
    Removed,
    Engine,
    IO
}

export class Message {
    private _uid: string = guid();
    constructor(
        private _data: string = "",
        private _type: MessageType = MessageType.Global, 
        private _single: boolean = false) { }
    public get uid(): string {
        return this._uid;
    }
    public get type(): MessageType {
        return this._type;
    }
    public get single(): boolean {
        return this._single;
    }
    public get data(): string {
        return this._data;
    }
    public toString(): string {
        return JSON.stringify(this);
    }
}

export class MessageSystem extends Transform {
    constructor() {
        super({highWaterMark: 100, readableObjectMode: true, writableObjectMode: true});
    }
    public _transform(chunk: Message, encoding: string,
        callback: TransformCallback): void {
            try {
                let output: string = chunk.toString();
                callback(undefined, output);
            } catch (err) {
                callback(err);
            }
        }
}

export class SystemStream extends Transform {
    public type: MessageType = MessageType.Global;
    constructor() {
        super({highWaterMark: 100, readableObjectMode: true, writableObjectMode: true});
    }
    public static fromJSON(chunk: string): Message {
        return JSON.parse(chunk);
    }
    public static toJSON(chunk: Message): string {
        return JSON.stringify(chunk);
    }
    public _transform(chunk: string, encoding: string, 
        callback: TransformCallback): void {
        let message: Message = SystemStream.fromJSON(chunk);
        if (message.single && (message.type === this.type || message.type === MessageType.Global)) {
            message = new Message(message.data, MessageType.Removed, true);
            callback(undefined, SystemStream.toJSON(message));
        } else {
            callback(undefined, chunk);
        }
    }
}

export class EngineStream extends SystemStream {
    public type: MessageType = MessageType.Engine;
}

export class IOStream extends SystemStream {
    public type: MessageType = MessageType.IO;
}

let ms = new MessageSystem();
let es = new EngineStream();
let io = new IOStream();

let pipeline = promisify(Stream.pipeline);

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
    pipeline(
        ms,
        es,
        io
    ).catch((err) => {
        console.error(err);
    }).then(() => {
        console.log("Pipeline ran");
    });
}

start().then(() => {
    console.log("Finished");
});