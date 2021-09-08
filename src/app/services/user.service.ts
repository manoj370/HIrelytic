import { HttpUrls } from './../shared/HttpUrls';
import { Injectable, Inject } from '@angular/core';
import { User, Refer, OnlyTenant, assign } from '../models/user';
import { Candidate } from '../models/candidate';
import { TenantRoles, TenantDetails } from '../models/tenantroles';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {
  JobPosting,
  FunctionalArea,
  Department,
  Designation
} from '../models/jobposting';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/share';
import 'rxjs/Rx';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { DataclientService } from './dataclient.service';
import { IfStmt } from '@angular/compiler';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UserService {
  token: any;
  headers: Headers;
  options: RequestOptions;
  _baseUrl: any;
  _baseResumeParsingUrl: any;
  checkedPrivilegesArray: any = [];
  public successFailureMessage$ = new BehaviorSubject<any>(false);
  public sendNotificationSubject$ = new BehaviorSubject<any>(false);

  constructor(
    private _http: Http,
    @Inject(Window) private _window: Window,
    private dataClient: DataclientService
  ) { }

  private handleError(error: Response) {
    //console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

  verifyCandidatee(
    obj: Candidate,
    hireReqId: string,
    tenantId: string,
    userId: string
  ): Observable<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers });
    const body = JSON.stringify(obj);
    //console.log(body)
    return this._http
      .post(
        HttpUrls.VERIFY_CANDIDATE_FOR_RESUME +
        hireReqId +
        "&tenantId=" +
        tenantId +
        "&loggedInUserId=" +
        userId,
        obj,
        options
      )
      .map((response: Response) => <any>response.json());
  }

  changeExistingRole(user_id, role_id) {
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    const options = new RequestOptions({ headers: headers });
  }
  getUsersMailId(paramsUserId: any) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    const options = new RequestOptions({ headers: headers });
  }

  getResumeOnSearch(data: any) {
    if (data.exp !== '' && data.location !== '' && data.skill !== '') {
      const searchQuery = {
        query: {
          bool: {
            filter: [
              { match: { tenantId: sessionStorage.getItem('tenantId') } },
              { match: { location: data.location } },
              { match: { experience: data.exp } },
              { match: { skills: data.skill } }
            ]
          }
        }
      };
      return this._http.post(HttpUrls.SEARCH_RESUME, searchQuery);
    } else if (data.exp !== '' && data.location !== '') {
      const searchQuery = {
        query: {
          bool: {
            filter: [
              { match: { tenantId: sessionStorage.getItem('tenantId') } },
              { match: { location: data.location } },
              { match: { experience: data.exp } }
            ]
          }
        }
      };
      return this._http.post(HttpUrls.SEARCH_RESUME, searchQuery);
    } else if (data.exp !== '' && data.skill !== '') {
      const searchQuery = {
        query: {
          bool: {
            filter: [
              { match: { tenantId: sessionStorage.getItem('tenantId') } },
              { match: { experience: data.exp } },
              { match: { skills: data.skill } }
            ]
          }
        }
      };
      return this._http.post(HttpUrls.SEARCH_RESUME, searchQuery);
    } else if (data.location !== '' && data.skill !== '') {
      const searchQuery = {
        query: {
          bool: {
            filter: [
              { match: { tenantId: sessionStorage.getItem('tenantId') } },
              { match: { location: data.location } },
              { match: { skills: data.skill } }
            ]
          }
        }
      };
      return this._http.post(HttpUrls.SEARCH_RESUME, searchQuery);
    } else if (data.location !== '' && data.skill == '' && data.exp == '') {
      const searchQuery = {
        query: {
          bool: {
            filter: [
              { match: { tenantId: sessionStorage.getItem('tenantId') } },
              { match: { location: data.location } }
            ]
          }
        }
      };
      return this._http.post(HttpUrls.SEARCH_RESUME, searchQuery);
    } else if (data.location == '' && data.skill !== '' && data.exp == '') {
      const searchQuery = {
        query: {
          bool: {
            filter: [
              { match: { tenantId: sessionStorage.getItem('tenantId') } },
              { match: { skills: data.skill } }
            ]
          }
        }
      };
      return this._http.post(HttpUrls.SEARCH_RESUME, searchQuery);
    } else if (data.location == '' && data.skill == '' && data.exp !== '') {
      const searchQuery = {
        query: {
          bool: {
            filter: [
              { match: { tenantId: sessionStorage.getItem('tenantId') } },
              { match: { experience: data.exp } }
            ]
          }
        }
      };
      return this._http.post(HttpUrls.SEARCH_RESUME, searchQuery);
    } else {
      // alert("Enter atleast one field")
    }
  }
  //to save resume
  saveResume(file: any) {
    console.log(file);
    var formdata: FormData = new FormData();
    formdata.append('file', file);
    const headers = new Headers();
    headers.delete('Content-Type');
    headers.append('Access-Control-Allow-Origin', '*');
    const options = new RequestOptions({ headers: headers });
  }

  //to schedule interview
  scheduleInterviewService(interViewData: any) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers });
    // const body = JSON.stringify(interViewData);
    //console.log(body)
    // return this._http.post(HttpUrls.SCHEDULE_INTERVIEW, interViewData, options);
  }

  //to reschedule interview
  rescheduleInterviewService(refId: any) {
    // return this._http.get(HttpUrls.RESCHEDULE_INTERVIEW + '/' + refId);
  }

  updateModifiedData(interview_schedule: any) {
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    const options = new RequestOptions({ headers: headers });
    //const body = JSON.stringify(data);
    // console.log(body)
    // return this._http.put(HttpUrls.UPDATE_INTERVIEW, interview_schedule, options);
  }
  getListOfUnregUser(tenantId) {
    // return this._http.get(HttpUrls.UNREG_USER_LIST + tenantId);
  }

  resendInvitation(email: any) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers });

    // return this._http.post(HttpUrls.RESEND_INVITATION_FOR_USER, email, options).map((response: Response) => <any>response.json());
  }

  resendInvitationForUnregisteredTenants(id: any) {
    return this.dataClient.get(HttpUrls.resendMail + '?requestId=' + id);
  }

  createSkill(skillObj) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers });
    // return this._http.post(HttpUrls.CREATE_SKILL, skillObj, options);
  }
  // New Methods

  getFuncionalArea(): Observable<FunctionalArea[]> {
    return this._http
      .get(HttpUrls.GET_FUNCTIONAL_AREA)
      .map((response: Response) => <FunctionalArea[]>response.json());
  }
  getDepartment(): Observable<Department[]> {
    return this._http
      .get(HttpUrls.GET_DEPT)
      .map((response: Response) => <Department[]>response.json());
  }
  getDesignation(): Observable<Designation[]> {
    return this._http
      .get(HttpUrls.GET_DESG)
      .map((response: Response) => <Designation[]>response.json());
  }

  // Reset Password
  passwordReset(data): any {
    return this.dataClient.post(HttpUrls.RESET_PASSSWORD, data);
  }
  submitEmail(data) {
    return this.dataClient.post(HttpUrls.ASSIGN_JOBS_TO_RECRUITERS, data);
  }

  // to get all countries
  getAllCountries(): any {
    return this.dataClient.get<any>(HttpUrls.COUNTRIES_LIST);
  }

  changeStatus(data) {
    return this.dataClient.post(HttpUrls.CHANGE_RESUME_STATUS, data);
  }

  updatePrivileges(privilegesObj: any) {
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    const options = new RequestOptions({ headers: headers });
  }

  // New Api Calls
  userList() {
    return this.dataClient.get(
      HttpUrls.allUsers + '/' + sessionStorage.getItem('tenantId')
    );
  }

  AllUsers(pageid: any, rowid: any) {
    return this.dataClient.get(
      HttpUrls.AllUsersList +
      "/" +
      sessionStorage.getItem("tenantId") +
      "?page=" +
      pageid +
      "&rows=" +
      rowid
    );
  }
  AllRoles() {
    return this.dataClient.get(HttpUrls.AllUserRoles);
  }
  allModuleRoles() {
    return this.dataClient.get(HttpUrls.previModules);
  }
  // CheckRoles
  checkRoleName(roleName: any) {
    return this.dataClient.get(
      HttpUrls.checkRoles +
      "?tenantId=" +
      sessionStorage.getItem("tenantId") +
      "&roleName=" +
      roleName
    );
  }
  // create New Role   createRole
  createNewRole(data: any) {
    return this.dataClient.post(HttpUrls.createRole, data);
  }
  // get pervilogies;
  getprev(id: any) {
    return this.dataClient.get(HttpUrls.getPrevi + '?roleId=' + id);
  }
  // update usrer Roles
  updateUserRoles(userId: any, data: any) {
    return this.dataClient.update(
      HttpUrls.updateUserRoles + '?userId=' + userId,
      data
    );
  }
  // update usrer Roles
  updateRoles(data: any) {
    return this.dataClient.post(HttpUrls.updateRole, data);
  }
  // Dashboard
  getDashboarddata(from: any, to: any, selection: any) {
    return this.dataClient.get(
      HttpUrls.dashBoardAlldata +
      "?fromDate=" +
      from +
      "&toDate=" +
      to +
      "&selectOption=" +
      selection
    );
  }
  // Dashboard
  getClientdata(from: any, to: any, selection: any) {
    return this.dataClient.get(
      HttpUrls.clientsCount +
      "?fromDate=" +
      from +
      "&toDate=" +
      to +
      "&selectOption=" +
      selection
    );
  }

  // bar chart
  getBarchartData(from: any, to: any, selection: any) {
    return this.dataClient.get(
      HttpUrls.barchart +
      "?fromDate=" +
      from +
      "&toDate=" +
      to +
      "&selectOption=" +
      selection
    );
  }
  // bar chart
  getCandidateData(from: any, to: any, selection: any) {
    return this.dataClient.get(
      HttpUrls.candidateChart +
      "?fromDate=" +
      from +
      "&toDate=" +
      to +
      "&selectOption=" +
      selection
    );
  }
  // First pie Chart Dashboard
  firstPiechart(from: any, to: any, selection: any) {
    return this.dataClient.get(
      HttpUrls.firtPie +
      "?fromDate=" +
      from +
      "&toDate=" +
      to +
      "&selectOption=" +
      selection
    );
  }
  // Invite User
  inviteUser(data: any) {
    return this.dataClient.post(HttpUrls.inviteUser, data);
  }
  // Unregistered users
  getUnregsiter() {
    return this.dataClient.get(HttpUrls.unregisterUsers);
  }

  // Resend Invitation
  resendInv(id: any) {
    return this.dataClient.get(HttpUrls.resendMail + '?requestId=' + id);
  }
  // Get recruters Data
  getRecruters(id: any, from: any, to: any, selection: any) {
    return this.dataClient.get(
      HttpUrls.recrutersChart +
      "?recruiterId=" +
      id +
      "&fromDate=" +
      from +
      "&toDate=" +
      to +
      "&selectOption=" +
      selection
    );
  }
  // get mangers Data
  getMangersData(id: any, from: any, to: any, selection: any) {
    return this.dataClient.get(
      HttpUrls.accountsMngChart +
      "?recruiterId=" +
      id +
      "&fromDate=" +
      from +
      "&toDate=" +
      to +
      "&selectOption=" +
      selection
    );
  }

  // get recruters
  getrecrutersNames(name: any) {
    return this.dataClient.get(
      HttpUrls.getrecruters +
      "?tenantId=" +
      sessionStorage.getItem("tenantId") +
      "&roleName=" +
      name
    );
  }
  // VENDOR UPLOAD CANDIDATE
  verifyCandidate(candidateObj) {
    debugger;
    if (sessionStorage.getItem('userRoles') === 'VENDOR') {
      return this.dataClient.post(
        HttpUrls.VENDOR_UPLOAD_CANDIDATE,
        candidateObj
      );
    } else if((sessionStorage.getItem('userRoles') === 'EMPLOYEE') || (window.location.href.includes('uploadResume'))){
      return this.dataClient.post(
        HttpUrls.candidateDataSend,
        candidateObj
      );
    } else {
      return this.dataClient.post(
        HttpUrls.VERIFY_CANDIDATE_FOR_RESUME,
        candidateObj
      );
    }
  }
  // Check Resume Status whether exists or not
  checkResumeStatus(status) {
    return this.dataClient.get(
      HttpUrls.CHECK_RESUME_STATUS + '?status=' + status
    );
  }
  // success or failure message events
  sendNotification(notify: any) {
    this.successFailureMessage$.next(notify);
  }
  getNotification() {
    return this.successFailureMessage$.asObservable();
  }

  vendordashboardCardData(toDate, fromDate, selectOption) {
    return this.dataClient.get(
      HttpUrls.VENDOR_DASHBOARD_CARD_DATA +
      "?userId=" +
      sessionStorage.getItem("userId") +
      "&fromDate=" +
      toDate +
      "&toDate=" +
      fromDate +
      "&selectOption=" +
      selectOption
    );
  }
  vendorDashboardJobs(toDate, fromDate, selectOption, pageid, rowid) {
    return this.dataClient.get(
      HttpUrls.VENDOR_DASHBOARD_JOBS_LIST +
      "?userId=" +
      sessionStorage.getItem("userId") +
      "&fromDate=" +
      toDate +
      "&toDate=" +
      fromDate +
      "&selectOption=" +
      selectOption +
      "&page=" +
      pageid +
      "&rows=" +
      rowid
    );
  }
  getUsersRolesList(data: any) {
    return this.dataClient.get(
      HttpUrls.intervierRolesList +
      "?tenantId=" +
      sessionStorage.getItem("tenantId") +
      "&authorityName=" +
      data
    );
  }

  inviteEmployee(data: any) {
    return this.dataClient.post(HttpUrls.inviteEmployee, data);
  }
  createEmployee(data: any) {
    return this.dataClient.post(HttpUrls.createEmployee, data);
  }
  getAllEmployees() {
    return this.dataClient.get(
      HttpUrls.getAllEmployees +
      "?tenantId=" +
      sessionStorage.getItem("tenantId") +
      "&type=EMPLOYEE"
    );
  }
  postEmployeeSheet(file: any) {
    var formdata: FormData = new FormData();
    formdata.append('file', file);
    return this.dataClient.post<any>(HttpUrls.postEmployees, formdata);
  }

  downloadSheet() {
    return this.dataClient.get(HttpUrls.downloadSheet);
  }

  // CANDIDATE ADMIN REPORT
  candidateAdminReports(
    fromdate,
    toDate,
    pageid,
    rowid,
    submittedBy,
    option,
    search,
    roleId
  ) {
    return this.dataClient.get(
      HttpUrls.CANDIDATE_ADMIN_REPORT +
      "?fromDate=" +
      fromdate +
      "&toDate=" +
      toDate +
      "&page=" +
      pageid +
      "&rows=" +
      rowid +
      "&submittedBy=" +
      submittedBy +
      "&option=" +
      option +
      "&search=" +
      search +
      "&roleId=" +
      roleId
    );
  }
  // CANDIDATE INDIVIDUAL REPORT
  candidateIndividualReports(
    fromdate,
    toDate,
    pageid,
    rowid,
    submittedBy,
    option,
    search
  ) {
    return this.dataClient.get(
      HttpUrls.CANDIDATE_INDIVIDUAL_REPORT +
      "?fromDate=" +
      fromdate +
      "&toDate=" +
      toDate +
      "&page=" +
      pageid +
      "&rows=" +
      rowid +
      "&submittedBy=" +
      submittedBy +
      "&option=" +
      option +
      "&search=" +
      search
    );
  }

  // JOINEES ADMIN REPORT
  joineesAdminReport(fromdate, todate) {
    return this.dataClient.get(
      HttpUrls.JOINEES_ADMIN_REPORT +
        '?fromDate=' +
        fromdate +
        '&toDate=' +
        todate
    );
  }
  // JOINEES INDIVIDUAL REPORT
  joineesIndividualReport(fromdate, todate) {
    return this.dataClient.get(
      HttpUrls.JOINEES_INDIVIDUAL_REPORT +
      '?userId=' +
      sessionStorage.getItem('userId') +
      '&fromDate=' +
      fromdate +
      '&toDate=' +
      todate
    );
  }
  // TEAM PERFORMANCE ADMIN REPORT
  teamPerformanceAdminReport(fromdate, todate, pageid, rowid, roleId, recruiterId, option) {
    return this.dataClient.get(HttpUrls.TEAM_PERFORMANCE_ADMIN_REPORT + '?fromDate=' + fromdate + '&toDate=' + todate +
      '&page=' + pageid + '&rows=' + rowid + '&roleId=' + roleId + '&recruiterId=' + recruiterId +'&option=' + option);
  }
  // TEAM PERFORMANCE INDIVIDUAL REPORT
  teamPerformanceIndividualReport (fromdate, todate, pageid, rowid, roleId, recruiterId,option) {
    return this.dataClient.get(HttpUrls.TEAM_PERFORMANCE_INDIVIDUAL_REPORT + '?fromDate=' + fromdate + '&toDate=' + todate +
    '&page=' + pageid + '&rows=' + rowid + '&roleId=' + roleId + '&recruiterId=' + recruiterId +'&option=' + option);
  }

  // Get Employees Count
  getEmployeesDta() {
    return this.dataClient.get(
      HttpUrls.getCountEmployee +
        '?tenantId=' +
        sessionStorage.getItem('tenantId')
    );
  }

  getEmployeeList(pageid: any, rowid: any) {
    return this.dataClient.get(
      HttpUrls.getEmployeeList +
        '?tenantId=' +
        sessionStorage.getItem('tenantId') +
        '&page=' +
        pageid +
        '&rows=' +
        rowid
    );
  }


  // sendDatatoCandidate(){
  //   candidateDataSend
  // }
}
