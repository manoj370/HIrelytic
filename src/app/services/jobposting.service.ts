import { Injectable } from '@angular/core';
import { ReferJob } from '../models/resume';
//import { HttpClient } from '@angular/common/http';
import { JobPosting, FunctionalArea, Department } from '../models/jobposting';
import { hire } from '../models/user';
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/share';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { HttpUrls } from '../shared/HttpUrls';
import { IfStmt } from '@angular/compiler';

import { DataclientService } from './dataclient.service';
@Injectable()
export class JobPostingService {
  headers: Headers;
  options: RequestOptions;
  _baseUrl: any;
  _baseProdUrl: any;
  private getAllPriv: any = [];
  userPrivilege: any;
  viewAll: boolean;
  rowData: any;
  _http: any;
  tempData: any;
  privileges: any;
  authority: any;
  managejobs: boolean;
  jobsbyme: boolean;
  vendorjobs: boolean;
  constructor(private http: Http, @Inject(Window) private _window: Window, private dataClient: DataclientService) {
    this.headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    this.options = new RequestOptions({ headers: this.headers });

  }



  private handleError(error: Response) {
    //console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

  // FUNCTION TO UPDATE CANDIDATE RESUME
  updateCandidateResume(candidateData: any) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    const options = new RequestOptions({ headers: headers });
    return this.http.post(HttpUrls.UPDATE_CANDIDATE_RESUME, candidateData, options).map((response: Response) => <any>response.text());;

  }

  // Get Vendor Names
  getAllVendors(tenantId) {
    return this.dataClient.get(HttpUrls.GET_VENDORS_LIST + '?tenantId=' + tenantId);
  }
  // To publish all vendors
  publishJobToVendor(publishJobObject) {
    return this.dataClient.post(HttpUrls.PUBLISH_JOB, publishJobObject);
  }
  public setManagerData(inputData) {
    this.tempData = inputData;
  }
  public getManagerData() {
    return this.tempData;
  }

  // New Methods
  // GetClientnames
  getClients(tenantId) {
    debugger
    return this.dataClient.get(HttpUrls.GET_CLIENTSS + '?tenantId=' + tenantId);
  }

  //  Get Managers List
  getListOfManagers(clientId) {
    debugger
    return this.dataClient.get(HttpUrls.GET_MANAGER_LIST + '?clientId=' + clientId);
  }

  //to get job code
  //to get job code
  getJobCode(tenantId): any {

    return this.dataClient.get(HttpUrls.GET_NEXT_JOB_CODE + '/' + tenantId);

  }
  // Post Job
  addJob(obj) {
    debugger
    return this.dataClient.post(HttpUrls.ADD_JOB, obj);

  }
  // Get List Of Jobs
  getJobList(id, pageid, rowid: any) {
    debugger
    let privileges = JSON.parse(sessionStorage.getItem('Privileges'))
    privileges.forEach(element => {
      this.privileges = element.authorities;
      console.log(this.privileges, 'authorities');
      this.privileges.forEach(element => {
        this.authority = element.authorityName;
        console.log(this.authority, 'authoirithyName');
        if (this.authority === 'JOBS ASSIGNED') {
          this.managejobs = true;
        }
        if (this.authority === 'JOBS POSTED BY ME') {
          this.jobsbyme = true;
        }
        if (this.authority === 'VENDOR JOBS') {
          this.vendorjobs = true;
        }


      });
    });
    debugger
    if (this.managejobs && sessionStorage.getItem('userRoles') == 'Recruiter') {

      return this.dataClient.get(HttpUrls.GET_JOB_LIST_RECRUITER + '/' + sessionStorage.getItem('userId') + '?page=' + pageid + '&rows=' + rowid);
    }
    else if (this.jobsbyme && sessionStorage.getItem('userRoles') == 'Account Manager') {
      var Ids = sessionStorage.getItem('tenantId');
      return this.dataClient.get(HttpUrls.GET_JOB_LIST_ACCOUNTMANAGER + '?page=' + pageid + '&rows=' + rowid);
    }
    else if (this.vendorjobs) {

      return this.dataClient.get(HttpUrls.VENDOR_JOBS + '?tenantId=' + sessionStorage.getItem('tenantId') + '&page=' + pageid + '&rows=' + rowid);
    }
    else if (sessionStorage.getItem('userRoles').includes('Manager')) {
      var Ids = sessionStorage.getItem('userId');
      return this.http.get(HttpUrls.GET_JOB_LIST_RECRUITER + '/'

        + Ids + '?page=' + pageid + '&rows=' + rowid).map((response: Response) => <any>response.json());
    }

    else {
      var ids = sessionStorage.getItem('tenantId');
      return this.dataClient.get(HttpUrls.GET_JOB_LIST_OTHERS + '/' + ids + '?page=' + pageid + '&rows=' + rowid);
    }
  }

