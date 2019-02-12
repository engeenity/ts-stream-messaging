/// <reference types="node" />
import { Transform, TransformCallback } from "stream";
import "util";
export declare enum MessageType {
    Global = 0,
    Removed = 1,
    Engine = 2,
    IO = 3
}
export declare class Message {
    private _data;
    private _type;
    private _single;
    private _uid;
    constructor(_data?: string, _type?: MessageType, _single?: boolean);
    readonly uid: string;
    readonly type: MessageType;
    readonly single: boolean;
    readonly data: string;
    toString(): string;
}
export declare class MessageSystem extends Transform {
    constructor();
    _transform(chunk: Message, encoding: string, callback: TransformCallback): void;
}
export declare class SystemStream extends Transform {
    type: MessageType;
    constructor();
    static fromJSON(chunk: string): Message;
    static toJSON(chunk: Message): string;
    _transform(chunk: string, encoding: string, callback: TransformCallback): void;
}
export declare class EngineStream extends SystemStream {
    type: MessageType;
}
export declare class IOStream extends SystemStream {
    type: MessageType;
}
