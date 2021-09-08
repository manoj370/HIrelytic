import { HttpUrls } from './../shared/HttpUrls';
import { Tenant, Tenantlogin } from '../models/tenant';
import { TenantFormList } from '../models/tenantform';
import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { JobPosting } from '../models/jobposting';
import { JobReferences } from '../models/jobreferences';
import 'rxjs/add/operator/map';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/share';
import 'rxjs/Rx';
//import { credentials } from '../app.config'
import { environment } from '../../environments/environment';
import { TenantDetails } from '../models/tenantroles';
import { IfStmt } from '@angular/compiler';

import { DataclientService } from './dataclient.service';
import { hireRequest } from '../models/resume';

@Injectable()
export class TenantService {
  token: any;
  headers: Headers;
  options: RequestOptions;
  _baseUrl: any;
  _loginUrl: any;
  _registerUrl: any;
  _viewResumeUrl: any;
  _viewFullResumeUrl: any;
  _JobreferenceUrl: any;
  jobReferencesList: JobReferences;
  userRole: any;
  getPrivilegesAsJson: any = [];
  getAllPrivileges: any = [];
  updateCandidateResume: any;
  tempData: any;
  tempDataa: any;
  privileges: any;
  authority: any;
  manageresumes: boolean;
  viewallresumes: boolean;
  vendorresumes: boolean;
  referralJobs: boolean;
  referralResumes: boolean;

