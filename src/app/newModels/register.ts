import { array } from "@amcharts/amcharts4/core";


export class RegisterFormModel {
    orgName:             string;
    gstNumber:           string;
    organizationAddress: OrganizationAddress;
    emailId:             string;
    password:            string;
    phone:               string;
    url:                 string;
    aboutCompany:        string;
    baseUrl:             string;
    applicationModule:  any;
    constructor()
    {
        this.organizationAddress=new OrganizationAddress();
    }
        
}

export class OrganizationAddress {
    line1:     string;
    city:      string;
    state:     string;
    country:   string;
    landmark:  string;
    zipCode:   string;
    public isPrimary:boolean=true;
}
