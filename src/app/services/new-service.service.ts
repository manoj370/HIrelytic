import { Injectable } from '@angular/core';
import { HttpUrls } from '../../app/shared/HttpUrls';
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { DataclientService } from './dataclient.service';


@Injectable({
  providedIn: 'root'
})
export class NewServiceService {

  constructor(private http: Http, private dataClient: DataclientService) { }
  //  Login service with oauth token
  public orgSignIn(data): any {
    debugger
    const formdata: FormData = new FormData();
    formdata.append('grant_type', 'password');
    formdata.append('username', data.username + '|' + sessionStorage.getItem('tenantId'));
    const user = data.username + '|' + sessionStorage.getItem('tenantId');
    console.log(user);
    formdata.append('password', data.password);

    return this.dataClient.post<any>(HttpUrls.SIGNIN_ORG, formdata);


  }
  // For Refreshing Token
  refreshToken(data) {
    debugger
    return this.dataClient.post<any>(HttpUrls.REFRESH_TOKEN + '?grant_type=' + 'refresh_token' + '&refresh_token=' + sessionStorage.getItem('refresh_token'), data);
  }
  // To Get Login User Details
  public getUserDetails(): any {
    if (localStorage.getItem("details")) {

    }
    else {
    return this.dataClient.get<any>(HttpUrls.GET_USER);
    }
  }

  //  Organisation Sign Up
  public orginizationSignup(data): any {
    return this.dataClient.post(HttpUrls.SIGNUP_ORG, data);
  }

  // Forgot Password
  public forgotPassword(emailId, obj): any {
    return this.dataClient.post(HttpUrls.FORGOT_PASSWORDD + '?emailId=' + emailId + '&tenantId=' + sessionStorage.getItem('tenantId'), obj);
  }

  // Check Organisation
  public checkOrganisation(orgName): any {
    return this.dataClient.get<any>(HttpUrls.CHECK_ORGANISATION + '?orgName=' + orgName);
  }
  // Request Demo

  public RequestDemo(data): any {
    return this.dataClient.post(HttpUrls.REQUEST_DEMO, data);
  }

  // get Countries List
  public countriesList(): any {
    return this.dataClient.get<any>(HttpUrls.COUNTRIES_LIST);
  }
  public stateslist(countryname): any {
    return this.dataClient.get<any>(HttpUrls.STATES_LIST + '/' + countryname);
  }
  public stateslistttt(countryId): any {
    return this.dataClient.get<any>(HttpUrls.STATES_LIST + '?countryId=' + countryId);
  }
  //  Registration Form Activation
  public activatingOrganisation(data): any {
    return this.dataClient.post(HttpUrls.ACTIVATING_ORGANISATION, data);
  }

  removeUser(data: any) {
    return this.dataClient.post(HttpUrls.disabledUser, data);
  }
  // create client
  addClient(formdata) {
    return this.dataClient.post(HttpUrls.CREATE_CLIENT, formdata);
  }
  // GetClientnames
  getClientss(tenantId) {
    return this.dataClient.get(HttpUrls.GET_CLIENTSS + '?tenantId=' + tenantId);
  }
  //  Create User Method
  createUser(formdata) {
    return this.dataClient.post(HttpUrls.CREATE_USER, formdata);
  }
  // Get Clients with Pagination
  getClientsWithPagiantion(tenantId, pageid, rowid) {
    return this.dataClient.get(HttpUrls.GET_CLIENTSS_PAGINATION + '?tenantId=' + tenantId + '&page=' + pageid + '&rows=' + rowid);
  }
  // Edit Status
  editResumeStatus(statusid, status) {
    return this.dataClient.get(HttpUrls.EDIT_STATUS + '?statusId=' + statusid + '&status=' + status);
  }