  constructor(private _http: Http, @Inject(Window) private _window: Window, private dataClient: DataclientService) {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
    // this._JobreferenceUrl = `http://${this._window.location.hostname}`+environment._jpbaseProdUrl;
  }
  createAuthorizationHeader(headers: Headers) {
    headers.append('Authorization', 'Basic ' +
      sessionStorage.getItem('access-token'));
  }
  private handleError(error: Response) {
    //console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
  private extractData(res: Response) {
    let body = res.json();
    // return just the response, or an empty array if there's no data
    return body || [];
  }
  updateTenantProfile(data) {

    return this.dataClient.update(HttpUrls.UPDATE_TENENT_PROFILE, data);

  }
  updateProfile(data) {

    return this.dataClient.update(HttpUrls.UPDATE_PROFILE, data);

  }
  updateUserProfilePic(userId: any, file: any) {
    var formdata: FormData = new FormData();
    formdata.append('file', file);
    formdata.append('userId', userId);
    return this.dataClient.post(HttpUrls.UPDATE_USER_PROFILE_PIC, formdata);

  }
  updateTenanatProfilePic(tenantId: any, file: any) {
    var formdata: FormData = new FormData();
    formdata.append('file', file);
    formdata.append('userId', sessionStorage.getItem('userId'));
    return this.dataClient.post<any>(HttpUrls.UPDATE_TENANT_PROFILE_PIC, formdata);

  }

  updateTenantLogo(tenantId: any, file: any) {
    var formdata: FormData = new FormData();
    formdata.append('file', file);
    formdata.append('tenantId', sessionStorage.getItem('tenantId'));
    return this.dataClient.post<any>(HttpUrls.ADD_TENANT_LOGO, formdata);
  }

  // To GET PROFILE PIC
  getUserProfilePic(imgPath: string) {

    return this.dataClient.get<any>(HttpUrls.GET_PROFILE_PIC + '?path=' + imgPath);
  }
  T//o GET LOGO
  getTenantLogo(imgPath: string) {
    return this.dataClient.get<any>(HttpUrls.GET_TENANT_LOGO + '?path=' + imgPath);
  }
  // // TO GET ALL TENANTS
  getAllTenants() {
    return this.dataClient.get(HttpUrls.GET_TENANT_LIST);
  }
  // //TO GET ALL UNREGISTERED TENANTS
  getAllUnregisteredTenants() {
    return this.dataClient.get(HttpUrls.GET_UNREGISTERED_TENANTS_LIST);
  }
  // // TO CHANGE TENANT STATUS
  changeStatus(tenantId: any, status: any, obj) {
    return this.dataClient.update(HttpUrls.CHANGE_TENANT_STATUS + '?tenantId=' + tenantId + '&status=' + status, obj);
  }
  // //To Get Super Admin Organsiations Status Counts
  getTenantStatusCount() {
    return this.dataClient.get(HttpUrls.GET_TENANTS_STATUS_COUNT);
  }
  resumeParisng(file: any) {
    var formdata: FormData = new FormData();
    formdata.append('file', file);
    console.log(formdata)
    return this.dataClient.post(HttpUrls.RESUME_PARSING, formdata);
  }
  public setData(inputData) {
    this.tempData = inputData;
  }
  public getData() {
    return this.tempData;
  }
  private data;

  setManagerData(data) {
    this.data = data;
  }
  getManagerData() {
    let temp = this.data;
    return temp;
  }
  // New Methods
  // For Getting the details of client
  getClientById(clientId: any) {
    debugger
    return this.dataClient.get(HttpUrls.GET_DETAILS_CLIENT_ID + '?clientId=' + clientId);
  }
  // Updating the Client
  updateClient(formdata: any) {
    debugger
    return this.dataClient.update(HttpUrls.EDIT_CLIENT, formdata);
  }

  // TO CHECK WHETHER CLIENT NAME EXISTS OR NOT

  checkClientName(clientName, tenantId): Observable<any> {
    return this.dataClient.get(HttpUrls.CHECK_CLIENT_NAME + clientName + '&tenantId=' + tenantId);
  }
  // Add Manager api
  postManager(createObj) {
    return this.dataClient.post(HttpUrls.CREATE_MANAGER, createObj);
  }
  // Changing Client
  updateClientStatus(clientId: any, status: any, obj) {
    return this.dataClient.update(HttpUrls.CHANGE_STATUS_CLIENT + '?clientId=' + clientId + '&status=' + status, obj);
  }
  // gET List Of Users
  getAllUsers(tenantId) {
    return this.dataClient.get(HttpUrls.GETALLUSERS + '?tenantId=' + tenantId);
  }
  // Assign Client To User
  assignClientToUser(assignObj): any {

    return this.dataClient.post(HttpUrls.ASSIGNClIENTTOUSER, assignObj);
  }
  // Change Password
  changeUserPassword(data) {
    return this.dataClient.post(HttpUrls.CHANGE_PASSWORD, data);
  }
  //TO GET UNASSIGNED JOBS

  UnassignedJobsToRecruiters(data) {
    return this.dataClient.post(HttpUrls.UNASSIGNED_JOB, data);
  }
  // UNASSIGN VENDORS
  UnassignedJobsToVendors(data) {
    return this.dataClient.post(HttpUrls.UN_ASSIGN_VENDOR, data);
  }
  // TO GET ALL THE QUALIFICATIONS
  getQualifications() {
    return this.dataClient.get(HttpUrls.GET_ALL_QUALIFICATIONS);
  }

  //TO GET SPECIALIZATIONS
  getSpecializationsList(qualificationId) {
    return this.dataClient.get<any>(HttpUrls.GET_ALL_SPECIALIZATIONS + '?qualificationId=' + qualificationId);
  }

  viewresume(hireRequestId, pageid, rowid, userId?: any) {

    let privileges = JSON.parse(sessionStorage.getItem('Privileges'))
    privileges.forEach(element => {
      this.privileges = element.authorities;
      console.log(this.privileges, 'authorities');
      this.privileges.forEach(element => {
        this.authority = element.authorityName;
        console.log(this.authority, 'authoirithyName');
        debugger
        if ((this.authority == "JOBS ASSIGNED")) {
          this.manageresumes = true;
        }
        if (this.authority == "VIEW ALL RESUMES") {
          this.viewallresumes = true;
        }
        if (this.authority == "VENDOR JOBS") {
          this.vendorresumes = true;
        }
        if (this.authority == "REFERRAL JOBS") {
          this.referralResumes = true;
        }

      });
    });
    debugger
    if (sessionStorage.getItem('userRoles') === 'ADMIN') {
      return this.dataClient.get(HttpUrls.VIEW_RESUME + '/' + hireRequestId
        + '?page=' + pageid + '&rows=' + rowid);
    }
    else if (this.manageresumes) {
      return this.dataClient.get(HttpUrls.VIEW_RESUME + '/' + hireRequestId + '/' + sessionStorage.getItem('userId')
        + '?page=' + pageid + '&rows=' + rowid);
      ;
    }
    else if (this.viewallresumes && sessionStorage.getItem('userRoles') == 'Account Manager') {
      return this.dataClient.get(HttpUrls.VIEW_RESUME + '/' + hireRequestId + '?page=' + pageid + '&rows=' + rowid);
      ;
    }
    else if (this.vendorresumes && sessionStorage.getItem('userRoles') === 'VENDOR') {
      return this.dataClient.get(HttpUrls.VENDOR_VIEW_RESUMES + '?hireRequestId=' + hireRequestId + '&userId=' +
        sessionStorage.getItem('userId') + '&page=' + pageid + '&rows=' + rowid);
    }
    else if (this.referralResumes && sessionStorage.getItem('userRoles') === 'EMPLOYEE') {
      return this.dataClient.get(HttpUrls.VIEW_REFERRAL_RESUMES + '?hireRequestId=' + hireRequestId + '&userId=' +
        sessionStorage.getItem('userId') + '&page=' + pageid + '&rows=' + rowid);
    }

    // else {
    //   return this._http.get(HttpUrls.VIEW_RESUME + '/' + hireRequestId + '/' + sessionStorage.getItem('userId') + '?page=' + pageid + '&rows=' + rowid, options)
    //     .map((response: Response) => <any>response.json()).catch(this.handleError);
    // }

  }
  viewfullresume(resumePath: any, fileName: any) {

    return this.dataClient.get(HttpUrls.VIEW_FULL_RESUME + '?path=' + resumePath + '&fileName=' + fileName);

  }
  viewFormattedResume(resumePath: any, fileName: any) {

    return this.dataClient.get(HttpUrls.VIEW_FORMATTED_RESUME + '?path=' + resumePath + '&fileName=' + fileName);

  }
  ondownload(resumePath: any, fileName: any) {
    return this.dataClient.get(HttpUrls.DOWNLOAD_RESUME + '?path=' + resumePath + '/' + fileName);
  }
  updateResumes(resumeObj) {

    return this.dataClient.update(HttpUrls.UPDATE_CANDIDATE_RESUME, resumeObj)
  }


  // TO GET ALL STATUS FOR RESUME

  getAllStatus() {
    return this.dataClient.get(HttpUrls.GET_ALL_STATUS + '?tenantId=' + sessionStorage.getItem('tenantId'));
  }

  getAllStatusCandidate(candidateId) {
    return this.dataClient.get(HttpUrls.GET_ALL_CANDIDATE_STATUS + '?candidateId=' + candidateId);
  }
  reInstateStatus() {
    return this.dataClient.get(HttpUrls.RE_INSTATE_STATUS);
  }
  // Create Status

  CreateStatus(data) {
    debugger
    return this.dataClient.post(HttpUrls.CREATE_STATUS, data);
  }

  logOutApplication(formdata) {
    console.log(formdata)
    debugger
    return this._http.post(HttpUrls.LOGOUT_APPLICATION, formdata);

  }

  // Search Resume View
  SearchResumeView(resumeId) {
    return this.dataClient.get(HttpUrls.SEARCH_RESUME_VIEW + resumeId);
  }

  // Find Organisation By Url
  public checkUrl(organizationURL): any {
    return this.dataClient.get<any>(HttpUrls.FIND_ORGANISATION_BY_URL + '?organizationURL=' + organizationURL);
  }

  // VENDOR RESUMES
  vendorResumes(hireRequestId, pageid, rowid) {
    return this.dataClient.get(HttpUrls.VENDOR_RESUMES + '?hireRequestId=' + hireRequestId + '&page=' + pageid + '&rows=' + rowid);
  }
  // Get Resume Settings
  getResumeSettings() {
    return this.dataClient.get(HttpUrls.GET_RESUME_SETTINGS);
  }
  // Resume Settings
  resumeConfigurationSettings(formdata) {
    return this.dataClient.update(HttpUrls.UPDATE_RESUME_SETTINGS_CONFIGURAITON, formdata);
  }
getAllRefferalList(hireRequestId, pageid, rowid){
  return this.dataClient.get(HttpUrls.getRefferalResumesList + '?hireRequestId=' + hireRequestId + '&page=' + pageid + '&rows=' + rowid);


}

sendInvi(data:any){
 
  return this.dataClient.post(HttpUrls.candidateInvite, data);
}
}

