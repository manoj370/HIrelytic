export class vendor{
    vendorName: string;
   
    gsTNumber: string;
    tanNumber: string;
    emailId: string;
    address1: string;
    address2:string;
    contactPerson:string;
    bankAccountNumber: string;
    ifscCode: string;
    bankBranchDetails: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    alternateNumber:string;
    state: string;
    pincode: string;
    password:string;
    cnfPassword: string;
    createdBy:string;
    country:String;
    city:string;
    public user: User;
    
    constructor(){
             this.user= new User();
    }

   
}
export class User{
   
  userId: any;
}



	