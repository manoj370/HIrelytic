

export class createManager {
    clientContactsId:         string;
    clientCoOrdinatorEmailId: string;
    clientCoOrdinatorPhoneNo: string;
    coOrdinatorFirstName:     string;
    coOrdinatorLastName:      string;
    client:                   Client;
    organization:             Organization;
    constructor()
    {
        this.client=new Client();
        this.organization=new Organization();
    }
}

export class Client {
    clientId: string;
}

export class Organization {
    tenantId: string;
}
