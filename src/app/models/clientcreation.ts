export class clientCreationModel {
    clientId: String;
    clientName: String;
    personFirstName: String;
    personLastName: String;
    emailId: String;
    contactNumber: number;
    designation: String;
    addresses: addressIdModel[];
    constructor() {
        this.addresses = [];
    }

}

export class addressIdModel {
    line1: String;
    line2: String;
    city: String;
    state: String;
    country: String;
    landmark: String;
    zipCode: String;

}
export class tenant {
    tenantId: String;
}
