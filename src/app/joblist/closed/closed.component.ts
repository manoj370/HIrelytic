import { Component, OnInit, OnDestroy } from '@angular/core';
import { JobPostingService } from '../../services/jobposting.service';
import { ReportsService } from '../../services/reports.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-closed',
  templateUrl: './closed.component.html',
  styleUrls: ['./closed.component.css']
})
export class ClosedComponent implements OnInit, OnDestroy {
  jobList: any;
  rowData: any;
  gridOptions: any;
  public pageid: any = 0;
  public rowid: any = 15;
  responsePageCount: any;

  disableNextButton: boolean = false;
  disablePreviousButton: boolean = true;
  pageCount: number = 1;
  datee: string;
  userRoles: any;
  rowClassRules: any;
  rowHeight: number;
  privileges: any;
  authority: any;

  subscribe: Subject<any> = new Subject<any>();
  totalCount: any;

  constructor(private _jobpostingService: JobPostingService, private ReportsService: ReportsService) {
    this.rowHeight = 30;

    this.rowClassRules = {
      'sick-days-warning': function (params) {
        return params.node.rowIndex % 2 !== 0;
      }

    };
  }

  ngOnInit() {
    const privileges = JSON.parse(sessionStorage.getItem('Privileges'));
    privileges.forEach(element => {
      this.privileges = element.authorities;
      this.privileges.forEach((elementt: any) => {
        this.authority = elementt.authorityName;
        if ((this.authority === 'JOBS POSTED BY ME') && (sessionStorage.getItem('userRoles') !== 'ADMIN')) {
          this._jobpostingService.accountJobsStaus(this.pageid, this.rowid, 'CLOSED')
            .pipe(takeUntil(this.subscribe))
            .subscribe(Data => {
              //Open
              console.log(Data);
              this.jobList = Data;
              this.rowData = Data;
              this.responsePageCount = this.jobList[0].pageCount;
              console.log(this.responsePageCount, 'this.jobList');
              console.log(this.rowData);
              this.totalCount=this.jobList[0].jobCount;
              console.log(this.responsePageCount, 'this.jobList');
            }, error => {
              console.log(error);
            });
        } else if (this.authority === 'MANAGE JOBS') {
          this._jobpostingService.getjoblistBystatus(sessionStorage.getItem('tenantId'), this.pageid, this.rowid, 'CLOSED')
            .pipe(takeUntil(this.subscribe))
            .subscribe(Data => {
              //Open
              console.log(Data);
              this.jobList = Data;
              this.rowData = Data;
              this.responsePageCount = this.jobList[0].pageCount;
              console.log(this.responsePageCount, 'this.jobList');
              console.log(this.rowData);
              this.totalCount=this.jobList[0].jobCount;
              console.log(this.responsePageCount, 'this.jobList');
            }, error => {
              console.log(error);
            });
        } else if ((this.authority === 'JOBS ASSIGNED') && (sessionStorage.getItem('userRoles') !== 'ADMIN')) {
          this._jobpostingService.jobsByStatus(this.pageid, this.rowid, 'CLOSED')
            .pipe(takeUntil(this.subscribe))
            .subscribe(Data => {
              //Open
              console.log(Data);
              this.jobList = Data;
              this.rowData = Data;
              this.responsePageCount = this.jobList[0].pageCount;
              console.log(this.responsePageCount, 'this.jobList');
              console.log(this.rowData);
              this.totalCount=this.jobList[0].jobCount;
              console.log(this.responsePageCount, 'this.jobList');
            }, error => {
              console.log(error);
            });
        }
      });
    });

    this.gridOptions = {
      animateRows: true,
      rowData: null,
      columnDefs: this.columnDefs,
      enableColResize: true,
      rowHeight: 35,
      headerHeight: 35,

      paginationNumberFormatter: function (params) {
        return '[' + params.value.toLocaleString() + ']';
      },


    }
    this.gridOptions.rowStyle = { background: '#FFFFFF' };

    this.gridOptions.getRowStyle = function (params) {
      if (params.node.rowIndex % 2 === 0) {
        return { background: '#F8F8F8' }
      }
    };

    this.gridOptions.rowStyle = { background: '#FFFFFF' };

    this.gridOptions.getRowStyle = function (params) {
      if (params.node.rowIndex % 2 === 0) {
        return { background: '#F8F8F8' }
      }
    };
    this.userRoles = sessionStorage.getItem('userRoles');
  }

