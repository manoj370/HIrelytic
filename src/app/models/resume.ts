import {User} from '../models/user';

export class resume {
    resumeId: any;
    user: any;
    user1:User;
    resumePath: any;
    // resumeData: any;
    organization: any;
    createdBy: any;
    createdDate: any;
    lastModifiedBy: any;
    lastModifiedDate: any;
    candidate : any;
    //uploadedBy:any;
}

export class ReferJob
{
    referralId : any;
    additionalData : any;
    postionStatus : any;
    refereeId : any;
    referralFee :any;
    hireRequest : any;
    tenant: any;
    resume: any;
   
    

}
export class hireRequest
{
    hirerequestId:String;
}
export class File
{
    file : any;
    obj : any;
}