  // ?recruiterId=81c27215503e447c827215503e647cbf&status=ASSIGNED&page=0&rows=15

  getjoblistBystatus(id, pageid, rowid: any, status: any) {
    var ids = sessionStorage.getItem('tenantId');
    return this.dataClient.get(HttpUrls.AlljobStatus + '/' + ids + '?rows=' + rowid + '&page=' + pageid + '&status=' + status);
  }
  // recruiterId=81c27215503e447c827215503e647cbf&status=ASSIGNED&page=0&rows=15
  jobsByStatus(pageid, rowid: any, status: any) {
    var ids = sessionStorage.getItem('userId');
    return this.dataClient.get(HttpUrls.jobstatusList + '?recruiterId=' + ids + '&status=' + status + '&page=' + pageid + '&rows=' + rowid);
  }
  accountJobsStaus(pageid, rowid: any, status: any) {
    return this.dataClient.get(HttpUrls.accountJobs + '?status=' + status + '&page=' + pageid + '&rows=' + rowid);
  }

  // FUNCTION TO APPROVE MULTIPLE JOBS
  approveJobAfterSelection(hireRequestIdList, loggedInUserId, status, comments, obj) {

    return this.dataClient.post(HttpUrls.APPROVE_MULTIPLE_JOB + '?hireRequestIdList=' + hireRequestIdList + '&loggedInUserId=' + loggedInUserId + '&status=' + 'APPROVED' + '&comments=' + 'No Comments', obj);
  }

  // FUNCTION TO REJECT MULTIPLE JOBS
  rejectJobAfterSelection(hireRequestIdList, loggedInUserId, status, comments, obj) {

    return this.dataClient.post(HttpUrls.REJECT_MULTIPLE_JOB + '?hireRequestIdList=' + hireRequestIdList + '&loggedInUserId=' + loggedInUserId + '&status=' + 'REJECTED' + '&comments=' + comments, obj);
  }
  // FUNCTION TO CLOSE JOBS

  closeAfterSelection(hireRequestIdList, loggedInUserId, status, comments, obj) {

    return this.dataClient.post(HttpUrls.CLOSE_MULTIPLE_JOB + '?hireRequestIdList=' + hireRequestIdList + '&loggedInUserId=' + loggedInUserId + '&status=' + 'CLOSED' + '&comments=' + comments, obj);

  }
  //FUNCTION TO ONHOLD JOBS
  onHoldAfterSelection(hireRequestIdList, loggedInUserId, status, comments, obj) {

    return this.dataClient.post(HttpUrls.ONHOLD_MULTIPLE_JOB + '?hireRequestIdList=' + hireRequestIdList + '&loggedInUserId=' + loggedInUserId + '&status=' + 'ONHOLD' + '&comments=' + comments, obj);
  }
  onHoldAfterprivilegeSelection(hireRequestIdList, loggedInUserId, status, comments, obj) {
    return this.dataClient.post(HttpUrls.ONHOLD_PRIVILEGE_JOB + '?hireRequestIdList=' + hireRequestIdList + '&loggedInUserId=' + loggedInUserId + '&status=' + 'ONHOLD' + '&comments=' + comments, obj);

  }
  // For view job details api
  getJobDetails(hireid) {
    debugger
    return this.dataClient.get(HttpUrls.GET_JOB_DETAILS + '/' + hireid);
  }

  // Get Locations for Post Job
  getLocation() {
    debugger
    return this.dataClient.get(HttpUrls.POST_JOB_LOCATIONS);
  }

