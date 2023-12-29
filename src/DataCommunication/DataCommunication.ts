import { IDataCommunication } from "./IDataCommunication";

export abstract class DataCommunication implements IDataCommunication {
    abstract send(data: JSON): void;

    abstract recive(): JSON;

    abstract addCallbackFunction(fcb: (json: JSON) => void): void;
}