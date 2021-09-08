// export class Candidate {

//   candidateId: string;
//   currentLocation: string;
//   preferredLocation: string;
//   currentCompany: string;
//   previousCompany: string;
//   designation: string;
//   currentCTC: string;
//   expectedCTC: string;
//   noticePeriod: string;
//   educationalQualification: string;
//   specialization: string;
//   panNumber: string;
//   source: string;
//   sourceType: string;
//   user: User;
//   experience: string;
//   skill: string;
//   referralCandidate: boolean;
//   constructor() {
//     this.user = new User();
//   }
// }
// export class User {
//   userId: string;
//   emailId: string;
//   password: string;
//   firstName: string;
//   lastName: string;
//   phoneNumber: string;
//   googleId: string;
//   facebookId: string;
//   twitterId: string;
//   additionalData: string;
//   status: boolean;
//   resetToken: string;
//   address1: string;
//   address2: string;
//   country: string;
//   city: string;
//   state: string;
//   pincode: string;
//   profilePicPath: string;
//   type: string;
//   createdBy: string;
//   modifiedBby: string;
//   createdTime: Date;
//   modifiedTime: string;
//   candidate: string;
//   aboutCompany: string;
//   tenant: Tenant;
//   panNumber: string;
//   // referralCandidate: boolean;
//   constructor() {
//     this.tenant = new Tenant();
//   }
// }
// export class Tenant {
//   tenantId: string;
// }





// Generated by https://quicktype.io

export class Candidate {
  currentLocation:          string;
  preferredLocation:        string;
  currentCompany:           string;
  previousCompany:          string;
  designation:              string;
  currentCTC:               string;
  expectedCTC:              string;
  noticePeriod:             string;
  educationalQualification: string;
  specialization:           string;
  panNumber:                string;
  source:                   string;
  sourceType:               string;
  user:                     User;
  experience:               string;
  skill:                    string;
  referralCandidate:        boolean;
  hireRequestId:string;
  constructor() {
        this.user = new User();
      }
}

export class User {
  userId:      string;
  firstName:   string;
  lastName:    string;
  emailId:     string;
  phoneNumber: string;
  panNumber:   string;
}