  // Get Qualification for Post Job
  qualificationlist() {
    debugger
    return this.dataClient.get(HttpUrls.QUALIFICATION_LIST);
  }

  // Update Job
  updateJobList(data) {

    return this.dataClient.update(HttpUrls.UPDATE_JOB_LIST, data);

  }

  // For Searching Jobs
  searchAllJobs(tenantId, searchinput, pageid, rowid, userId?: any) {
    return this.dataClient.get(HttpUrls.SEARCH_ALL_JOBS_ADMIN + tenantId + '&searchInput=' + searchinput + '&page=' + pageid + '&rows=' + rowid);

  }
  searchAllJobss(searchinput, pageid, rowid: any) {
    debugger
    return this.dataClient.get(HttpUrls.SEARCH_ALL_JOBS_USER + '?type=' + 'user' + '&searchInput=' + searchinput + '&page=' + pageid + '&rows=' + rowid);
  }
  searchJobsAccountManger(searchinput, pageid, rowid: any) {
    return this.dataClient.get(HttpUrls.SEARCH_ALL_JOBS_ACCOUNTMANAGER + '?tenantId=' + sessionStorage.getItem('tenantId') + '&searchInput=' + searchinput + '&page=' + pageid + '&rows=' + rowid);
  }
  getListOfRecruiters() {
    // return this.dataClient
    // .get(HttpUrls.GET_LIST_RECRUITERS + '?name=' + 'MANAGE RECRUITERS' + '&tenantId=' + sessionStorage.getItem('tenantId'));
    return this.dataClient.get(HttpUrls.GET_LIST_RECRUITERS_REPORTS + '?tenantId=' + sessionStorage.getItem('tenantId') + '&roleName=' + 'Recruiter');
  }

  resumeupload(formatfile: any, file: any, obj: ReferJob) {
    var formdata: FormData = new FormData();
    formdata.append('formatedresume', formatfile);
    formdata.append('file', file);

    formdata.append('jobReference', JSON.stringify(obj));
    return this.dataClient.post<any>(HttpUrls.UPLOAD_RESUME, formdata);
  }
  updateresume(formatfile: any, file: any, obj: ReferJob) {
    var formdata: FormData = new FormData();
    formdata.append('formatedresume', formatfile);
    formdata.append('file', file);
    formdata.append('jobReference', JSON.stringify(obj));

    return this.dataClient.post(HttpUrls.UPDATE_RESUME, formdata);
  }
  getListOfRecruitersAssignedToJob(hireid) {
    return this.dataClient.get(HttpUrls.LIST_OF_RECRUITERS_ASSIGNED_TO_JOB + '?hireRequestId=' + hireid);
  }
  // Client Jobs()
  ClientJobs(pageid, rowid) {
    return this.dataClient.get(HttpUrls.CLIENT_JOBS + '?userId=' + sessionStorage.getItem('userId') + '&page=' + pageid + '&rows=' + rowid);
  }
  // VENDOR JOBS
  vendorJobs(pageid, rowid) {
    return this.dataClient.get(HttpUrls.VENDOR_JOBS + '?tenantId=' + sessionStorage.getItem('tenantId') + '&page=' + pageid + '&rows=' + rowid);
  }
  // vendor Search
  vendorSearch(searchinput, pageid, rowid) {
    debugger
    return this.dataClient.get(HttpUrls.VENDOR_SEARCH + '?tenantId=' + sessionStorage.getItem('tenantId')
      + '&searchInput=' + searchinput + '&page=' + pageid + '&rows=' + rowid);

  }
  // list of users working on the selected client
  clientusers(clientid) {
    return this.dataClient.get(HttpUrls.LIST_OF_USERS_WORKING_ON_SELECTED_CLIENT + '?clientId=' + clientid);

  }
  // GET LIST OF VENDOR JOBS
  getListOfVendorsAssignedToJob(hireid) {
    return this.dataClient.get(HttpUrls.LIST_OF_VENDORS_ASSIGNED_TO_JOB + '?hireRequestId=' + hireid);
  }
  // EDIT MANAGER
  editManager(formdata) {
    return this.dataClient.update(HttpUrls.EDIT_MANAGER, formdata);
  }
}
