import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../services/reports.service';
import jsPDF from 'jspdf';
import { Chart } from 'chart.js';
// import * as CanvasJS from '../assets/canvasjs.min';
import html2canvas from 'html2canvas';
import { IfStmt } from '@angular/compiler';
import { truncateSync } from 'fs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  teamPerformanceColumns = [
    {
      headerName: 'Name', field: 'Name', width: 150, rowSelection: 'multiple', minWidth: 70, unSortIcon:true


    },
    { headerName: 'Email Id', field: 'email_id', width: 150, rowSelection: 'multiple', minWidth: 70 },
    { headerName: 'Phone Number', field: 'phone_number', width: 150, rowSelection: 'multiple', minWidth: 70 },
    { headerName: 'Experience', field: 'experience', width: 150, rowSelection: 'multiple', minWidth: 70, cellStyle: { textAlign: "center" } },
    { headerName: 'Skills', field: 'skill', width: 150, rowSelection: 'multiple', minWidth: 70 },
    { headerName: 'Current Location', field: 'current_location', width: 150, rowSelection: 'multiple', minWidth: 70 },
    { headerName: 'Current CTC', field: 'current_ctc', width: 150, rowSelection: 'multiple', minWidth: 70, cellStyle: { textAlign: "center" } },
    { headerName: 'Expected CTC', field: 'expected_ctc', width: 150, rowSelection: 'multiple', minWidth: 70, cellStyle: { textAlign: "center" } },
    { headerName: 'Notice Period', field: 'notice_period', width: 150, rowSelection: 'multiple', minWidth: 70, cellStyle: { textAlign: "center" } },
    { headerName: 'Recruiter Name', field: 'RecruiterName', width: 150, rowSelection: 'multiple', minWidth: 70 },
    { headerName: 'Hiring Manager', field: 'hiring_manager', width: 150, rowSelection: 'multiple', minWidth: 70 },

    { headerName: 'Status', field: 'candidate_profile_status', width: 150, rowSelection: 'multiple', minWidth: 70 },


    { headerName: 'Current Company', field: 'current_company', width: 150, rowSelection: 'multiple', minWidth: 70 },




  ];
  openPositionsColumns =
    [

      { headerName: 'Requisition Date', headerClass: 'ctHeader', field: 'createdDate', minWidth: 70, width: 200 },
      { headerName: 'Skill', field: 'jobTitle', width: 200, rowSelection: 'multiple', minWidth: 70 },
      { headerName: ' Hiring Manager', field: 'hiringManager', width: 200, rowSelection: 'multiple', minWidth: 70 },

      { headerName: ' Client Name', field: 'clientName', width: 200, rowSelection: 'multiple', minWidth: 70 },

      { headerName: 'No Of Positions', field: 'noOfOpenings', width: 200, rowSelection: 'multiple', minWidth: 70, cellStyle: { textAlign: "center" } },

      { headerName: 'Status', field: 'hireRequestStatus', width: 200, rowSelection: 'multiple', minWidth: 70 },
    ];
  performaneTrackerColumns =
    [

      //{ headerName: 'Requisition Date', pinned: 'left', headerClass: 'ctHeader', field: 'createdTime', minWidth: 70, width: 200 },
      { headerName: 'Candidate Name', field: 'first_name', width: 150, rowSelection: 'multiple', minWidth: 70 },
      { headerName: 'Hiring Manager', field: 'hiring_manager', width: 150, rowSelection: 'multiple', minWidth: 70 },

      { headerName: 'Practice', field: 'skill', width: 150, rowSelection: 'multiple', minWidth: 70 },
      { headerName: 'Status', field: 'candidate_profile_status', width: 150, rowSelection: 'multiple', minWidth: 70 },
      { headerName: 'Phone Number', field: 'phone_number', width: 150, rowSelection: 'multiple', minWidth: 70 },
      { headerName: 'Experience', field: 'experience', width: 150, rowSelection: 'multiple', minWidth: 70 },
      { headerName: 'Current Company', field: 'current_company', width: 150, rowSelection: 'multiple', minWidth: 70 },
      { headerName: 'Current Location', field: 'current_location', width: 150, rowSelection: 'multiple', minWidth: 70 },
      { headerName: 'Current CTC', field: 'current_ctc', width: 150, rowSelection: 'multiple', minWidth: 70 },
      { headerName: 'Expected CTC', field: 'expected_ctc', width: 150, rowSelection: 'multiple', minWidth: 70 },
      { headerName: 'Notice Period', field: 'notice_period', width: 150, rowSelection: 'multiple', minWidth: 70 },

      { headerName: 'Email Id', field: 'email_id', width: 150, rowSelection: 'multiple', minWidth: 70 },




    ];
  recruiterPerformaneColumns =
    [

      { headerName: 'Recruiter Name', field: 'RecruiterName', width: 150, rowSelection: 'multiple', minWidth: 70, sort: "asc" },
      { headerName: 'Offered', field: 'OFFERED', width: 85, rowSelection: 'multiple', minWidth: 85, cellStyle: { textAlign: "center" } },
      { headerName: 'No Show', field: 'NO_SHOW', width: 90, rowSelection: 'multiple', minWidth: 90, cellStyle: { textAlign: "center" } },
      { headerName: 'Interview Scheduled', field: 'INTERVIEW_SCHEDULED', width: 150, rowSelection: 'multiple', minWidth: 150, cellStyle: { textAlign: "center" } },
      { headerName: 'Position Closed', field: 'POSITION_CLOSED', width: 150, rowSelection: 'multiple', minWidth: 150, cellStyle: { textAlign: "center" } },
      { headerName: 'Drop-out', field: 'DROP_OUT', width: 120, rowSelection: 'multiple', minWidth: 120, cellStyle: { textAlign: "center" } },
      { headerName: 'Shortlisted', field: 'SHORTLISTED', width: 100, rowSelection: 'multiple', minWidth: 100, cellStyle: { textAlign: "center" } },

      { headerName: 'Screening Reject', field: 'SCREENING_REJECT', width: 150, rowSelection: 'multiple', minWidth: 150, cellStyle: { textAlign: "center" } },
      { headerName: 'Position On Hold', field: 'POSITION_ON_HOLD', width: 150, rowSelection: 'multiple', minWidth: 150, cellStyle: { textAlign: "center" } },
      { headerName: '1st Level Reject', field: 'FIRST_LEVEL_REJECT', width: 140, rowSelection: 'multiple', minWidth: 140, cellStyle: { textAlign: "center" } },
      { headerName: 'Joined', field: 'JOINED', width: 85, rowSelection: 'multiple', minWidth: 85, cellStyle: { textAlign: "center" } },
      { headerName: 'Awaiting For The Feedback', field: 'AWAITING_FOR_THE_FEEDBACK', width: 150, rowSelection: 'multiple', minWidth: 70, cellStyle: { textAlign: "center" } },
      // { headerName: 'Absconded', field: 'ABSCONDED', width: 120, rowSelection: 'multiple', minWidth: 120, cellStyle:{textAlign: "center"}  },
      { headerName: 'Submitted To Client', field: 'SUBMITTED_TO_CLIENT', width: 150, rowSelection: 'multiple', minWidth: 150, cellStyle: { textAlign: "center" } },
      { headerName: '2nd Level Reject', field: 'SECOND_LEVEL_REJECT', width: 150, rowSelection: 'multiple', minWidth: 150, cellStyle: { textAlign: "center" } },
      { headerName: 'Submitted', field: 'SUBMITTED', width: 100, rowSelection: 'multiple', minWidth: 100, cellStyle: { textAlign: "center" } },
      // { headerName: 'Rejected', field: 'REJECTED', width: 100, rowSelection: 'multiple', minWidth: 100, cellStyle:{textAlign: "center"}  },
    ];

  submittedToClientColumns =
    [
      { headerName: 'First Name', field: 'first_name', width: 150, rowSelection: 'multiple', minWidth: 70 },
      { headerName: 'Last Name', field: 'last_name', width: 150, rowSelection: 'multiple', minWidth: 70 },
      { headerName: 'Hiring Manager', field: 'hiring_manager', width: 150, rowSelection: 'multiple', minWidth: 70 },
      { headerName: 'Recruiter Name', field: 'RecruiterName', width: 150, rowSelection: 'multiple', minWidth: 70 },
      { headerName: 'Practice', field: 'skill', width: 150, rowSelection: 'multiple', minWidth: 70 },
      { headerName: 'Job Title', field: 'job_title', width: 150, rowSelection: 'multiple', minWidth: 70 },
      { headerName: 'Status', field: 'candidate_profile_status', width: 150, rowSelection: 'multiple', minWidth: 70 },
      { headerName: 'Experience', field: 'experience', width: 150, rowSelection: 'multiple', minWidth: 70 },
      { headerName: 'Notice Period', field: 'notice_period', width: 150, rowSelection: 'multiple', minWidth: 70 },
      { headerName: 'Phone Number', field: 'phone_number', width: 150, rowSelection: 'multiple', minWidth: 70 },
      { headerName: 'Email Id', field: 'email_id', width: 150, rowSelection: 'multiple', minWidth: 70 },
      { headerName: 'Current Company', field: 'current_company', width: 150, rowSelection: 'multiple', minWidth: 70 },
      { headerName: 'Current Location', field: 'current_location', width: 150, rowSelection: 'multiple', minWidth: 70 },
      { headerName: 'Current CTC', field: 'current_ctc', width: 150, rowSelection: 'multiple', minWidth: 70 },


    ];

  recMetricsCol = [
    { headerName: 'Status', field: 'first_name', width: 150, rowSelection: 'multiple', minWidth: 70 },
    { headerName: 'Count', field: 'last_name', width: 150, rowSelection: 'multiple', minWidth: 70 },

  ];

  joineesColumns = [
    { headerName: 'Name', field: 'name', width: 150, rowSelection: 'multiple', minWidth: 70 },
    { headerName: 'Email Id', field: 'email_id', width: 200, rowSelection: 'multiple', minWidth: 70 },
    { headerName: 'Skill', field: 'skill', width: 150, rowSelection: 'multiple', minWidth: 70 },
    { headerName: 'Phone Number', field: 'phone_number', width: 150, rowSelection: 'multiple', minWidth: 70 },
    { headerName: 'Experience', field: 'experience', width: 150, rowSelection: 'multiple', minWidth: 70 },
    { headerName: 'Current Location', field: 'current_location', width: 180, rowSelection: 'multiple', minWidth: 100 },
    { headerName: 'Date Of Joining', field: 'date_of_joining', width: 150, rowSelection: 'multiple', minWidth: 70 },
    { headerName: 'Recruiter Name', field: 'RecruiterName', width: 150, rowSelection: 'multiple', minWidth: 70 },
  ]
  teamPerformanceData: any;
  openPositionsData: any;
  performaneTrackerData: any;
  recruiterPerformanceData: any;
  getRecruiterReportData: any;
  GridApi: any;
  myText: string;
  recMetricsData: any = [];
  doughnutChart = [];
  gridOptions: any;
  GridApiOpenPos: any;
  GridApiReport: any;
  GridApiOpenTracker: any;
  searchvalue: any;
  searchvalueTeamPerform: any;
  searchvalueReport: any;
  searchvalueOpenPos: any;
  searchvalueTracker: any;
  tentId: string;
  individualRecruiterChart: any;

  MonthWiseRecMetricsData: any = [];
  userRoles: string;
  individualRecReport: any = [];
  SubmittedToClientReport: any;
  userId: string;
  RecruiterId: string;
  recruiterNames: any;
  recruiterid: any;
  recruiterPerformanceDataaa: any;
  defaultindvidualrec: any;
  CandidateName: string;
  recMetricsDataForReports: any;
  GridApiRecPerformance: any;
  joineeAdmin: any = [];
  joineesUser: any = [];
  datee: string;
  totalrecMetrics: any;
  recruiterData: any[];
  recruterDataProvider: any[];
  nodata: string;
  noData: string;
  monthWiseData: any = [];
  monthArray: any = [];
  individaulaRecruiterData: any[];
  totalcount: number = 0;
  GridApiJoineesReport: any;


  constructor(private _ReportsService: ReportsService) { }

  ngOnInit() {
    debugger
    // calcuting the percentages
    console.log((15 / 200) * 100);
    this.listOfRecruiters();
    this.defaultIndividualRecruiter();

    this.defaultIndividualRecruiterr();
    this.IndividualRecruiterPerformanceChartAlphabetical();
    this.userRoles = sessionStorage.getItem('userRoles')
    let tenId = sessionStorage.getItem("");
    this.tentId = tenId;

    // this.getOpenPositionReport();
    this.getRecMetrics();
    // this.getTeamPerformanceReport();
    // this.getPerformanceTrackerReport();
    // this.getRecruiterPerformanceReport();
    // this.getMonthWiseRecMetrics();
    // this.getReportForSubmittedToClient();
    this.gridOptions = {
      animate: true,
      enableColResize: true,
      columnDefs: this.teamPerformanceColumns,
      rowData: null,
      rowHeight: 35,
      headerHeight: 35,
    }
    this.gridOptions.rowStyle = { background: '#FFFFFF' };

    this.gridOptions.getRowStyle = function (params) {
      if (params.node.rowIndex % 2 === 0) {
        return { background: '#F8F8F8' }
      }
    };
  }
  public onGridReadyforTeamPerformance(param): void {
    this.GridApi = param.api;
    this.GridApi.sizeColumnsToFit();
    window.onresize = () => {
      this.GridApi.sizeColumnsToFit();
    }
  }
  public onGridReadyRecPerformance(param): void {
    this.GridApiRecPerformance = param.api;
    this.GridApiRecPerformance.sizeColumnsToFit();
    window.onresize = () => {
      this.GridApiRecPerformance.sizeColumnsToFit();
    }
  }
  public GridForJoineesReport(param): void {
    this.GridApiJoineesReport = param.api;
    this.GridApiJoineesReport.sizeColumnsToFit();
    window.onresize = () => {
      this.GridApiJoineesReport.sizeColumnsToFit();
    }
  }
  quickSearchTeamPerformance() {
    this.GridApi.setQuickFilter(this.searchvalueTeamPerform);
  }


  // public onGridReadyForTeamReport(param): void {
  //   this.GridApiReport = param.api;
  //   this.GridApiReport.sizeColumnsToFit();
  //   window.onresize = () => {
  //     this.GridApiReport.sizeColumnsToFit();
  //   }
  // }
  // quickSearchTeamReport()
  // {
  //   this.GridApiReport.setQuickFilter(this.searchvalueReport);
  // }


  public onGridReadyForOpenPosition(param): void {
    this.GridApiOpenPos = param.api;
    this.GridApiOpenPos.sizeColumnsToFit();
    window.onresize = () => {
      this.GridApiOpenPos.sizeColumnsToFit();
    }
  }
  quickSearchOpenPosition() {
    this.GridApiOpenPos.setQuickFilter(this.searchvalueOpenPos);
  }
  public onGridReadyTracker(param): void {
    this.GridApiOpenTracker = param.api;
    this.GridApiOpenTracker.sizeColumnsToFit();
    window.onresize = () => {
      this.GridApiOpenTracker.sizeColumnsToFit();
    }
  }
  quickSearchTracker() {
    this.GridApiOpenTracker.setQuickFilter(this.searchvalueTracker);
  }

  // public onGridReadyy(param) : void {
  //   this.GridApi = param.api;
  //   this.GridApi.sizeColumnsToFit();
  //   window.onresize = () => {
  //       this.GridApi.sizeColumnsToFit();
  //   }
  // }

  //To get team performance report
  getTeamPerformanceReport() {
    debugger
    if (this.userRoles == 'ADMIN') {
      this._ReportsService.getPerformanceReport().subscribe(res => {
        console.log('teamPer', res)
        this.teamPerformanceData = res;
        // this.CandidateName = this.teamPerformanceData.first_name + " " + this.teamPerformanceData.last_name;
      });
    }
    else {

      this._ReportsService.getPerformanceReport().subscribe(res => {
        console.log('teamPer', res)
        this.teamPerformanceData = res;
      });
    }


  }
  //To get open position report
  getOpenPositionReport() {
    debugger
    if (this.userRoles == 'ADMIN') {
      this._ReportsService.getOpenPositionReport().subscribe(res => {

        this.openPositionsData = res;
        console.log('OpenPosition', res)
      },

      );
    }
    else {

      this._ReportsService.getOpenPositionReport().subscribe(res => {
        console.log('OpenPositionforRecruiter', res)
        this.openPositionsData = res;

      },

      );
    }
    //  else if(this.userRoles=='Vendor Recruitment')
    //  {
    //   this._ReportsService.getOpenPositionReport(sessionStorage.getItem('tenantId'),sessionStorage.getItem('userId')).subscribe(res => {
    //     console.log('OpenPositionforVendor', res)
    //     this.openPositionsData = res;

    //   },

    //   );
    //  }
  }
  //To get Performance Tracker report
  // getPerformanceTrackerReport() {
  //   if(this.userRoles=='ADMIN')
  //   {
  //     this._ReportsService.getPerformanceTrackerReport(sessionStorage.getItem('tenantId')).subscribe(res => {
  //       console.log('performanceTracker', res)
  //       this.performaneTrackerData = res;

  //     },

  //     );
  //   }
  //   else{
  //     this._ReportsService.getPerformanceTrackerReport(sessionStorage.getItem('tenantId'),sessionStorage.getItem('userId')).subscribe(res => {
  //       console.log('performanceTracker', res)
  //       this.performaneTrackerData = res;

  //     },

  //     );
  //   }


  // }
  //To get Recruiter Performance Report
  getRecruiterPerformanceReport() {
    debugger
    if (this.userRoles == 'ADMIN') {
      this._ReportsService.getRecruiterReport().subscribe(res => {
        console.log('getRecruiterReport', res)
        this.recruiterPerformanceData = res;

      })

    }

  }




  // }
  // To get recruitemnt metrics report
  getRecMetrics() {
    if (this.userRoles == 'ADMIN') {
      this._ReportsService.getRecruitmentMetrics().subscribe(res => {
        console.log('getRecruitmentMetricsAAA', res)
        this.recMetricsData = res;

        console.log(this.recMetricsData, 'this.recMetricsData')
        if (this.recMetricsData.length !== 0) {
          this.recruterPie();
        } else {
          this.noData = 'No Available Data to Preview';
        }
      }, error => {
        console.log(error);
      });


    }
    else {
      this._ReportsService.getRecruitmentMetrics().subscribe(res => {
        console.log('getRecruitmentMetricsRecruiter', res)
        this.recMetricsData = res;

        console.log(this.recMetricsData, 'this.recMetricsData')
        if (this.recMetricsData.length !== 0) {
          this.recruterPie();
        } else {
          this.noData = 'No Available Data to Preview';
        }
      }, error => {
        console.log(error);
      });

    }
  }

  recruterPie() {
    const barchart = am4core.create('canvas2', am4charts.PieChart);
    // Add and configure Series
    const pieSeries = barchart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = 'Count';
    pieSeries.dataFields.category = 'Status';


    // Let's cut a hole in our Pie chart the size of 30% the radius
    barchart.innerRadius = am4core.percent(10);

    // Put a thick white border around each Slice
    pieSeries.slices.template.stroke = am4core.color('#fff');
    pieSeries.labels.template.disabled = true;
    pieSeries.slices.template.strokeWidth = 1;
    pieSeries.slices.template.strokeOpacity = 1;
    pieSeries.slices.template
      // change the cursor on hover to make it apparent the object can be interacted with
      .cursorOverStyle = [
        {
          'property': 'cursor',
          'value': 'pointer'
        }
      ];

    // For Percentages
    // pieSeries.ticks.template.disabled = true;
    // pieSeries.alignLabels = false;
    // pieSeries.labels.template.text = "{value.percent.formatNumber('#.0')}%";
    // pieSeries.labels.template.radius = am4core.percent(-40);
    // pieSeries.labels.template.fill = am4core.color("white");
    // pieSeries.labels.template.relativeRotation = 90;


    // Create a base filter effect (as if it's not there) for the hover to return to
    const shadow = pieSeries.slices.template.filters.push(new am4core.DropShadowFilter);
    shadow.opacity = 0;

    // Create hover state
    const hoverState = pieSeries.slices.template.states.getKey('hover');
    // normally we have to create the hover state, in this case it already exists

    // Slightly shift the shadow and make it more prominent on hover
    const hoverShadow = hoverState.filters.push(new am4core.DropShadowFilter);
    hoverShadow.opacity = 0.7;
    hoverShadow.blur = 5;
    console.log(this.recMetricsData);
    //RecruiterId
    let total = 0;
    for (const key in this.recMetricsData[0]) {
      if ((key !== 'RecruiterId') && (key !== 'RecruiterName'))
        total += this.recMetricsData[0][key];
    }
    this.totalcount = total;
    console.log('total', total);
    // barchart.legend = new am4charts.Legend();
    // tslint:disable-next-line: forin
    this.recruiterData = [];
    for (const key in this.recMetricsData[0]) {
      this.recruiterData.push({
        'Status': key,
        'Count': this.recMetricsData[0][key],
      });
    }
    for (let i = 0; i <= this.recruiterData.length; i++) {
      if ((this.recruiterData[i].Status === 'RecruiterId')) {
        this.recruiterData.splice(i, 1);
        i = this.recruiterData.length;
      }
    }
    for (let i = 0; i <= this.recruiterData.length; i++) {
      if ((this.recruiterData[i].Status === 'RecruiterName')) {
        this.recruiterData.splice(i, 1);
        i = this.recruiterData.length;
      }
    }

    barchart.data = this.recruiterData;

    // Enable export
    barchart.exporting.menu = new am4core.ExportMenu();
    let title = barchart.titles.create();
    title.text = "Report";

    // var msgTotal = this.recruiterData.reduce(function (prev, cur) {
    //   return prev.Count + cur.Count;
    // }, 0);
    // console.log('Total Messages:', msgTotal); // Total Messages: 461

    // this.totalcount = msgTotal;
    // console.log('Total:', this.totalcount)


  }


  public getcolur(num) {
    var colors = [];
    while (colors.length < num) {
      do {
        var color = Math.floor((Math.random() * 1000000) + 1);
      } while (colors.indexOf(color) >= 0);
      colors.push("#5363bb",
        "  #00bada",
        "#f6d27d",
        "#ec449b",
        " #e269b0",
        "  #36c2cf",
        "#f16b81",
        "#1e6ce0",
        " #e69118",
        "#5473e8");
    }
    return colors;
  }
  getMonthWiseRecMetrics() {

    if (this.userRoles == 'ADMIN') {
      this._ReportsService.getMonthWiseRecruitmentMetrics().subscribe(res => {
        console.log('getMonthWiseRecruitmentMetrics', res)
        this.MonthWiseRecMetricsData = res;

        console.log(this.MonthWiseRecMetricsData, 'this.MonthWiseRecMetricsData')
        if (this.MonthWiseRecMetricsData.length !== 0) {
          this.joineePie();
        } else {
          this.noData = 'No Available Data to Preview';
        }
      }, error => {
        console.log(error);
      });

    } else {
      this._ReportsService.getMonthWiseRecruitmentMetrics().subscribe(res => {
        console.log('getMonthWiseRecruitmentMetricsForIndividualUser', res)
        this.MonthWiseRecMetricsData = res;
        console.log('monthwisemetrics', this.MonthWiseRecMetricsData.length)
        if (this.MonthWiseRecMetricsData.length !== 0) {
          this.joineePie();
        } else {
          this.noData = 'No Available Data to Preview';
        }
      }, error => {
        console.log(error);
      });
    }
  }


  joineePie() {
    const barchart = am4core.create('chartdiv', am4charts.PieChart);
    // Add and configure Series
    const pieSeries = barchart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = 'joinees';
    pieSeries.dataFields.category = 'Month';
    // Let's cut a hole in our Pie chart the size of 30% the radius
    barchart.innerRadius = am4core.percent(10);

    // Put a thick white border around each Slice
    pieSeries.slices.template.stroke = am4core.color('#fff');
    pieSeries.slices.template.strokeWidth = 1;
    pieSeries.slices.template.strokeOpacity = 1;
    pieSeries.slices.template
      // change the cursor on hover to make it apparent the object can be interacted with
      .cursorOverStyle = [
        {
          'property': 'cursor',
          'value': 'pointer'
        }
      ];

    // For Percentages
    pieSeries.ticks.template.disabled = true;
    pieSeries.alignLabels = false;
    pieSeries.labels.template.text = "{value.percent.formatNumber('#.0')}%";
    pieSeries.labels.template.radius = am4core.percent(-40);
    pieSeries.labels.template.fill = am4core.color("white");
    pieSeries.labels.template.relativeRotation = 90;

    // Create a base filter effect (as if it's not there) for the hover to return to
    const shadow = pieSeries.slices.template.filters.push(new am4core.DropShadowFilter);
    shadow.opacity = 0;

    // Create hover state
    const hoverState = pieSeries.slices.template.states.getKey('hover');
    // normally we have to create the hover state, in this case it already exists

    // Slightly shift the shadow and make it more prominent on hover
    const hoverShadow = hoverState.filters.push(new am4core.DropShadowFilter);
    hoverShadow.opacity = 0.7;
    hoverShadow.blur = 5;

    // tslint:disable-next-line: forin
    this.monthArray = [];
    this.MonthWiseRecMetricsData.forEach(ele => {
      const monthobj = {
        Month: ele.Month,
        joinees: ele.joinees,

      };
      this.monthArray.push(monthobj);
      console.log(this.monthArray);
    });
    barchart.data = this.monthArray;
    // Enable export
    barchart.exporting.menu = new am4core.ExportMenu();
    let title = barchart.titles.create();
    title.text = "Joinees Report(Month Wise)";
  }


  // Export grid data in pdf and excel format
  uri = 'data:application/vnd.ms-excel;base64,';
  template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'

  base64(s: any) {
    return window.btoa(s);
  }
  format(s, c) {
    return s.replace(/{(\w+)}/g, function (m, p) {
      return c[p];
    })
  }
  tableToExcel(temp, worksheetName) {
    var table = temp,
      ctx = { worksheet: worksheetName, table: table },
      href = this.uri + this.base64(this.format(this.template, ctx));
    return href;
  };


  //RECRUITER REPORT PDF
  public exportexcelReport(selectedformat: any) {

    this.myText = "RecruiterTeamPerfomance";
    var template = '<table>', thead = '', tbody = '', caption = '<h4><center>' + this.myText + '</center></h4>';
    // removal of headerName if having the corresponding values are empty.
    var array: any = this.GridApiRecPerformance.getDataAsCsv().split('\n')[0].split(',');
    var aa = this.GridApiRecPerformance.getDataAsCsv().split('\n').slice(1);
    var header = array.map(function (name, index) {
      var count = 0;
      aa.map(function (str, ia) {
        str.split(',').map(function (value, i) {
          if (value.length == 2 && (index == i)) {
            count += 1;
          }
        });
      });
      if (aa.length == count) {
        name = false;
      }
      return name;
    });



    var indexes = header.map(function (value, index) {
      if (!value) { return index; }
    }).filter(function (value) {
      if (value !== undefined) { return value; }
    });

    var body = aa.map(function (str) {
      return str.split(',').map(function (value: any, index) {
        if (indexes.indexOf(index) !== -1) {
          value = false;
        }
        return value;
      })
    }).map(function (arr) {
      return arr.filter(function (name) { return name; })
    });

    header = header.filter(function (value) {
      return value;
    });

    var finalRes = [];
    // delete finalRes[0][0];
    finalRes.push(header);

    body.map(function (arr) {
      finalRes.push(arr);
    });


    finalRes.map(function (row, index) {
      var tBodyRow = '';
      row.map(function (name, i) {
        name = name.substr(1, name.length - 2);
        name = name.replace('"', '');
        var str;
        if (index == 0) {
          str = '<th>' + name + '</th>';
          thead = thead.concat(str);
        } else {
          str = '<td>' + name + '</td>';
          tBodyRow = tBodyRow.concat(str);
        }
      });
      if (index == 0) {
        thead = '<thead><tr>' + thead + '</tr></thead>';
      } else {
        tbody = tbody.concat('<tr>' + tBodyRow + '</tr>');
      }

    });
    tbody = '<tbody>' + tbody + '</tbody>';
    if (selectedformat == 'Excel') {
      var exportHref = this.tableToExcel(template + caption + thead + tbody + '</table>', "RecruiterTeamPerfomance");
      var a = document.createElement('a');
      a.download = "RecruiterTeamPerfomance";
      a.href = exportHref;
      setTimeout(function () {
        a.click();
      }, 100);
    }







    /*export to PDF*/

    if (selectedformat == 'PDF') {
      var that = this;
      var columns = [];
      var rows = [];
      // removal of headerName if having the corresponding values are empty.
      var array: any = this.GridApiRecPerformance.getDataAsCsv().split('\n')[0].split(',');
      var aa = this.GridApiRecPerformance.getDataAsCsv().split('\n').slice(1);
      var header = array.map(function (name, index) {
        var count = 0;
        aa.map(function (str, ia) {
          str.split(',').map(function (value, i) {
            if (value.length == 2 && (index == i)) {
              count += 1;
            }
          });
        });
        if (aa.length == count) {
          name = false;
        }
        return name;
      });


      var indexes = header.map(function (value, index) {
        if (!value) { return index; }
      }).filter(function (value) {
        if (value !== undefined) { return value; }
      });

      var body = aa.map(function (str) {
        return str.split(',').map(function (value: any, index) {
          if (indexes.indexOf(index) !== -1) {
            value = false;
          }
          return value;
        })
      }).map(function (arr) {
        return arr.filter(function (name) { return name; })
      });

      header = header.filter(function (value) {
        return value;
      });

      var finalRes = [];
      finalRes.push(header);
      body.map(function (arr) {
        finalRes.push(arr);
      });



      finalRes.map(function (row, index) {
        var rowData = {};
        row.map(function (name, i) {
          name = name.substr(1, name.length - 2);
          name = name.replace('"', '');
          var obj = {
            title: name,
            dataKey: name
          }
          if (index == 0) {
            columns.push(obj);
          } else {
            var rowDataKeys = columns.map(function (obj) {
              return obj.dataKey;
            });

            rowData[rowDataKeys[i]] = name;
          }
        });

        if (index) {
          rows.push(rowData);
        }


      })

      // Only pt supported (not mm or in)
      var doc = new jsPDF({
        orientation: 'l',
        unit: 'mm',
        format: 'a3',
        compress: true,
        fontSize: 15,
        lineHeight: 1,
        autoSize: true,
        printHeaders: true
      });

      doc.autoTable(columns, rows, {
        styles: { overflow: 'linebreak' },
        margin: { top: 20 },
        addPageContent: function (data) {
          doc.text("RecruiterTeamPerfomance", 150, 10);
        }
      });
      doc.save("RecruiterTeamPerfomance");
    }

  }




  //Candidate Report

  public exportexcel(selectedformat: any) {

    this.myText = "All Candidate Details";
    var template = '<table>', thead = '', tbody = '', caption = '<h4><center>' + this.myText + '</center></h4>';
    // removal of headerName if having the corresponding values are empty.
    var array: any = this.GridApi.getDataAsCsv().split('\n')[0].split(',');
    var aa = this.GridApi.getDataAsCsv().split('\n').slice(1);
    var header = array.map(function (name, index) {
      var count = 0;
      aa.map(function (str, ia) {
        str.split(',').map(function (value, i) {
          if (value.length == 2 && (index == i)) {
            count += 1;
          }
        });
      });
      if (aa.length == count) {
        name = false;
      }
      return name;
    });



    var indexes = header.map(function (value, index) {
      if (!value) { return index; }
    }).filter(function (value) {
      if (value !== undefined) { return value; }
    });

    var body = aa.map(function (str) {
      return str.split(',').map(function (value: any, index) {
        if (indexes.indexOf(index) !== -1) {
          value = false;
        }
        return value;
      })
    }).map(function (arr) {
      return arr.filter(function (name) { return name; })
    });

    header = header.filter(function (value) {
      return value;
    });

    var finalRes = [];
    // delete finalRes[0][0];
    finalRes.push(header);

    body.map(function (arr) {
      finalRes.push(arr);
    });


    finalRes.map(function (row, index) {
      var tBodyRow = '';
      row.map(function (name, i) {
        name = name.substr(1, name.length - 2);
        name = name.replace('"', '');
        var str;
        if (index == 0) {
          str = '<th>' + name + '</th>';
          thead = thead.concat(str);
        } else {
          str = '<td>' + name + '</td>';
          tBodyRow = tBodyRow.concat(str);
        }
      });
      if (index == 0) {
        thead = '<thead><tr>' + thead + '</tr></thead>';
      } else {
        tbody = tbody.concat('<tr>' + tBodyRow + '</tr>');
      }

    });
    tbody = '<tbody>' + tbody + '</tbody>';
    if (selectedformat == 'Excel') {
      var exportHref = this.tableToExcel(template + caption + thead + tbody + '</table>', "AllCandidates");
      var a = document.createElement('a');
      a.download = "AllCandidateDetails";
      a.href = exportHref;
      setTimeout(function () {
        a.click();
      }, 100);
    }







    /*export to PDF*/

    if (selectedformat == 'PDF') {
      var that = this;
      var columns = [];
      var rows = [];
      // removal of headerName if having the corresponding values are empty.
      var array: any = this.GridApi.getDataAsCsv().split('\n')[0].split(',');
      var aa = this.GridApi.getDataAsCsv().split('\n').slice(1);
      var header = array.map(function (name, index) {
        var count = 0;
        aa.map(function (str, ia) {
          str.split(',').map(function (value, i) {
            if (value.length == 2 && (index == i)) {
              count += 1;
            }
          });
        });
        if (aa.length == count) {
          name = false;
        }
        return name;
      });


      var indexes = header.map(function (value, index) {
        if (!value) { return index; }
      }).filter(function (value) {
        if (value !== undefined) { return value; }
      });

      var body = aa.map(function (str) {
        return str.split(',').map(function (value: any, index) {
          if (indexes.indexOf(index) !== -1) {
            value = false;
          }
          return value;
        })
      }).map(function (arr) {
        return arr.filter(function (name) { return name; })
      });

      header = header.filter(function (value) {
        return value;
      });

      var finalRes = [];
      finalRes.push(header);
      body.map(function (arr) {
        finalRes.push(arr);
      });



      finalRes.map(function (row, index) {
        var rowData = {};
        row.map(function (name, i) {
          name = name.substr(1, name.length - 2);
          name = name.replace('"', '');
          var obj = {
            title: name,
            dataKey: name
          }
          if (index == 0) {
            columns.push(obj);
          } else {
            var rowDataKeys = columns.map(function (obj) {
              return obj.dataKey;
            });

            rowData[rowDataKeys[i]] = name;
          }
        });

        if (index) {
          rows.push(rowData);
        }


      })

      // Only pt supported (not mm or in)
      var doc = new jsPDF({
        orientation: 'l',
        unit: 'mm',
        format: 'a3',
        compress: true,
        fontSize: 15,
        lineHeight: 1,
        autoSize: true,
        printHeaders: true
      });

      doc.autoTable(columns, rows, {
        styles: { overflow: 'linebreak' },
        margin: { top: 20 },
        addPageContent: function (data) {
          doc.text("All Candidate Details", 150, 10);
        }
      });
      doc.save("AllCandidateDetails");
    }

  }
  //Open Position Report//
  public exportexcelOpenPos(selectedformat: any) {

    this.myText = "All Open Positions";
    var template = '<table>', thead = '', tbody = '', caption = '<h4><center>' + this.myText + '</center></h4>';
    // removal of headerName if having the corresponding values are empty.
    var array: any = this.GridApiOpenPos.getDataAsCsv().split('\n')[0].split(',');
    var aa = this.GridApiOpenPos.getDataAsCsv().split('\n').slice(1);
    var header = array.map(function (name, index) {
      var count = 0;
      aa.map(function (str, ia) {
        str.split(',').map(function (value, i) {
          if (value.length == 2 && (index == i)) {
            count += 1;
          }
        });
      });
      if (aa.length == count) {
        name = false;
      }
      return name;
    });



    var indexes = header.map(function (value, index) {
      if (!value) { return index; }
    }).filter(function (value) {
      if (value !== undefined) { return value; }
    });

    var body = aa.map(function (str) {
      return str.split(',').map(function (value: any, index) {
        if (indexes.indexOf(index) !== -1) {
          value = false;
        }
        return value;
      })
    }).map(function (arr) {
      return arr.filter(function (name) { return name; })
    });

    header = header.filter(function (value) {
      return value;
    });

    var finalRes = [];
    // delete finalRes[0][0];
    finalRes.push(header);

    body.map(function (arr) {
      finalRes.push(arr);
    });


    finalRes.map(function (row, index) {
      var tBodyRow = '';
      row.map(function (name, i) {
        name = name.substr(1, name.length - 2);
        name = name.replace('"', '');
        var str;
        if (index == 0) {
          str = '<th>' + name + '</th>';
          thead = thead.concat(str);
        } else {
          str = '<td>' + name + '</td>';
          tBodyRow = tBodyRow.concat(str);
        }
      });
      if (index == 0) {
        thead = '<thead><tr>' + thead + '</tr></thead>';
      } else {
        tbody = tbody.concat('<tr>' + tBodyRow + '</tr>');
      }

    });
    tbody = '<tbody>' + tbody + '</tbody>';
    if (selectedformat == 'Excel') {
      var exportHref = this.tableToExcel(template + caption + thead + tbody + '</table>', "AllOpenPositions");
      var a = document.createElement('a');
      a.download = "AllOpenPositions";
      a.href = exportHref;
      setTimeout(function () {
        a.click();
      }, 100);
    }







    /*export to PDF*/

    if (selectedformat == 'PDF') {
      var that = this;
      var columns = [];
      var rows = [];
      // removal of headerName if having the corresponding values are empty.
      var array: any = this.GridApiOpenPos.getDataAsCsv().split('\n')[0].split(',');
      var aa = this.GridApiOpenPos.getDataAsCsv().split('\n').slice(1);
      var header = array.map(function (name, index) {
        var count = 0;
        aa.map(function (str, ia) {
          str.split(',').map(function (value, i) {
            if (value.length == 2 && (index == i)) {
              count += 1;
            }
          });
        });
        if (aa.length == count) {
          name = false;
        }
        return name;
      });


      var indexes = header.map(function (value, index) {
        if (!value) { return index; }
      }).filter(function (value) {
        if (value !== undefined) { return value; }
      });

      var body = aa.map(function (str) {
        return str.split(',').map(function (value: any, index) {
          if (indexes.indexOf(index) !== -1) {
            value = false;
          }
          return value;
        })
      }).map(function (arr) {
        return arr.filter(function (name) { return name; })
      });

      header = header.filter(function (value) {
        return value;
      });

      var finalRes = [];
      finalRes.push(header);
      body.map(function (arr) {
        finalRes.push(arr);
      });



      finalRes.map(function (row, index) {
        var rowData = {};
        row.map(function (name, i) {
          name = name.substr(1, name.length - 2);
          name = name.replace('"', '');
          var obj = {
            title: name,
            dataKey: name
          }
          if (index == 0) {
            columns.push(obj);
          } else {
            var rowDataKeys = columns.map(function (obj) {
              return obj.dataKey;
            });

            rowData[rowDataKeys[i]] = name;
          }
        });

        if (index) {
          rows.push(rowData);
        }


      })

      // Only pt supported (not mm or in)
      var doc = new jsPDF({
        orientation: 'l',
        unit: 'mm',
        format: 'a3',
        compress: true,
        fontSize: 15,
        lineHeight: 1,
        autoSize: true,
        printHeaders: true
      });

      doc.autoTable(columns, rows, {
        styles: { overflow: 'linebreak' },
        margin: { top: 20 },
        addPageContent: function (data) {
          doc.text("All Open Positions", 150, 10);
        }
      });
      doc.save("AllOpenPositions");
    }


  }

  public exportexcelPerformanceTracker(selectedformat: any) {

    this.myText = "Performance Tracker Details";
    var template = '<table>', thead = '', tbody = '', caption = '<h4><center>' + this.myText + '</center></h4>';
    // removal of headerName if having the corresponding values are empty.
    var array: any = this.GridApiOpenTracker.getDataAsCsv().split('\n')[0].split(',');
    var aa = this.GridApiOpenTracker.getDataAsCsv().split('\n').slice(1);
    var header = array.map(function (name, index) {
      var count = 0;
      aa.map(function (str, ia) {
        str.split(',').map(function (value, i) {
          if (value.length == 2 && (index == i)) {
            count += 1;
          }
        });
      });
      if (aa.length == count) {
        name = false;
      }
      return name;
    });



    var indexes = header.map(function (value, index) {
      if (!value) { return index; }
    }).filter(function (value) {
      if (value !== undefined) { return value; }
    });

    var body = aa.map(function (str) {
      return str.split(',').map(function (value: any, index) {
        if (indexes.indexOf(index) !== -1) {
          value = false;
        }
        return value;
      })
    }).map(function (arr) {
      return arr.filter(function (name) { return name; })
    });

    header = header.filter(function (value) {
      return value;
    });

    var finalRes = [];
    // delete finalRes[0][0];
    finalRes.push(header);

    body.map(function (arr) {
      finalRes.push(arr);
    });


    finalRes.map(function (row, index) {
      var tBodyRow = '';
      row.map(function (name, i) {
        name = name.substr(1, name.length - 2);
        name = name.replace('"', '');
        var str;
        if (index == 0) {
          str = '<th>' + name + '</th>';
          thead = thead.concat(str);
        } else {
          str = '<td>' + name + '</td>';
          tBodyRow = tBodyRow.concat(str);
        }
      });
      if (index == 0) {
        thead = '<thead><tr>' + thead + '</tr></thead>';
      } else {
        tbody = tbody.concat('<tr>' + tBodyRow + '</tr>');
      }

    });
    tbody = '<tbody>' + tbody + '</tbody>';
    if (selectedformat == 'Excel') {
      var exportHref = this.tableToExcel(template + caption + thead + tbody + '</table>', "Performance Tracker");
      var a = document.createElement('a');
      a.download = "Performance Tracker Details";
      a.href = exportHref;
      setTimeout(function () {
        a.click();
      }, 100);
    }







    /*export to PDF*/

    if (selectedformat == 'PDF') {
      var that = this;
      var columns = [];
      var rows = [];
      // removal of headerName if having the corresponding values are empty.
      var array: any = this.GridApiOpenTracker.getDataAsCsv().split('\n')[0].split(',');
      var aa = this.GridApiOpenTracker.getDataAsCsv().split('\n').slice(1);
      var header = array.map(function (name, index) {
        var count = 0;
        aa.map(function (str, ia) {
          str.split(',').map(function (value, i) {
            if (value.length == 2 && (index == i)) {
              count += 1;
            }
          });
        });
        if (aa.length == count) {
          name = false;
        }
        return name;
      });


      var indexes = header.map(function (value, index) {
        if (!value) { return index; }
      }).filter(function (value) {
        if (value !== undefined) { return value; }
      });

      var body = aa.map(function (str) {
        return str.split(',').map(function (value: any, index) {
          if (indexes.indexOf(index) !== -1) {
            value = false;
          }
          return value;
        })
      }).map(function (arr) {
        return arr.filter(function (name) { return name; })
      });

      header = header.filter(function (value) {
        return value;
      });

      var finalRes = [];
      finalRes.push(header);
      body.map(function (arr) {
        finalRes.push(arr);
      });



      finalRes.map(function (row, index) {
        var rowData = {};
        row.map(function (name, i) {
          name = name.substr(1, name.length - 2);
          name = name.replace('"', '');
          var obj = {
            title: name,
            dataKey: name
          }
          if (index == 0) {
            columns.push(obj);
          } else {
            var rowDataKeys = columns.map(function (obj) {
              return obj.dataKey;
            });

            rowData[rowDataKeys[i]] = name;
          }
        });

        if (index) {
          rows.push(rowData);
        }


      })

      // Only pt supported (not mm or in)
      var doc = new jsPDF({
        orientation: 'l',
        unit: 'mm',
        format: 'a3',
        compress: true,
        fontSize: 15,
        lineHeight: 1,
        autoSize: true,
        printHeaders: true
      });

      doc.autoTable(columns, rows, {
        styles: { overflow: 'linebreak' },
        margin: { top: 20 },
        addPageContent: function (data) {
          doc.text("Performance Tracker Details", 150, 10);
        }
      });
      doc.save("Performance Tracker Details");
    }








  }
  // Export ends

  //JSPDF To generate PDF For Team Performance report
  generatePDF() {
    //     const doc = new jsPDF('p', 'mm', [1500, 1500]);
    // doc.autoTable({html: '#reportAdmin-table'});
    // doc.save('report.pdf');
    var data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      var imgWidth = 600;
      var pageHeight = 100;
      var pageWidth = 1000;
      var imgHeight = 250;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a1');
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight, pageHeight, pageWidth)
      pdf.save('TeamPerformanceRecMetrics.pdf');
    });
  }
  //JSPDF To generate PDF For performance tracker report
  generatePerformanceTrackerPDF() {
    //     const doc = new jsPDF('p', 'mm', [1500, 1500]);
    // doc.autoTable({html: '#reportAdmin-table'});
    // doc.save('report.pdf');
    var data = document.getElementById('contentToConvertt');
    html2canvas(data).then(canvas => {
      var imgWidth = 600;
      var pageHeight = 100;
      var pageWidth = 1000;
      var imgHeight = 250;

      const contentDataURL1 = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a1');
      var position = 0;
      pdf.addImage(contentDataURL1, 'PNG', 0, position, imgWidth, imgHeight, pageHeight, pageWidth)
      pdf.save('Recruitment-Metrics.pdf');
    });
  }
  //JSPDF To generate PDF For Recruiter Performance Graph
  generateRecruiterPerformacePDF() {
    //     const doc = new jsPDF('p', 'mm', [1500, 1500]);
    // doc.autoTable({html: '#reportAdmin-table'});
    // doc.save('report.pdf');
    let date: Date = new Date();

    this.datee = date.getFullYear().toString() + '-' + ("0" + (date.getMonth() + 1).toString()).slice(-2) + '-' + ("0" + (date.getDate()).toString()).slice(-2);
    console.log(this.datee);
    var data = document.getElementById('contentToConverttt');
    html2canvas(data).then(canvas => {
      var imgWidth = 600;
      var pageHeight = 100;
      var pageWidth = 1000;
      var imgHeight = 250;

      const contentDataURL2 = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a1');
      var position = 0;
      pdf.addImage(contentDataURL2, 'PNG', 0, position, imgWidth, imgHeight, pageHeight, pageWidth)
      pdf.save('RecruiterPerformance-Chart.pdf' + " " + this.datee + '.pdf');
    });
  }

  // generateReportMainPDF()
  // {

  // var data = document.getElementById('reportOverviewPdf');
  // html2canvas(data).then(canvas => {
  //   var imgWidth = 500;
  //   var pageHeight = 2500;
  //   var pageWidth = 1000;
  //   var imgHeight =250;

  // const contentDataURL5= canvas.toDataURL('image/png')
  // let pdf = new jsPDF('p', 'mm', 'a1');
  // var position = 0;
  // pdf.addImage(contentDataURL5, 'PNG', 0, position, imgWidth, imgHeight,pageHeight,pageWidth)
  // pdf.save('ReportMain.pdf');
  // });
  // }

  generateReportMainPDF() {
    let date: Date = new Date();

    this.datee = date.getFullYear().toString() + '-' + ("0" + (date.getMonth() + 1).toString()).slice(-2) + '-' + ("0" + (date.getDate()).toString()).slice(-2);
    console.log(this.datee);
    var data = document.getElementById('reportOverviewPdf');
    html2canvas(data).then(canvas => {
      var imgWidth = 500;
      var pageHeight = 4000;
      var pageWidth = 1000;
      var imgHeight = 250;

      const contentDataURL5 = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a1');
      var position = 0;
      pdf.addImage(contentDataURL5, 'PNG', 0, position, imgWidth, imgHeight, pageHeight, pageWidth)
      pdf.save('ReportMain.pdf' + " " + this.datee + '.pdf');
    });
  }

  //To Generate MonthwiseReport PDF
  generateMonthWisePDF() {
    let date: Date = new Date();

    this.datee = date.getFullYear().toString() + '-' + ("0" + (date.getMonth() + 1).toString()).slice(-2) + '-' + ("0" + (date.getDate()).toString()).slice(-2);
    console.log(this.datee);
    var data = document.getElementById('contentToConvertttt');
    html2canvas(data).then(canvas => {
      var imgWidth = 500;
      var pageHeight = 1000;
      var pageWidth = 1000;
      var imgHeight = 250;

      const contentDataURL3 = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a1');
      var position = 0;
      pdf.addImage(contentDataURL3, 'PNG', 0, position, imgWidth, imgHeight, pageHeight, pageWidth)
      pdf.save('MonthWiseRecMetrics-Chart.pdf' + " " + this.datee + '.pdf');
    });
  }

  // Default Individual Recruiter Performance Chart
  IndividualRecruiterPerformanceChartAlphabetical() {
    debugger
    this._ReportsService.getListOfRecruiters().subscribe(res => {
      this.recruiterPerformanceDataaa = res;
      console.log(this.recruiterPerformanceDataaa, 'ressss')
      this.recruiterPerformanceDataaa = this.recruiterPerformanceDataaa.sort(function (a, b) {
        a = a['firstName'].toLowerCase();
        b = b['firstName'].toLowerCase();
        if (a == b) return 0;
        return a < b ? -1 : 1;
      });

      this.recruiterid = this.recruiterPerformanceDataaa[0].userId;
      console.log(this.recruiterid, "RECRUITERSIDD");
      this.defaultIndividualRecruiter(this.recruiterid);
    }, error => {
      console.log(error);
    })
  }

  public defaultIndividualRecruiter(recId?: string) {
    debugger

    if (this.userRoles == 'ADMIN') {
      this.userId = sessionStorage.getItem('userId');
      this._ReportsService.getRecruiterIndividualReport(recId).subscribe(res => {

        this.individualRecReport = res;
        console.log(this.individualRecReport, 'ress');
        if (this.individualRecReport.length !== 0) {
          this.individualbarchart();
        } else {
          this.noData = 'No Available Data to Preview';
        }


      }, error => {
        console.log(error);
      });

    }
    // else {
    //   this.userId = sessionStorage.getItem('userId');
    //   this._ReportsService.getRecruiterIndividualReport(recId).subscribe(res => {

    //     this.individualRecReport = res;
    //     console.log(this.individualRecReport);
    //     this.individualbarchart();
    //   });
    // }


  }

  public defaultIndividualRecruiterr(recId?: string) {
    debugger
    if (this.userRoles == 'Recruiter') {
      this.userId = sessionStorage.getItem('userId');
      this._ReportsService.getRecruiterIndividualReportt(this.userId).subscribe(res => {

        this.individualRecReport = res;
        console.log(this.individualRecReport, 'ress');
        if (this.individualRecReport.length !== 0) {
          this.individualbarchart();
        } else {
          this.noData = 'No Available Data to Preview';
        }
      }, error => {
        console.log(error);
      });

    }
  }

  RecruiterChangeEvent(RecruiterId: any) {

    debugger
    this._ReportsService.getRecruiterIndividualReport(RecruiterId).subscribe(res => {

      this.individualRecReport = res;
      if (this.individualRecReport.length !== 0) {
        this.individualbarchart();
      } else {
        this.noData = 'No Available Data to Preview';
      }
    })


  }

  individualbarchart() {

    const donutchart = am4core.create('donutchartdiv', am4charts.PieChart3D);
    donutchart.hiddenState.properties.opacity = 0; // this creates initial fade-in
    this.individaulaRecruiterData = [];
    // donutchart.legend = new am4charts.Legend();

    for (const key in this.individualRecReport[0]) {
      this.individaulaRecruiterData.push({
        'Status': key,
        'Count': this.individualRecReport[0][key],
      });
    }


    for (let i = 0; i <= this.individaulaRecruiterData.length; i++) {
      if ((this.individaulaRecruiterData[i].Status === 'RecruiterId')) {
        this.individaulaRecruiterData.splice(i, 1);
        i = this.individaulaRecruiterData.length;
      }
    }
    for (let i = 0; i <= this.individaulaRecruiterData.length; i++) {
      if ((this.individaulaRecruiterData[i].Status === 'RecruiterName')) {
        this.individaulaRecruiterData.splice(i, 1);
        i = this.individaulaRecruiterData.length;
      }
    }


    donutchart.data = this.individaulaRecruiterData;
    console.log(donutchart.data);
    donutchart.innerRadius = 90;
    const seriesVs = donutchart.series.push(new am4charts.PieSeries3D());
    seriesVs.dataFields.value = 'Count';
    seriesVs.dataFields.category = 'Status';
    // seriesVs.labels.template.disabled = true;

    // For Percentages
    seriesVs.ticks.template.disabled = true;
    seriesVs.alignLabels = false;
    seriesVs.labels.template.text = "{value.percent.formatNumber('#.0')}%";
    seriesVs.labels.template.radius = am4core.percent(-40);
    seriesVs.labels.template.fill = am4core.color("white");
    seriesVs.labels.template.relativeRotation = 90;

    // Enable export
    donutchart.exporting.menu = new am4core.ExportMenu();
    let title = donutchart.titles.create();
    title.text = "Individual Recruiter Performance";

  }
  downloadExcelReportForCandidate(candidate: any) {
    debugger
    let date: Date = new Date();

    this.datee = date.getFullYear().toString() + '-' + ("0" + (date.getMonth() + 1).toString()).slice(-2) + '-' + ("0" + (date.getDate()).toString()).slice(-2);
    console.log(this.datee);
    if (this.userRoles == 'ADMIN') {
      this.tentId = sessionStorage.getItem('tenantId');
      this._ReportsService.downlaodExcelReportCandidate().subscribe(res => {


        let blob = res;
        let a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = 'AllCandidateProfiles.xls' + " " + this.datee + '.xls';
        document.body.appendChild(a);
        a.click();
      })
    }
    else {
      this.tentId = sessionStorage.getItem('tenantId');
      this.userId = sessionStorage.getItem('userId');
      this._ReportsService.downlaodExcelReportCandidate().subscribe(res => {
        let blob = res;
        let a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = 'AllCandidateProfilesUser.xls' + " " + this.datee + '.xls';
        document.body.appendChild(a);
        a.click();
      })
    }
  }

  downlaodPdfReportCandidate(candidate: any) {
    let date: Date = new Date();

    this.datee = date.getFullYear().toString()
      + '-' + ("0" + (date.getMonth() + 1).toString()).slice(-2) + '-' + ("0" + (date.getDate()).toString()).slice(-2);
    console.log(this.datee);
    if (this.userRoles == 'ADMIN') {
      this.tentId = sessionStorage.getItem('tenantId');
      this._ReportsService.downlaodPdfReportCandidate().subscribe(res => {
        let blob = res;
        let a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = 'AllCandidateProfilespdf.pdf' + " " + this.datee + '.pdf';
        document.body.appendChild(a);
        a.click();
      })
    } else {
      this.tentId = sessionStorage.getItem('tenantId');
      this.userId = sessionStorage.getItem('userId');
      this._ReportsService.downlaodPdfReportCandidate().subscribe(res => {
        let blob = res;
        let a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = 'AllCandidateProfilesUserpdf.pdf' + " " + this.datee + '.pdf';
        document.body.appendChild(a);
        a.click();
      })
    }
  }
  downloadExcelReportFoOpenPositions(candidate: any) {
    let date: Date = new Date();

    this.datee = date.getFullYear().toString() + '-' + ("0" + (date.getMonth() + 1).toString()).slice(-2) + '-' + ("0" + (date.getDate()).toString()).slice(-2);
    console.log(this.datee);
    if (this.userRoles == 'ADMIN') {

      this.tentId = sessionStorage.getItem('tenantId');
      this._ReportsService.downlaodExcelReportOpenPoistions().subscribe(res => {


        let blob = res;
        let a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = 'AllOpenPositions.xls' + " " + this.datee + '.xls';
        document.body.appendChild(a);
        a.click();
      })
    }
    else {
      this.tentId = sessionStorage.getItem('tenantId');
      this.userId = sessionStorage.getItem('userId');
      this._ReportsService.downlaodExcelReportOpenPoistions().subscribe(res => {


        let blob = res;
        let a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = 'AllOpenPositionsUser.xls' + " " + this.datee + '.xls';
        document.body.appendChild(a);
        a.click();
      })
    }
  }
  downlaodPdfReportOpenPositions() {
    let date: Date = new Date();

    this.datee = date.getFullYear().toString() + '-' + ("0" + (date.getMonth() + 1).toString()).slice(-2) + '-' + ("0" + (date.getDate()).toString()).slice(-2);
    console.log(this.datee);
    if (this.userRoles == 'ADMIN') {
      this.tentId = sessionStorage.getItem('tenantId');
      this._ReportsService.downlaodPdfReportOpenPositions().subscribe(res => {


        let blob = res;
        let a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = 'AllOpenPositionspdf.pdf' + " " + this.datee + '.pdf';
        document.body.appendChild(a);
        a.click();
      })
    }
    else {
      this.tentId = sessionStorage.getItem('tenantId');
      this.userId = sessionStorage.getItem('userId');
      this._ReportsService.downlaodPdfReportOpenPositions().subscribe(res => {


        let blob = res;
        let a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = 'AllOpenPositionsUserpdf.pdf' + " " + this.datee + '.pdf';
        document.body.appendChild(a);
        a.click();
      })
    }
  }
  joineeReportAdmin() {
    debugger
    this.userRoles = sessionStorage.getItem('userRoles');
    if (this.userRoles == 'ADMIN') {
      this.tentId = sessionStorage.getItem('tenantId');
      this._ReportsService.getJoineeReportAdmin().subscribe(res => {
        this.joineeAdmin = res;
        this.joineeAdmin = this.joineeAdmin.sort(function (a, b) {
          a = a['name'].toLowerCase();
          b = b['name'].toLowerCase();
          if (a == b) return 0;
          return a < b ? -1 : 1;
        });
        console.log(this.joineeAdmin, 'JOINESSSSADMIN')
      })
    }
    else {
      this.tentId = sessionStorage.getItem('tenantId');
      this.userId = sessionStorage.getItem('userId');
      this._ReportsService.getJoineeReportAdmin().subscribe(res => {
        this.joineeAdmin = res;
        this.joineeAdmin = this.joineeAdmin.sort(function (a, b) {
          a = a['name'].toLowerCase();
          b = b['name'].toLowerCase();
          if (a == b) return 0;
          return a < b ? -1 : 1;
        });
        console.log(this.joineeAdmin, 'JOINESSSSADMIN')
      })
    }
  }
  downlaodPdfReportJoinees(candidate: any) {
    let date: Date = new Date();

    this.datee = date.getFullYear().toString() + '-' + ("0" + (date.getMonth() + 1).toString()).slice(-2) + '-' + ("0" + (date.getDate()).toString()).slice(-2);
    console.log(this.datee);
    if (this.userRoles == 'ADMIN') {
      this.tentId = sessionStorage.getItem('tenantId');
      this._ReportsService.downlaodPdfReportJoinees().subscribe(res => {


        let blob = res;
        let a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = 'joinees.pdf' + " " + this.datee + '.pdf';
        document.body.appendChild(a);
        a.click();
      })
    }
    else {
      this.tentId = sessionStorage.getItem('tenantId');
      this.userId = sessionStorage.getItem('userId');
      this._ReportsService.downlaodPdfReportJoinees().subscribe(res => {


        let blob = res;
        let a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = 'joineesuser.pdf' + " " + this.datee + '.pdf';
        document.body.appendChild(a);
        a.click();
      })
    }
  }
  downloadExcelReportJoinees(candidate: any) {
    let date: Date = new Date();

    this.datee = date.getFullYear().toString() + '-' + ("0" + (date.getMonth() + 1).toString()).slice(-2) + '-' + ("0" + (date.getDate()).toString()).slice(-2);
    console.log(this.datee);
    if (this.userRoles == 'ADMIN') {
      this.tentId = sessionStorage.getItem('tenantId');
      this._ReportsService.downlaodExcelReportJoinees().subscribe(res => {


        let blob = res;
        let a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = 'joineesExcel.xls' + " " + this.datee + '.xls';
        document.body.appendChild(a);
        a.click();
      })
    }
    else {
      this.tentId = sessionStorage.getItem('tenantId');
      this.userId = sessionStorage.getItem('userId');
      this._ReportsService.downlaodExcelReportJoinees().subscribe(res => {


        let blob = res;
        let a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = 'joineesuserExcel.xls' + " " + this.datee + '.xls';
        document.body.appendChild(a);
        a.click();
      })
    }
  }
  downloadPdfReportTeamPerformance() {
    let date: Date = new Date();

    this.datee = date.getFullYear().toString() + '-' + ("0" + (date.getMonth() + 1).toString()).slice(-2) + '-' + ("0" + (date.getDate()).toString()).slice(-2);
    console.log(this.datee);
    this.tentId = sessionStorage.getItem('tenantId');
    this._ReportsService.downlaodPdfReportTeamPerformance().subscribe(res => {


      let blob = res;
      let a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = 'teamPerformancePDF.pdf' + " " + this.datee + '.pdf';
      document.body.appendChild(a);
      a.click();

    });
  }
  downloadExcelReportTeamPerformance(candidate: any) {
    let date: Date = new Date();

    this.datee = date.getFullYear().toString() + '-' + ("0" + (date.getMonth() + 1).toString()).slice(-2) + '-' + ("0" + (date.getDate()).toString()).slice(-2);
    console.log(this.datee);
    this.tentId = sessionStorage.getItem('tenantId');
    this._ReportsService.downlaodExcelReportTeamPerformance().subscribe(res => {


      let blob = res;
      let a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = 'teamPerformanceExcel.xls' + " " + this.datee + '.xls';
      document.body.appendChild(a);
      a.click();

    });
  }


  listOfRecruiters() {
    this._ReportsService.getListOfRecruiters().subscribe(res => {
      this.recruiterPerformanceDataaa = res;
      console.log(this.recruiterPerformanceDataaa, 'Recruiters');
    }, error => {
      console.log(error);
    })
  }
}
