import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-recruitementreports',
  templateUrl: './recruitementreports.component.html',
  styleUrls: ['./recruitementreports.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecruitementreportsComponent implements OnInit {
  searchForm: FormGroup;
  fromdate: any;
  todate: any;
  selectedValue: any;
  // type: string;
  searchvalue: string;
  roleName: string;
  submittedBy: any;
  pageid: any = 0;
  rowid: any = 16;
  roles: any = [];
  userslist: any = [];
  candidatesdetails: any = [];
  disableNextButton = false;
  disablePreviousButton = true;
  responsePageCount: number = 0;
  pageCount: number = 1;
  resetForm: FormGroup;
  columnDefs = [
    {
      headerName: 'Name', field: 'Name', width: 120, rowSelection: 'multiple', minWidth: 70, unSortIcon: true,
    },
    { headerName: 'Email', field: 'email_id', width: 120, rowSelection: 'multiple', minWidth: 70, unSortIcon: true },
    { headerName: 'Phone', field: 'phone_number', width: 100, rowSelection: 'multiple', minWidth: 70, unSortIcon: true },
    {
      headerName: 'Experience', field: 'experience',
      width: 110, rowSelection: 'multiple', minWidth: 120, cellStyle: { textAlign: 'center' }, unSortIcon: true
    },
    { headerName: 'Skills', field: 'skill', width: 100, rowSelection: 'multiple', minWidth: 70, unSortIcon: true },
    { headerName: 'Location', field: 'current_location', width: 100, rowSelection: 'multiple', minWidth: 70, unSortIcon: true },
    { headerName: 'Current CTC', field: 'current_ctc', width: 100, rowSelection: 'multiple', minWidth: 70, unSortIcon: true },
    { headerName: 'Expected CTC', field: 'expected_ctc', width: 100, rowSelection: 'multiple', minWidth: 70, unSortIcon: true },
    { headerName: 'Notice Period', field: 'notice_period', width: 100, rowSelection: 'multiple', minWidth: 70, unSortIcon: true },
    { headerName: 'Recruiter Name', field: 'RecruiterName', width: 120, rowSelection: 'multiple', minWidth: 70, unSortIcon: true },
    { headerName: 'Hiring Manager', field: 'hiring_manager', width: 120, rowSelection: 'multiple', minWidth: 70, unSortIcon: true },
    { headerName: 'Status', field: 'candidate_profile_status', width: 100, rowSelection: 'multiple', minWidth: 70, unSortIcon: true },
    { headerName: 'CurrentCompany', field: 'current_company', width: 100, rowSelection: 'multiple', minWidth: 70, unSortIcon: true },
  ];
  roleId: any;
  show: boolean;
  constructor(private fb: FormBuilder, public userService: UserService) { }
  ngOnInit() {
    this.searchForm = this.fb.group({
      searchinput: ['', Validators.required]
    });
    this.resetForm = this.fb.group({
      searchinput: ['']
    });
    const roleName = sessionStorage.getItem('userRoles');
    if (roleName === 'ADMIN') {
      this.userList();
      this.show = !this.show;
    }
    this.defaultCandidateReport();
  }

  public datePicker(event) {
    const roleName = sessionStorage.getItem('userRoles');
    console.log(event);
    if (event.startDate !== undefined) {
      const startDate = event.startDate._d;
      const endDate = event.endDate._d;
      this.fromdate = startDate.getFullYear().toString() + '-' + ('0' + (startDate.getMonth() + 1))
        .slice(-2) + '-' + ('0' + startDate.getDate().toString()).slice(-2);
      this.todate = endDate.getFullYear().toString() + '-' + ('0' + (endDate.getMonth() + 1))
        .slice(-2) + '-' + ('0' + endDate.getDate().toString()).slice(-2);
      this.selectedValue = 'notSelected';
      console.log(this.todate);
      console.log(this.fromdate);
      console.log(this.selectedValue);
      if (roleName === 'ADMIN') {
        this.CandidateReportOnAllTypes();
      } else {
        this.candidateIndividualReportAllTypes();
      }
    }
  }
  dateOption(event) {
    console.log(event);
    const roleName = sessionStorage.getItem('userRoles');
    console.log(roleName);
    if ((event === '1 Month') || (event === '3 Months') || (event === '6 Months')) {
      this.fromdate = null;
      this.todate = null;
      this.selectedValue = event;
      if (roleName === 'ADMIN') {
        this.CandidateReportOnAllTypes();
      } else {
        this.candidateIndividualReportAllTypes();
      }
    } else if (event === 'Date Range') {
      console.log(event);
      this.datePicker(event);
    } else {
      this.fromdate = null;
      this.todate = null;
      this.selectedValue = event;
      this.submittedBy = '';
      if (roleName === 'ADMIN') {
        this.CandidateReportOnAllTypes();
      } else {
        this.fromdate = null;
        this.todate = null;
        this.selectedValue = event;
        this.submittedBy = sessionStorage.getItem('userId');
        this.candidateIndividualReportAllTypes();
      }
    }
  }
  defaultCandidateReport() {
    const userRoles = sessionStorage.getItem('userRoles');
    console.log(userRoles);
    if (userRoles === 'ADMIN') {
      this.fromdate = null;
      this.todate = null;
      this.selectedValue = '1 Year';
      this.searchvalue = '';
      this.submittedBy = '';
      this.roleId = '';
      this.candidateAdminReport();
    } else {
      this.fromdate = null;
      this.todate = null;
      this.selectedValue = '1 Year';
      this.searchvalue = '';
      this.submittedBy = sessionStorage.getItem('userId');
      this.candidateIndividualReport();
    }
  }
  userList() {
    this.userService.userList().subscribe(res => {
      console.log(res);
      this.roles = res;
    }, error => {
      console.log(error);
    });
  }
  test(id: any) {
    console.log(id);
  }
  useDataId(name: any) {
    console.log(name);
    this.userslist.forEach(element => {
      console.log(element.firstName)
      console.log(name);
      if (element.firstName.includes(name)) {
        console.log(element.userId);
        this.submittedBy = element.userId;
      }
    });
    this.CandidateReportOnAllTypes();
  }
  roleEvent(roleName: any) {
    if (roleName === 'ALL') {
      this.fromdate = null;
      this.todate = null;
      this.selectedValue = '1 Year';
      this.searchvalue = '';
      // this.type = '';
      this.submittedBy = '';
      this.roleId = null;
      this.candidateAdminReport();
    } else {
      this.roles.forEach(element => {
        if (element.roleName.includes(roleName)) {
          this.roleId = element.roleId;
        }
      });
      this.roleName = roleName;
      this.userService.getrecrutersNames(this.roleName).subscribe(res => {
        console.log(res);
        this.userslist = res;
        this.CandidateReportOnAllTypes();
      }, error => {
        console.log(error);
      });
      if (roleName) {
        if ((roleName.includes('VENDOR')) || (roleName.includes('REFERRAL'))) {
          // this.type = this.roleName;
          this.submittedBy = '';
        } else {
          // this.type = 'USER';
          this.submittedBy = '';
        }
      } else {
        // this.type = '';
      }
    }

  }
  // Search
  searchinput() {
    this.searchvalue = this.searchForm.get('searchinput').value;
    const userRoles = sessionStorage.getItem('userRoles');
    console.log(this.searchvalue);
    if (userRoles === 'ADMIN') {
      // if (this.searchvalue) {
      //   this.CandidateReportOnAllTypes();
      // } else {
      //   this.searchvalue = '';
      //   this.candidateAdminReport();
      // }
      if (this.searchvalue.length >= 3) {
        this.CandidateReportOnAllTypes();
      } else if (this.searchvalue.length === 0) {
        this.searchvalue = '';
        this.candidateAdminReport();
      }
    } else {
      if (this.searchvalue.length >= 3) {
        this.candidateIndividualReportAllTypes();
      } else if (this.searchvalue.length === 0) {
        this.searchvalue = '';
        this.candidateIndividualReportAllTypes();
      }
      // if (this.searchvalue) {
      //   this.candidateIndividualReportAllTypes();
      // } else {
      //   this.searchvalue = '';
      //   //  this.candidateIndividualReport();
      // }
    }
  }
  CandidateReportOnAllTypes() {
    console.log(this.searchvalue);
    if ((this.searchvalue !== '')) {
      this.candidateAdminReport();
    } else if ((this.searchvalue === '')) {
      this.candidateAdminReport();
    } else if ((this.searchvalue === '')) {
      this.candidateAdminReport();
    } else if ((this.searchvalue !== '')) {
      this.candidateAdminReport();
    }
  }
  candidateIndividualReportAllTypes() {
    if (this.searchvalue !== '') {
      this.candidateIndividualReport();
    } else if (this.searchvalue === '') {
      this.candidateIndividualReport();
    } else if (this.searchvalue === '') {
      this.candidateIndividualReport();
    } else if (this.searchvalue !== '') {
      this.candidateIndividualReport();
    }
  }
  candidateAdminReport() {
    console.log(this.fromdate, this.todate, this.pageid, this.rowid, this.submittedBy,
      this.selectedValue, this.searchvalue);
    this.userService.candidateAdminReports(this.fromdate, this.todate, this.pageid, this.rowid, this.submittedBy,
      this.selectedValue, this.searchvalue, this.roleId).subscribe(res => {
        console.log(res);
        this.candidatesdetails = res;
        this.responsePageCount = this.candidatesdetails[0].PageCount;
      }, error => {
        console.log(error);
      });
  }
  candidateIndividualReport() {
    console.log(this.fromdate, this.todate, this.pageid, this.rowid, this.submittedBy,
      this.selectedValue, this.searchvalue);
    this.userService.candidateIndividualReports(this.fromdate, this.todate, this.pageid, this.rowid, this.submittedBy,
      this.selectedValue, this.searchvalue).subscribe(res => {
        console.log(res);
        this.candidatesdetails = res;
        this.responsePageCount = this.candidatesdetails[0].PageCount;
      }, error => {
        console.log(error);
      });
  }
  // For Pagiantions
  onBtNext() {
    this.disablePreviousButton = false;
    this.pageCount++;
    if (this.pageCount === this.responsePageCount) {
      this.disableNextButton = true;
      this.disablePreviousButton = false;
    } else if (this.pageCount >= this.responsePageCount) {
      this.pageCount--;
      this.disableNextButton = true;
      this.disablePreviousButton = true;
      this.pageid = this.pageid - 1;

    } else {
      this.disableNextButton = false;
      this.disablePreviousButton = false;
    }
    this.candidatesdetails = [];
    console.log('onPaginationPageLoaded', event);
    // previous code
    this.pageid = this.pageid + 1;
    const userRoles = sessionStorage.getItem('userRoles');
    if (userRoles === 'ADMIN') {
      this.CandidateReportOnAllTypes();
    } else {
      this.candidateIndividualReportAllTypes();
    }
    // if (this.searchvalue) {
    //   this.searchpageid = this.searchpageid + 1;
    //   this.candidatesDatabaseSearch();
    // } else {
    //   this.pageid = this.pageid + 1;
    //   this.candidateDatabaseOnAllTypes();
    // }
  }
  onBtPrevious() {
    this.disableNextButton = false;
    this.pageCount--;
    if (this.pageCount === 1) {
      this.disablePreviousButton = true;
    } else {
      this.disablePreviousButton = false;
    }
    this.candidatesdetails = [];
    console.log('onPaginationPageLoaded', event);
    // previous code
    this.pageid = this.pageid - 1;
    const userRoles = sessionStorage.getItem('userRoles');
    if (userRoles === 'ADMIN') {
      this.CandidateReportOnAllTypes();
    } else {
      this.candidateIndividualReportAllTypes();
    }
    // if (this.searchvalue) {
    //   this.searchpageid = this.searchpageid - 1;
    //   this.candidatesDatabaseSearch();
    // } else {
    //   this.pageid = this.pageid - 1;
    //   this.candidateDatabaseOnAllTypes();
    // }
  }
  reset() {
    this.defaultCandidateReport();
    // this.resetForm.controls['searchinput'].reset();
    this.searchForm.reset();
    // this.resetFields();
  }
  // resetFields(){
  //   var inputArray = document.querySelectorAll('input');
  //   inputArray.forEach(function (input){
  //       input.value = '';
  //   });
  //   var select = document.querySelectorAll('select');
  //   select.forEach(function (select){
  //     select.innerHTML = '';
  //   });
  // }
}
