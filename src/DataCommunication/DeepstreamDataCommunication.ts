import { DeepstreamClient } from "@deepstream/client";
import { DataCommunication } from "./DataCommunication";

// DeepstreamDataCommunication.ts
export class DeepstreamDataCommunication extends DataCommunication {
    client: DeepstreamClient;
    record!: Record<string, any>;
    callbackFunction!: (json: JSON) => void;
    fieldName: string
    
    /**
     *
    */
   constructor(urlPath: string, recordName: string = 'some-name', fieldName: string = 'some-field') {
        super();
        this.client = new DeepstreamClient(urlPath) //'localhost:6020'
        this.client.login();
        this.fieldName = fieldName;
        console.log(urlPath + recordName);
        // Ensure the connection is established before trying to get the record
        this.client.on('connectionStateChanged', (connectionState: string) => {
            if (connectionState === 'OPEN') {
                this.record = this.client.record.getRecord(recordName);
            }
        });
    }
    override send(data: JSON): void {
        this.record.set(this.fieldName, data);
    }

    override recive(): JSON {
        // Is posible not needed.
        return {} as JSON; 
    }
    
    override addCallbackFunction(fcb: (json: JSON) => void): void {
        this.callbackFunction = fcb;
        this.record.subscribe(this.fieldName, this.callbackFunction);
    }
}