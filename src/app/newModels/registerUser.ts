

export class RegisterUser {
    firstName:    string;
    lastName:     string;
    emailId:      string;
    phoneNumber:  string;
    passWord   :string;
    address:      Address;
    organization: Organization;
    constructor()
    {
        this.organization=new Organization();
        this.address=new Address();
    }
}

export class Address {
    line1:    string;
    line2:    string;
    city:     string;
    state:    string;
    country:  string;
    landmark: string;
    zipCode:  string;
}

export class Organization {
    tenantId: string;
}