  // incentives
  createIncentive(formdata: any) {
    return this.dataClient.post(HttpUrls.incentiveCreate, formdata);
  }
  ghetAllIncentives() {
    return this.dataClient.get(HttpUrls.getAllIncentives + '?tenantId=' + sessionStorage.getItem('tenantId'));
  }
  updateIncentives(data: any) {
    return this.dataClient.update(HttpUrls.updateIntives, data);
  }
  getallCandidateJoined(pageid: any, rowid: any) {
    return this.dataClient.get(HttpUrls.getallCandidateJoined + '?tenantId=' + sessionStorage.getItem('tenantId') + '&page=' + pageid + '&rows=' + rowid);
  }
  getJoinedCandidates(data: any, pageid: any, rowid: any) {
    return this.dataClient.get(HttpUrls.getjoinedCandidates + '?tenantId=' + sessionStorage.getItem('tenantId') + '&userId=' + data + '&page=' + pageid + '&rows=' + rowid);
  }
  // Export as Pdf 
  downloadIncentiveReportPdf() {
    if (sessionStorage.getItem('userRoles') === 'ADMIN') {
      return this.dataClient.get(HttpUrls.INCENTIVE_ADMIN_PDF + '?tenantId=' + sessionStorage.getItem('tenantId') + '&fileName=' + 'JOINED' + '&extension=' + '.pdf');
    }
    else if (sessionStorage.getItem('userRoles') === 'VENDOR') {
      return this.dataClient.get(HttpUrls.MYPAYMENTDETAILS_PDF + '?fileName=' + 'MYPAYMENTS' + '&extension=' + '.pdf');
    }
    else {
      return this.dataClient.get(HttpUrls.INCENTIVE_USER_PDF + '?tenantId=' + sessionStorage.getItem('tenantId') + '&userId=' + sessionStorage.getItem('userId') + '&fileName=' + 'JOINED' + '&extension=' + '.pdf')
    }
  }
  downloadIncentiveReportExcel() {
    if (sessionStorage.getItem('userRoles') === 'ADMIN') {
      return this.dataClient.get(HttpUrls.INCENTIVE_ADMIN_EXCEL + '?tenantId=' + sessionStorage.getItem('tenantId') + '&fileName=' + 'JOINED' + '&extension=' + '.xls');
    } else if (sessionStorage.getItem('userRoles') === 'VENDOR') {
      return this.dataClient.get(HttpUrls.MYPAYMENTDETAILS_EXCEL + '?fileName=' + 'MYPAYMENTS' + '&extension=' + '.xls');
    } else {
      return this.dataClient.get(HttpUrls.INCENTIVE_USER_EXCEL + '?tenantId=' + sessionStorage.getItem('tenantId') + '&userId=' + sessionStorage.getItem('userId') + '&fileName=' + 'JOINED' + '&extension=' + '.xls')
    }
  }
  getTenatData(data: any) {
    return this.dataClient.get(HttpUrls.viewTenatData + '?tenantId=' + data);
  }
  updateModulesList(data: any) {
    return this.dataClient.update(HttpUrls.updateModules, data);
  }
  // updateModules
  getModulesList() {
    return this.dataClient.get(HttpUrls.getModulesList);
  }
  getIncetvieStatusList() {
    return this.dataClient.get(HttpUrls.intervieStatusList);
  }
  updateIncetiverStatus(data: any) {
    return this.dataClient.update(HttpUrls.intervieStatusUpdate + '?paymentId=' + data.paymentId + '&paymentStatus=' + data.status, '');
  }
  // CANDIDATES ROLES LIST
  getRolesList() {
    return this.dataClient.get(HttpUrls.CANDIDATES_DATABASE_ROLES);
  }
  // CANDIDATES DATABASE BASEDON TYPE AND SEARCH
  CandidatesDatabase(type, pageid, rowid, fromdate, todate, option, search) {
    return this.dataClient.get(HttpUrls.CANDIDATES_DATABASE_GRID_BASEDON_TYPE_SEARCH +
      '?type=' + type + '&page=' + pageid + '&rows=' + rowid + '&fromDate=' + fromdate + '&toDate=' + todate + '&option='
      + option + '&search=' + search);
  }
  // CANDIDATES DATABASE BASEDON TYPE AND SEARCH
  CandidatesDatabaseSearch(type, pageid, rowid, search) {
    return this.dataClient.get(HttpUrls.SEARCH +
      '?type=' + type + '&page=' + pageid + '&rows=' + rowid + '&search=' + search);
  }
  
  // vendor my payment information
  getPaymentsForCandidatesJoinedInfo(pageid, rows) {
    return this.dataClient.get(HttpUrls.VENDOR_MY_PAYMENTS_INFORMATION + '?page=' + pageid + '&rows=' + rows);
  }
  ondownload(resumePath: any, fileName: any) {
    return this.dataClient.get(HttpUrls.DOWNLOAD_RESUME + '?path=' + resumePath + '/' + fileName);
  }
  // GET TEMPLATE NAMES
  getTemplateNames() {
    return this.dataClient.get(HttpUrls.GET_TEMPLATE_NAMES);
  }
  postMailTemplate(type,formdata)
  {
    return this.dataClient.post(HttpUrls.POST_MAIL_TEMPLATE + '?objectType=' + type , formdata);
  }
}
