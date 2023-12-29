"use strict";
/// <reference types="@deepstream/client" />
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeepstreamDataCommunication = void 0;
const DataCommunication_1 = require("./DataCommunication");
const client_1 = require("@deepstream/client");
class DeepstreamDataCommunication extends DataCommunication_1.DataCommunication {
    /**
     *
    */
    constructor(path, recordName = 'some-name', fieldName = 'some-field') {
        super();
        this.client = new client_1.DeepstreamClient(path); //'localhost:6020'
        this.client.login();
        this.fieldName = fieldName;
        // Ensure the connection is established before trying to get the record
        this.client.on('connectionStateChanged', (connectionState) => {
            if (connectionState === 'OPEN') {
                this.record = this.client.record.getRecord(recordName);
            }
        });
    }
    send(data) {
        this.record.set(this.fieldName, data);
        // Implement your send logic here
    }
    recive() {
        // Is posible not needed.
        return {};
    }
    addCallbackFunction(fcb) {
        this.callbackFunction = fcb;
        this.record.subscribe(this.fieldName, this.callbackFunction);
    }
}
exports.DeepstreamDataCommunication = DeepstreamDataCommunication;
