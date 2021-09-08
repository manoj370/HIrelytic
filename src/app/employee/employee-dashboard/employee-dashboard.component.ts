import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { UserService } from '../../services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TenantService } from '../../services/tenant.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeDashboardComponent implements OnInit, OnDestroy {
  jobList: any;
  rowData: any;
  gridOptions: any;
  public pageid: any = 0;
  public rowid: any = 15;
  responsePageCount: any;

  pageCount = 1;
  datee: string;
  userRoles: any;
  rowClassRules: any;
  rowHeight: number;
  privileges: any;
  authority: any;

  subscribe: Subject<any> = new Subject<any>();
  totalCount: any;
  pageidForResume: any;
  hireeeID: any;
  uploadResumeForm:FormGroup;
  selectedFiles: any;
  file: any;
  resumeParsingData: FormData;
  selectedFormatedFile: any;
  constructor(private userService: UserService,private _TenantService:TenantService) {
    this.rowHeight = 30;
  // tslint:disable-next-line: member-ordering

    // this.rowClassRules = {
    //   "sick-days-warning": function(params) {
    //     return params.node.rowIndex % 2 !== 0;
    //   }
    // };
  }

  ngOnInit() {
    this.refferalResumes();
    this.userRoles = sessionStorage.getItem('userRoles');
    
    this.uploadResumeForm = new FormGroup({
      candidateName: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[^-\s][a-zA-Z ]*$/)
        ])
      ),
      candidatePhone: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.pattern(/^[0-9]*$/)
        ])
      ),
      // candidateEmail: new FormControl("", Validators.compose([Validators.required, Validators.email])),
      candidateEmail: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^([\w+-.%]+@[\w-.]+\.[A-Za-z]{2,4};?)+$/)
        ])
      ),
      candidateLastName: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[^-\s][a-zA-Z ]*$/)
        ])
      ),
      // currentCompany:new FormControl("", Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z[0-9:;,+@._\s#&()-/]*$/)])),
      currentCompany: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[^-\s][a-zA-Z0-9@[0-9:;,.+_\s#&%!$^()-/]*$/)
        ])
      ),
      prevCompany: new FormControl(''),
      // prevCompany:new FormControl("", Validators.pattern(/^[a-zA-Z0-9 ]*$/)),
      currentLocation: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[^-\s][a-zA-Z ]*$/)
        ])
      ),
      prefLocation: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[^-\s][a-zA-Z ]*$/)
        ])
      ),
      // designation:new FormControl("",  Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)])),
      currentCtc: new FormControl('', Validators.required),
      expectedCtc: new FormControl('', Validators.required),
      noticePeriod: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[0-9]*$/)
        ])
      ),
      qualification: new FormControl('', Validators.required),
      specialization: new FormControl(''),
      panNumber: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/)
        ])
      ),
      sourceType: new FormControl('', Validators.required),
      source: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[^-\s][a-zA-Z ]*$/)
        ])
      ),
      skill: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[^-\s][a-zA-Z 0-9;+#]*$/)
        ])
      ),
      experience: new FormControl('', Validators.required),
      resumefilename: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/([a-zA-Z0-9\s_\\.\-\(\):])+(.doc|.docx|.pdf)$/)
        ])
      ),
      formatedresume: new FormControl(
        '',
        Validators.compose([
          Validators.pattern(/([a-zA-Z0-9\s_\\.\-\(\):])+(.doc|.docx|.pdf)$/)
        ])
      ),
      uploadedBy: new FormControl('', Validators.compose([Validators.email]))
    });
  }
  // tslint:disable-next-line: member-ordering
  columnDefs = [
    {
      headerName: 'Posted By',
      field: 'createdDate',
      width: 200,
      unSortIcon: true,
      checkboxSelection: true
    },
    {
      headerName: 'Job Title',
      field: 'jobTitle',
      width: 250,
      cellStyle: { textAlign: 'center' },
      unSortIcon: true
    },
    {
      headerName: 'Openins',
      field: 'noOfOpenings',
      width: 150,
      cellStyle: { 'text-transform': 'capitalize', 'font-size': '12px','text-align':'center' },
      unSortIcon: true
    },
    {
      headerName: 'Client',
      field: 'clientName',
      width: 200,
      unSortIcon: true
    },
    {
      headerName: 'Min Experience',
      field: 'minJobExperience',
      cellStyle: { 'text-transform': 'capitalize', 'font-size': '12px','text-align':'center'  },
      width: 150,
      unSortIcon: true
    },
    {
      headerName: 'Max Experience',
      field: 'maxJobExperience',
      cellStyle: { 'text-transform': 'capitalize', 'font-size': '12px','text-align':'center'  },
      width: 150,
      unSortIcon: true
    },
    {
      headerName: 'Contact Person',
      field: 'jobContactToEmail',
      cellStyle: { 'text-transform': 'capitalize', 'font-size': '12px' },
      width: 150
    },
    {
      headerName: 'Bonus',
      field: 'referralAmount',
      width: 150,
      unSortIcon: true,
      cellStyle: { 'text-transform': 'capitalize', 'font-size': '12px','text-align':'center'  },

    },
    {
      headerName: 'Status', field: 'hireRequestStatus', width: 210,
      cellClassRules: {
        'rag-green-outer': function (params) {
          return params.value === 'ASSIGNED';
        },
        'rag-amber-outer': function (params) {
          return params.value === 'ONHOLD';
        },
        'rag-red-outer': function (params) {
          return params.value === 'REJECTED';
        },
        'rag-green-closed': function (params) {
          return params.value === 'CLOSED';
        },
        'rag-amber-open': function (params) {
          return params.value === 'OPEN';
        },
        'rag-red-pending': function (params) {
          return params.value === 'PENDINGFORAPPROVAL';
        },
        'rag-black-unassign': function (params) {
          return params.value === 'UNASSIGNED';
        }
      },
      cellRenderer: function (params) {
        return '<span class="rag-element">' + params.value + '</span>';
      }

    },
  ];

  refferalResumes() {
    this.userService.getEmployeeList(this.pageid, this.rowid).subscribe(
      (resumesList: any) => {
        console.log(resumesList);
        this.rowData = resumesList;
        console.log(this.rowData);

      },
      error => {
        console.log(error);
      }
    );
  }

  // Pagination Purpose
  // downloadClosedJobReportPdf() {
  //   let date: Date = new Date();

  //   this.datee = date.getFullYear().toString()
  //     + '-' + ('0' + (date.getMonth() + 1).toString()).slice(-2) +
  //     '-' + ('0' + (date.getDate()).toString()).slice(-2);
  //   console.log(this.datee);
  //   if (this.userRoles == 'ADMIN') {
  //     this.ReportsService.downloadClosedJobReportPdf()
  //       .pipe(takeUntil(this.subscribe))
  //       .subscribe(res => {
  //         let blob = res;
  //         let a = document.createElement('a');
  //         a.href = URL.createObjectURL(blob);
  //         a.download = 'closedJobsPdf.pdf' + ' ' + this.datee + '.pdf';
  //         document.body.appendChild(a);
  //         a.click();

  //       });
  //   }
  //   else {
  //     this.ReportsService.downloadClosedJobReportPdf()
  //       .pipe(takeUntil(this.subscribe))
  //       .subscribe(res => {
  //         const blob = res;
  //         const a = document.createElement('a');
  //         a.href = URL.createObjectURL(blob);
  //         a.download = 'closedJobsPdfuser.pdf' + '' + this.datee + '.pdf';
  //         document.body.appendChild(a);
  //         a.click();
  //       });
  //   }
  // }
  // downloadClosedExcelReportJobsReport() {
  //   let date: Date = new Date();

  //   this.datee = date.getFullYear().toString() + '-' + ('0' + (date.getMonth() + 1).toString()).slice(-2) + '-' + ('0' + (date.getDate()).toString()).slice(-2);
  //   console.log(this.datee);
  //   if (this.userRoles == 'ADMIN') {

  //     this.ReportsService.downloadClosedExcelReportJobsReport()
  //       .pipe(takeUntil(this.subscribe))
  //       .subscribe(res => {

  //         let blob = res;
  //         let a = document.createElement('a');
  //         a.href = URL.createObjectURL(blob);
  //         a.download = 'closedJobsExcel.xls' + '' + this.datee + '.xls';
  //         document.body.appendChild(a);
  //         a.click();

  //       });
  //   }
  //   else {
  //     this.ReportsService.downloadClosedExcelReportJobsReport()
  //       .pipe(takeUntil(this.subscribe))
  //       .subscribe(res => {
  //         const blob = res;
  //         const a = document.createElement('a');
  //         a.href = URL.createObjectURL(blob);
  //         a.download = 'holdJobsExceluser.xls' + '' + this.datee + '.xls';
  //         document.body.appendChild(a);
  //         a.click();
  //       });
  //   }
  // }
  selectFileChange(event: any) {
    console.log(event);
    this.selectedFiles = event.target.files;

    this.file = event.target.files[0];
    console.log(this.file, 'FILEEE');

    this._TenantService.resumeParisng(this.file).subscribe(res => {
      this.resumeParsingData = res;
      console.log('resume', this.resumeParsingData);
    });
  }
  selectFormatedFile(event: any) {
    this.selectedFormatedFile = event.target.files;
  }
  clearValidations(){
    this.uploadResumeForm.reset();
  }

  ngOnDestroy() {
    this.subscribe.next();
    this.subscribe.complete();
  }
}
