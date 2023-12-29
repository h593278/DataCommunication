export interface IDataCommunication {
    send(data: JSON): void;
    recive(): JSON;
    addCallbackFunction(fcb: (json: JSON) => void): void;
}
