import { DataCommunication } from "./DataCommunication";
import { DeepstreamClient } from "@deepstream/client";
export declare class DeepstreamDataCommunication extends DataCommunication {
    client: DeepstreamClient;
    record: Record<string, any>;
    callbackFunction: (json: JSON) => void;
    fieldName: string;
    /**
     *
    */
    constructor(path: string, recordName?: string, fieldName?: string);
    send(data: JSON): void;
    recive(): JSON;
    addCallbackFunction(fcb: (json: JSON) => void): void;
}