  columnDefs = [
    {
      headerName: 'Posted',
      cellStyle: { 'text-transform': 'capitalize', 'font-size': '12px' },
      field: 'createdDate', width: 200, unSortIcon: true
    },
    {
      headerName: 'Job Title', cellStyle: { 'text-transform': 'capitalize', 'font-size': '12px' },
      field: 'jobTitle', width: 180,
      rowSelection: 'multiple', unSortIcon: true
    },

    {
      headerName: 'Positions', cellStyle: { 'text-transform': 'capitalize', 'font-size': '12px', 'text-align': 'center' },
      field: 'noOfOpenings', width: 150,
      rowSelection: 'multiple', unSortIcon: true

    },
    {
      headerName: 'Refferal Amount',
      cellStyle: { 'text-transform': 'capitalize', 'font-size': '12px' },
      field: 'referralAmount', width: 200, unSortIcon: true
    },
    { headerName: ' Client Name', field: 'clientName', width: 230, unSortIcon: true, cellStyle: { 'text-transform': 'capitalize', 'font-size': '12px' } },
    { headerName: ' Hiring Manager', field: 'hiringManager', unSortIcon: true, width: 250, cellStyle: { 'text-transform': 'capitalize', 'font-size': '12px' } },
    {
      headerName: 'Status', field: 'hireRequestStatus', width: 230,
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
        return '<span class="rag-element">' + params.value + "</span>";
      }

    },

  ];
  autoGroupColumnDef = {
    headerName: "Posted On date",
    field: "createdTime",
    width: 180,
    cellRenderer: "agGroupCellRenderer",
    cellRendererParams: { checkbox: true }
  };

  // Pagination Purpose
  onBtNext() {

    this.disablePreviousButton = false;
    this.disableNextButton = false;
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

    this.rowData = [];
    console.log('onPaginationPageLoaded', event);
    this.pageid = this.pageid + 1;
    debugger
    const privileges = JSON.parse(sessionStorage.getItem('Privileges'));
    privileges.forEach(element => {
      this.privileges = element.authorities;
      this.privileges.forEach((elementt: any) => {
        this.authority = elementt.authorityName;
        if ((this.authority === 'JOBS POSTED BY ME') && (sessionStorage.getItem('userRoles') !== 'ADMIN')) {
          this._jobpostingService.accountJobsStaus(this.pageid, this.rowid, 'CLOSED')
            .pipe(takeUntil(this.subscribe))
            .subscribe(Data => {
              //Open
              console.log(Data);
              this.jobList = Data;
              this.rowData = Data;
              this.responsePageCount = this.jobList[0].pageCount;
              console.log(this.responsePageCount, 'this.jobList');
              console.log(this.rowData);
              this.totalCount=this.jobList[0].jobCount;
              console.log(this.responsePageCount, 'this.jobList');
            }, error => {
              console.log(error);
            });
        } else if (this.authority === 'MANAGE JOBS') {
          this._jobpostingService.getjoblistBystatus(sessionStorage.getItem('tenantId'), this.pageid, this.rowid, 'CLOSED')
            .pipe(takeUntil(this.subscribe))
            .subscribe(Data => {
              //Open
              console.log(Data);
              this.jobList = Data;
              this.rowData = Data;
              this.responsePageCount = this.jobList[0].pageCount;
              console.log(this.responsePageCount, 'this.jobList');
              console.log(this.rowData);
              this.totalCount=this.jobList[0].jobCount;
              console.log(this.responsePageCount, 'this.jobList');
            }, error => {
              console.log(error);
            });
        } else if ((this.authority === 'JOBS ASSIGNED') && (sessionStorage.getItem('userRoles') !== 'ADMIN')) {
          this._jobpostingService.jobsByStatus(this.pageid, this.rowid, 'CLOSED')
            .pipe(takeUntil(this.subscribe))
            .subscribe(Data => {
              //Open
              console.log(Data);
              this.jobList = Data;
              this.rowData = Data;
              this.responsePageCount = this.jobList[0].pageCount;
              console.log(this.responsePageCount, 'this.jobList');
              console.log(this.rowData);
              this.totalCount=this.jobList[0].jobCount;
              console.log(this.responsePageCount, 'this.jobList');
            }, error => {
              console.log(error);
            });
        }
      });
    });
    // Previous Code
    // this._jobpostingService.getjoblistBystatus(sessionStorage.getItem('tenantId'), this.pageid, this.rowid, 'CLOSED').subscribe(res => {
    //   this.rowData = res;

    // });
  }
  onBtPrevious() {
    this.disableNextButton = false;
    this.pageCount--;
    if (this.pageCount === 1) {
      this.disablePreviousButton = true;
    }
    else {
      this.disablePreviousButton = false;
    }
    console.log('onPaginationPageLoaded', event);
    this.pageid = this.pageid - 1;
    this.rowData = [];
    const privileges = JSON.parse(sessionStorage.getItem('Privileges'));
    privileges.forEach(element => {
      this.privileges = element.authorities;
      this.privileges.forEach((elementt: any) => {
        this.authority = elementt.authorityName;
        if ((this.authority === 'JOBS POSTED BY ME') && (sessionStorage.getItem('userRoles') !== 'ADMIN')) {
          this._jobpostingService.accountJobsStaus(this.pageid, this.rowid, 'CLOSED')
            .pipe(takeUntil(this.subscribe))
            .subscribe(Data => {
              //Open
              console.log(Data);
              this.jobList = Data;
              this.rowData = Data;
              this.responsePageCount = this.jobList[0].pageCount;
              console.log(this.responsePageCount, 'this.jobList');
              console.log(this.rowData);
              this.totalCount=this.jobList[0].jobCount;
              console.log(this.responsePageCount, 'this.jobList');
            }, error => {
              console.log(error);
            });
        } else if (this.authority === 'MANAGE JOBS') {
          this._jobpostingService.getjoblistBystatus(sessionStorage.getItem('tenantId'), this.pageid, this.rowid, 'CLOSED')
            .pipe(takeUntil(this.subscribe))
            .subscribe(Data => {
              //Open
              console.log(Data);
              this.jobList = Data;
              this.rowData = Data;
              this.responsePageCount = this.jobList[0].pageCount;
              console.log(this.responsePageCount, 'this.jobList');
              console.log(this.rowData);
              this.totalCount=this.jobList[0].jobCount;
              console.log(this.responsePageCount, 'this.jobList');
            }, error => {
              console.log(error);
            });
        } else if ((this.authority === 'JOBS ASSIGNED') && (sessionStorage.getItem('userRoles') !== 'ADMIN')) {
          this._jobpostingService.jobsByStatus(this.pageid, this.rowid, 'CLOSED')
            .pipe(takeUntil(this.subscribe))
            .subscribe(Data => {
              //Open
              console.log(Data);
              this.jobList = Data;
              this.rowData = Data;
              this.responsePageCount = this.jobList[0].pageCount;
              console.log(this.responsePageCount, 'this.jobList');
              console.log(this.rowData);
              this.totalCount=this.jobList[0].jobCount;
              console.log(this.responsePageCount, 'this.jobList');
            }, error => {
              console.log(error);
            });
        }
      });
    });
    // Previous Code
    // this._jobpostingService.getjoblistBystatus(sessionStorage.getItem('tenantId'), this.pageid, this.rowid, 'CLOSED').subscribe(res => {
    //   this.rowData = res;
    // });
  }
  downloadClosedJobReportPdf() {
    let date: Date = new Date();

    this.datee = date.getFullYear().toString()
      + '-' + ('0' + (date.getMonth() + 1).toString()).slice(-2) +
      '-' + ('0' + (date.getDate()).toString()).slice(-2);
    console.log(this.datee);
    if (this.userRoles == 'ADMIN') {
      this.ReportsService.downloadClosedJobReportPdf()
        .pipe(takeUntil(this.subscribe))
        .subscribe(res => {
          let blob = res;
          let a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = 'closedJobsPdf.pdf' + ' ' + this.datee + '.pdf';
          document.body.appendChild(a);
          a.click();

        });
    }
    else {
      this.ReportsService.downloadClosedJobReportPdf()
        .pipe(takeUntil(this.subscribe))
        .subscribe(res => {
          const blob = res;
          const a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = 'closedJobsPdfuser.pdf' + '' + this.datee + '.pdf';
          document.body.appendChild(a);
          a.click();
        });
    }
  }
  downloadClosedExcelReportJobsReport() {
    let date: Date = new Date();

    this.datee = date.getFullYear().toString() + '-' + ('0' + (date.getMonth() + 1).toString()).slice(-2) + '-' + ('0' + (date.getDate()).toString()).slice(-2);
    console.log(this.datee);
    if (this.userRoles == 'ADMIN') {

      this.ReportsService.downloadClosedExcelReportJobsReport()
        .pipe(takeUntil(this.subscribe))
        .subscribe(res => {

          let blob = res;
          let a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = 'closedJobsExcel.xls' + '' + this.datee + '.xls';
          document.body.appendChild(a);
          a.click();

        });
    }
    else {
      this.ReportsService.downloadClosedExcelReportJobsReport()
        .pipe(takeUntil(this.subscribe))
        .subscribe(res => {
          const blob = res;
          const a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = 'holdJobsExceluser.xls' + '' + this.datee + '.xls';
          document.body.appendChild(a);
          a.click();
        });
    }
  }
  ngOnDestroy() {
    this.subscribe.next();
    this.subscribe.complete();
  }

}

