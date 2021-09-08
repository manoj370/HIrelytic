import { HttpUrls } from './../shared/HttpUrls';
import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';
import { IfStmt } from '@angular/compiler';
import { DataclientService } from './dataclient.service';
@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  constructor(private _http: Http, @Inject(Window) private _window: Window, private dataClient: DataclientService) {
  }
  // // To get team performance report
  getPerformanceReport() {
    if (sessionStorage.getItem('userRoles') == 'ADMIN') {
      // return this.dataClient.get(HttpUrls.GET_CANDIDATES_PROFILES+'?limit=50'+'&offset='+0);
      return this.dataClient.get(HttpUrls.GET_CANDIDATES_PROFILES);
    }
    else {
      return this.dataClient.get(HttpUrls.GET_INDIVIDUAL_CANDIDATE_PROFILES_REPORT + '?userId=' + sessionStorage.getItem('userId'));
    }

  }
  // To get team performance report
  getRecruitmentMetrics() {
    if (sessionStorage.getItem('userRoles') == 'ADMIN') {
      return this.dataClient.get(HttpUrls.GET_REC_METRICS);
    }
    else {
      return this.dataClient.get(HttpUrls.GET_REC_METRICS_INDIVIDUAL_RECRUITER_REPORT + '?userId=' + sessionStorage.getItem('userId'));
    }

  }
  getOpenPositionReport() {
    if (sessionStorage.getItem('userRoles') == 'ADMIN') {
      return this.dataClient.get(HttpUrls.GET_OPEN_POSITIONS_ADMIN);
    }
    else {

      return this.dataClient.get(HttpUrls.GET_OPEN_POSITIONS_RECRUITER + '/' + sessionStorage.getItem('userId'));
    }
    //   else if(sessionStorage.getItem('userRoles')=='Vendor Recruitment'){
    //     return this._http.get(HttpUrls.GET_JOB_LIST_VENDORS +tenantId+'&userId='+ userId).map((response: Response) => <any>response.json());
    //   }
  }
  getRecruiterReport() {

    if (sessionStorage.getItem('userRoles') == 'ADMIN') {
      return this.dataClient.get(HttpUrls.GET_RECRUITER_PERFORMANCE_REPORT_ADMIN);
    }
  }
  getRecruiterIndividualReport(RecruiterId) {
    debugger
    if (sessionStorage.getItem('userRoles') == 'ADMIN') {
      return this.dataClient.get(HttpUrls.GET_RECRUITER_INDIVIDUAL_REPORT + '?recruiterId=' + RecruiterId);
    }
    // else{
    //   return this.dataClient.get(HttpUrls.GET_RECRUITER_INDIVIDUAL_REPORT +'?recruiterId=' + RecruiterId );
    // }
  }
  getRecruiterIndividualReportt(RecruiterId) {
    debugger
    if (sessionStorage.getItem('userRoles') == 'Recruiter') {
      return this.dataClient.get(HttpUrls.GET_RECRUITER_INDIVIDUAL_REPORT + '?recruiterId=' + RecruiterId);
    }
  }
  // //TO GET  ADMIN MONTHWISE RECRUITMENT REPORT
  getMonthWiseRecruitmentMetrics() {
    debugger
    if (sessionStorage.getItem('userRoles') == 'ADMIN') {
      return this.dataClient.get(HttpUrls.GET_MONTHWISE_REC_METRICS_ADMIN);
    }
    else {
      return this.dataClient.get(HttpUrls.GET_MONTHWISE_REC_METRICS_USER + '?userId=' + sessionStorage.getItem('userId'));
    }

  }
  //   // DOWNLOAD EXCEL REPORT FOR CANDIDATE STATUS REPORT
  downlaodExcelReportCandidate() {
    debugger
    if (sessionStorage.getItem('userRoles') == 'ADMIN') {

      return this.dataClient.get(HttpUrls.DOWNLOAD_CANDIDATE_PROFILES_REPORT_EXCEL + '?fileName=' + 'AllCandidateProfiles' + '&extension=' + '.xls');

    }
    else {


      return this.dataClient.get(HttpUrls.DOWNLOAD_CANDIDATE_PROFILES_REPORT_RECRUITER_EXCEL + '?userId=' + sessionStorage.getItem('userId') + '&fileName=' + 'AllCandidateProfiles' + '&extension=' + '.xls');
    }
  }

  downlaodPdfReportCandidate() {

    if (sessionStorage.getItem('userRoles') == 'ADMIN') {
      return this.dataClient.get(HttpUrls.DOWNLOAD_CANDIDATE_PROFILES_REPORT_PDF + '?fileName=' + 'AllCandidateProfiles' + '&extension=' + '.pdf')
    }
    else {
      return this.dataClient.get(HttpUrls.DOWNLOAD_CANDIDATE_PROFILES_REPORT_PDF_RECRUITER + '?userId=' + sessionStorage.getItem('userId') + '&fileName=' + 'AllCandidateProfiles' + '&extension=' + '.pdf');
    }
  }
  downlaodExcelReportOpenPoistions() {
    if (sessionStorage.getItem('userRoles') == 'ADMIN') {
      return this.dataClient.get(HttpUrls.DOWNLOAD_OPEN_POISTIONS_REPORT_EXCEL + '?fileName=' + 'AllOpenPositionspdf' + '&extension=' + '.xls')
    } else {
      return this.dataClient.get(HttpUrls.DOWNLOAD_OPEN_POISTIONS_REPORT_EXCEL_RECRUITER + '?roleName=ADMIN' + '&fileName=' + 'AllOpenPositionspdf' + '&extension=' + '.xls')
    }
  }
  downlaodPdfReportOpenPositions() {
    if (sessionStorage.getItem('userRoles') == 'ADMIN') {
      return this.dataClient.get(HttpUrls.DOWNLOAD_OPEN_POISTIONS_REPORT_PDF + '?fileName=' + 'AllOpenPositionspdf' + '&extension=' + '.pdf')
    }
    else {
      return this.dataClient.get(HttpUrls.DOWNLOAD_OPEN_POISTIONS_REPORT_PDF_RECRUITER + '?roleName=' + 'ADMIN' + '&fileName=' + 'AllOpenPositionsUserpdf' + '&extension=' + '.pdf')
    }
  }
  getJoineeReportAdmin() {
    if (sessionStorage.getItem('userRoles') == 'ADMIN') {
      return this.dataClient.get(HttpUrls.JOINEES_REPORT_ADMIN + '?resumeStatus=' + 'JOINED');
    }
    else {
      return this.dataClient.get(HttpUrls.JOINEES_REPORT_USER + '?userId=' + sessionStorage.getItem('userId') + '&resumeStatus=' + 'JOINED');
    }
  }
  downlaodPdfReportJoinees() {

    if (sessionStorage.getItem('userRoles') == 'ADMIN') {
      return this.dataClient.get(HttpUrls.JOINEES_REPORT_ADMIN_PDF + '?resumeStatus=' + 'JOINED' + '&fileName=' + 'JOINED' + '&extension=' + '.pdf')

    }
    else {
      return this.dataClient.get(HttpUrls.JOINEES_REPORT_USER_PDF + '?userId=' + sessionStorage.getItem('userId') + '&resumeStatus=' + 'JOINED' + '&fileName=' + 'MonthWiseRecMetrics-Chart' + '&extension=' + '.pdf');
    }

  }
  downlaodExcelReportJoinees() {
    if (sessionStorage.getItem('userRoles') == 'ADMIN') {
      return this.dataClient.get(HttpUrls.JOINEES_REPORT_ADMIN_EXCEL +
        '?resumeStatus=' + 'JOINED' + '&fileName=' + 'JOINED' + '&extension=' + '.xls')
    }
    else {
      return this.dataClient.get(HttpUrls.JOINEES_REPORT_USER_EXCEL +
        '?userId=' + sessionStorage.getItem('userId') + '&resumeStatus=' + 'JOINED' + '&fileName=' + 'JOINED' + '&extension=' + 'xls')
    }
  }
  downlaodPdfReportTeamPerformance() {
    return this.dataClient.get(HttpUrls.TEAM_PERFORMANCE_PDF + '?fileName=' + 'Recruiters' + '&extension=' + '.pdf')
  }
  downlaodExcelReportTeamPerformance() {
    return this.dataClient.get(HttpUrls.TEAM_PERFORMANCE_EXCEL + '?fileName=' + 'Recruiters' + '&extension=' + 'xls');
  }
  downlaodPdfJobReport(tenantId: any, userId?: string) {
    if (sessionStorage.getItem('userRoles') == 'ADMIN') {
      return this.dataClient.get(HttpUrls.JOBS_REPORT_PDF + '?roleName=' + sessionStorage.getItem('userRoles') + '&fileName=' + 'manageJobs' + '&extension=' + '.pdf')
    }
    else if (sessionStorage.getItem('userRoles') === 'VENDOR') {
      return this.dataClient.get(HttpUrls.VENDOR_JOBS_PDF +
        '?tenantId=' + sessionStorage.getItem('tenantId') + '&fileName=' + 'manageJobs' + '&extension=' + '.pdf');
    }
    else {
      return this.dataClient.get(HttpUrls.JOBS_REPORT_PDF_USER +
        '?roleName=' + sessionStorage.getItem('userRoles') + '&fileName=' + 'manageJobs' + '&extension=' + '.pdf')
    }
  }
  downlaodExcelReportJobReport(tenantId: any, userId?: string) {

    if (sessionStorage.getItem('userRoles') == 'ADMIN') {

      return this.dataClient.get(HttpUrls.JOBS_REPORT_EXCEL +
        '?roleName=' + sessionStorage.getItem('userRoles') + '&fileName=' + 'manageJobs' + '&extension=' + 'xls')
    }
    else if (sessionStorage.getItem('userRoles') === 'VENDOR') {
      return this.dataClient.get(HttpUrls.VENDOR_JOBS_EXCEL +
        '?tenantId=' + sessionStorage.getItem('tenantId') + '&fileName=' + 'manageJobs' + '&extension=' + '.xls')
    }
    else {
      return this.dataClient.get(HttpUrls.JOBS_REPORT_EXCEL_USER +
        '?roleName=' + sessionStorage.getItem('userRoles') + '&fileName=' + 'manageJobs' + '&extension=' + 'xls')

    }
  }


  getListOfRecruiters() {
    return this.dataClient.get(HttpUrls.GET_LIST_RECRUITERS_REPORTS + '?tenantId=' + sessionStorage.getItem('tenantId') + '&roleName=' + 'Recruiter');

  }
  downloadFormattedResume(formattedResumePathh, formatedFileName) {
    return this.dataClient.get(HttpUrls.DOWNLOAD_FORMATTED_RESUME + '?path=' + formattedResumePathh + '/' + formatedFileName);
  }
  downloadAssignedJobReportPdf() {
    if (sessionStorage.getItem('userRoles') == 'ADMIN') {
      return this.dataClient.get(HttpUrls.ASSIGNED_JOBS_REPORT_PDF + '?status=' + 'ASSIGNED' + '&fileName=' + 'AssignedJobs' + '&extension=' + '.pdf');
    }
    else {
      return this.dataClient.get(HttpUrls.ASSIGNED_JOBS_REPORT_PDF_USER + '?userId=' + sessionStorage.getItem('userId') + '&status=' + 'ASSIGNED' + '&fileName=' + 'AssignedJobsUser' + '&extension=' + '.pdf')
    }
  }
  downloadAssignedJobReportExcel() {
    if (sessionStorage.getItem('userRoles') == 'ADMIN') {
      return this.dataClient.get(HttpUrls.ASSIGNED_JOBS_REPORT_PDF + '?status=' + 'ASSIGNED' + '&fileName=' + 'AssignedJobs' + '&extension=' + '.xls');
    }
    else {
      return this.dataClient.get(HttpUrls.ASSIGNED_JOBS_REPORT_PDF_USER + '?userId=' + sessionStorage.getItem('userId') + '&status=' + 'ASSIGNED' + '&fileName=' + 'AssignedJobsUser' + '&extension=' + '.xls')
    }
  }
  downloadRejectJobReportPdf() {
    if (sessionStorage.getItem('userRoles') == 'ADMIN') {
      return this.dataClient.get(HttpUrls.REJECTED_JOBS_REPORT_PDF + '?status=' + 'Rejected' + '&fileName=' + 'RejectedJobs' + '&extension=' + '.pdf');
    }
    else {
      return this.dataClient.get(HttpUrls.REJECTED_JOBS_REPORT_PDF_USER + '?userId=' + sessionStorage.getItem('userId') + '&status=' + 'Rejected' + '&fileName=' + 'RejectedJobsUser' + '&extension=' + '.pdf')
    }
  }
  downloadRejectJobReportExcel() {
    if (sessionStorage.getItem('userRoles') == 'ADMIN') {
      return this.dataClient.get(HttpUrls.REJECTED_JOBS_REPORT_PDF + '?status=' + 'Rejected' + '&fileName=' + 'RejectedJobs' + '&extension=' + '.xls');
    }
    else {
      return this.dataClient.get(HttpUrls.REJECTED_JOBS_REPORT_PDF_USER + '?userId=' + sessionStorage.getItem('userId') + '&status=' + 'Rejected' + '&fileName=' + 'RejectedJobs' + '&extension=' + 'xls')
    }
  }
  downloadHoldJobReportPdf() {
    if (sessionStorage.getItem('userRoles') == 'ADMIN') {
      return this.dataClient.get(HttpUrls.ON_HOLD_PDF + '?status=' + 'OnHold' + '&fileName=' + 'OnHold' + '&extension=' + '.pdf');
    }
    else {
      return this.dataClient.get(HttpUrls.ON_HOLD_PDF_USER + '?userId=' + sessionStorage.getItem('userId') + '&status=' + 'OnHold' + '&fileName=' + 'holdjobs' + '&extension=' + '.pdf')
    }
  }
  downloadHoldExcelReportJobsReport() {
    if (sessionStorage.getItem('userRoles') == 'ADMIN') {
      return this.dataClient.get(HttpUrls.ON_HOLD_PDF + '?status=' + 'OnHold' + '&fileName=' + 'OnHold' + '&extension=' + '.xls');
    }
    else {
      return this.dataClient.get(HttpUrls.ON_HOLD_PDF_USER + '?userId=' + sessionStorage.getItem('userId') + '&status=' + 'OnHold' + '&fileName=' + 'holdjobs' + '&extension=' + '.xls')
    }
  }
  downloadClosedJobReportPdf() {
    if (sessionStorage.getItem('userRoles') == 'ADMIN') {
      return this.dataClient.get(HttpUrls.CLOSED_PDF + '?status=' + 'CLOSED' + '&fileName=' + 'CLOSED' + '&extension=' + '.pdf');
    }
    else {
      return this.dataClient.get(HttpUrls.CLOSED_PDF_USER + '?userId=' + sessionStorage.getItem('userId') + '&status=' + 'CLOSED' + '&fileName=' + 'CLOSED' + '&extension=' + '.pdf')
    }
  }
  downloadClosedExcelReportJobsReport() {
    if (sessionStorage.getItem('userRoles') == 'ADMIN') {
      return this.dataClient.get(HttpUrls.CLOSED_PDF + '?status=' + 'CLOSED' + '&fileName=' + 'CLOSED' + '&extension=' + '.xls');
    }
    else {
      return this.dataClient.get(HttpUrls.CLOSED_PDF_USER + '?userId=' + sessionStorage.getItem('userId') + '&status=' + 'CLOSED' + '&fileName=' + 'AssignedJobsUser' + '&extension=' + '.xls')
    }
  }
}
