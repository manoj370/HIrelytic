import { resume } from '../models/resume';
import { JobPosting } from '../models/jobposting';
import { Tenant } from '../models/tenant';

export class JobReferences {
    
    referralId: any;

	additionalData: any;

	postionStatus: any;

	refereeId: any;

	referralFe: any;

	hireRequest: JobPosting;

	resume: resume;

    tenant: Tenant;
    
}
export interface RequrementDetails {
    
    createdBy: string;

	emailId: string;

	firstName: string;

	lastName: string;

	phoneNumber: string;
    
}

