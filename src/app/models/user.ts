export class User {
    userId: any;
    emailId: any;
    password: any;
    confirmpassword : any;
    firstName: any;
    lastName: any;
    phoneNumber: any;
    googleId: any;
    facebookId: any;
    twitterId: any;
    additionalData: any;
    isLocked: any;
    isActive: any;
    isPwdExpired: any;
    status: any;
    resetToken: any;
    type: any;
    createdBy: any;
    modifiedBby: any;
    createdTime: any;
    modifiedTime: any;
    tenant: any;
    roles : any;
    cnfPassword:any
    address1:string
    address2:string
    country:string;
    state:string;
    city:string;
    zipCode:string;
    designation: string;

}

export class Refer
{
    userId: any;
    emailId: any;
    jobDescription: any;
    userName : any;
    tenantId : any;
}

export class OnlyTenant
{
    tenantId : any;
}
export class assign{
  hireRequestId : any;
  hireRequestIds: any;
  setOfUserIds : any;
}

export class hire{
  hireRequestId : any;
}