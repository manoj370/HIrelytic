import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UserService } from '../../services/user.service';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
@Component({
  selector: 'app-performance-metrics',
  templateUrl: './performance-metrics.component.html',
  styleUrls: ['./performance-metrics.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class PerformanceMetricsComponent implements OnInit {
  roles: any = [];
  roleId: any;
  roleName: any;
  userslist: any = [];
  fromdate: string;
  todate: string;
  selectedValue: string;
  show: boolean;
  recruiterId: string;
  pageid: any = 0;
  rowid: any = 16;
  performanceres: any = [];
  disableNextButton = false;
  disablePreviousButton = true;
  responsePageCount: number = 0;
  pageCount: number = 1;
  columnDefs = [
    { headerName: 'Name', field: 'RecruiterName', width: 130, rowSelection: 'multiple', unSortIcon: true },
    {
      headerName: 'Offered', field: 'OFFERED', width: 130, rowSelection: 'multiple', cellStyle: { textAlign: 'center' },
      unSortIcon: true
    },
    {
      headerName: 'Joined', field: 'JOINED', width: 130, rowSelection: 'multiple', cellStyle: { textAlign: 'center' },
      unSortIcon: true,
    },
    {
      headerName: 'Shortlisted', field: 'SHORTLISTED', width: 150,
      rowSelection: 'multiple', cellStyle: { textAlign: 'center' }, unSortIcon: true
    },
    {
      headerName: 'Drop-out', field: 'DROP_OUT', width: 130, rowSelection: 'multiple', cellStyle: { textAlign: 'center' }
      , unSortIcon: true
    },
    {
      headerName: 'No Show', field: 'NO_SHOW', width: 130, rowSelection: 'multiple', cellStyle: { textAlign: 'center' }
      , unSortIcon: true
    },
    {
      headerName: 'Interview Scheduled', field: 'INTERVIEW_SCHEDULED',
      width: 150, rowSelection: 'multiple', cellStyle: { textAlign: 'center' }, unSortIcon: true
    },
    {
      headerName: 'Position Closed', field: 'POSITION_CLOSED',
      width: 130, rowSelection: 'multiple', cellStyle: { textAlign: 'center' }, unSortIcon: true,
    },
    {
      headerName: 'Screening Reject', field: 'SCREENING_REJECT', width: 130,
      rowSelection: 'multiple', cellStyle: { textAlign: 'center' }, unSortIcon: true
    },
    {
      headerName: 'Position On Hold', field: 'POSITION_ON_HOLD', width: 130,
      rowSelection: 'multiple', cellStyle: { textAlign: 'center' }, unSortIcon: true
    },
    // {
    //   headerName: '1st Level Reject', field: 'FIRST_LEVEL_REJECT', width: 130,
    //   rowSelection: 'multiple', cellStyle: { textAlign: 'center' }, unSortIcon: true
    // },

    // {
    //   headerName: 'Awaiting For The Feedback', field: 'AWAITING_FOR_THE_FEEDBACK',
    //   width: 100, rowSelection: 'multiple',  cellStyle: { textAlign: 'center' }, unSortIcon: true
    // },
    // {
    //   headerName: 'Submitted To Client', field: 'SUBMITTED_TO_CLIENT', width: 150, rowSelection: 'multiple',
    //   minWidth: 150, cellStyle: { textAlign: 'center' }, unSortIcon: true
    // },
    // {
    //   headerName: '2nd Level Reject', field: 'SECOND_LEVEL_REJECT', width: 150, rowSelection: 'multiple',
    //   minWidth: 150, cellStyle: { textAlign: 'center' }, unSortIcon: true
    // },
    // {
    //   headerName: 'Submitted', field: 'SUBMITTED', width: 100, rowSelection: 'multiple', minWidth: 100,
    //   cellStyle: { textAlign: 'center' }, unSortIcon: true
    // },
  ];
  noData: string;
  performaceIndividualData: any[];
  constructor(private userService: UserService) { }
  ngOnInit() {
    const roleName = sessionStorage.getItem('userRoles');
    if (roleName === 'ADMIN') {
      this.userList();
      this.show = !this.show;
    }
    this.defaultPerformanceReport();
  }
  userList() {
    this.userService.userList().subscribe(res => {
      console.log(res);
      this.roles = res;
    }, error => {
      console.log(error);
    });
  }
  roleEvent(roleName: any) {
    console.log(roleName);
    this.roles.forEach(element => {
      if (element.roleName.includes(roleName)) {
        this.roleId = element.roleId;
      }
    });
    this.roleName = roleName;
    this.userService.getrecrutersNames(this.roleName).subscribe(res => {
      console.log(res);
      this.userslist = res;
    }, error => {
      console.log(error);
    });
    this.teamPerformanceAdminReport();
  }
  useDataId(name: any) {
    console.log(name);
    this.userslist.forEach(element => {
      console.log(element.firstName)
      console.log(name);
      if (element.firstName.includes(name)) {
        console.log(element.userId);
        this.recruiterId = element.userId;
        console.log(this.recruiterId);
      }
    });
    this.teamPerformanceAdminReport();
  }
  defaultPerformanceReport() {
    const userRoles = sessionStorage.getItem('userRoles');
    console.log(userRoles);
    if (userRoles === 'ADMIN') {
      const d = new Date();
      const month = d.getMonth();
      const year = d.getFullYear();
      const date = d.getDate();
      // 1 year back
      // this.fromdate = (year - 1) + '-' + (month + 2) + '-' + (date - 18);
      // console.log(this.fromdate);
      // current date
      // this.todate = year + '-' + (month + 1) + '-' + date;
      // console.log(this.todate);
      this.fromdate = '';
      this.todate = '';
      this.selectedValue = '1 Year ';
      this.recruiterId = '';
      this.roleId = '';
      this.teamPerformanceAdminReport();
    } else {
      const d = new Date();
      const month = d.getMonth();
      const year = d.getFullYear();
      const date = d.getDate();
      // 1 year back
      // this.fromdate = (year - 1) + '-' + (month + 2) + '-' + (date - 18);
      // console.log(this.fromdate);
      // current date
      // this.todate = year + '-' + (month + 1) + '-' + date;
      // console.log(this.todate);
      this.fromdate = '';
      this.todate = '';
      this.selectedValue = '1 Year';
      this.recruiterId = sessionStorage.getItem('userId');
      this.roleId = '';
      this.teamPerformanceIndividualReport();
    }
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
        this.teamPerformanceAdminReport();
      } else {
        this.roleId = '';
        this.recruiterId = sessionStorage.getItem('userId');
        this.teamPerformanceIndividualReport();
      }
    }
  }

  teamPerformanceAdminReport() {
    this.userService.teamPerformanceAdminReport(this.fromdate, this.todate,
      this.pageid, this.rowid, this.roleId, this.recruiterId, this.selectedValue).subscribe(res => {
        console.log(res);
        this.performanceres = res;
        // this.responsePageCount = this.performanceres[0].pageCount;
      }, error => {
        console.log(error);
      });
  }
  teamPerformanceIndividualReport() {
    this.userService.teamPerformanceIndividualReport(this.fromdate, this.todate,
      this.pageid, this.rowid, this.roleId, this.recruiterId, this.selectedValue).subscribe(res => {
        console.log(res);
        this.performanceres = res;
        if (this.performanceres !== 0) {
          this.individualbarchart();
        } else {
          this.noData = 'No Available Data to Preview';
        }
        // this.responsePageCount = this.performanceres[0].pageCount;
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
    this.performanceres = [];
    console.log('onPaginationPageLoaded', event);
    // previous code
    this.pageid = this.pageid + 1;
    const userRoles = sessionStorage.getItem('userRoles');
    if (userRoles === 'ADMIN') {
      this.teamPerformanceAdminReport();
    } else {
    }
  }
  onBtPrevious() {
    this.disableNextButton = false;
    this.pageCount--;
    if (this.pageCount === 1) {
      this.disablePreviousButton = true;
    } else {
      this.disablePreviousButton = false;
    }
    this.performanceres = [];
    console.log('onPaginationPageLoaded', event);
    // previous code
    this.pageid = this.pageid - 1;
    const userRoles = sessionStorage.getItem('userRoles');
    if (userRoles === 'ADMIN') {
      this.teamPerformanceAdminReport();
    } else {
    }
  }
  individualbarchart() {
    const donutchart = am4core.create('donutchartdiv', am4charts.PieChart3D);
    donutchart.hiddenState.properties.opacity = 0; // this creates initial fade-in
    this.performaceIndividualData = [];
    // donutchart.legend = new am4charts.Legend();
    // tslint:disable-next-line: forin
    for (const key in this.performanceres[0]) {
      this.performaceIndividualData.push({
        'Status': key,
        'Count': this.performanceres[0][key],
      });
    }
    console.log(this.performaceIndividualData);
    for (let i = 0; i <= this.performaceIndividualData.length; i++) {
      if ((this.performaceIndividualData[i].Status === 'RecruiterId')) {
        this.performaceIndividualData.splice(i, 1);
        i = this.performaceIndividualData.length;
      }
    }
    for (let i = 0; i <= this.performaceIndividualData.length; i++) {
      if ((this.performaceIndividualData[i].Status === 'RecruiterName')) {
        this.performaceIndividualData.splice(i, 1);
        i = this.performaceIndividualData.length;
      }
    }
    donutchart.data = this.performaceIndividualData;
    console.log(donutchart.data);
    donutchart.innerRadius = 90;
    const seriesVs = donutchart.series.push(new am4charts.PieSeries3D());
    seriesVs.dataFields.value = 'Count';
    seriesVs.dataFields.category = 'Status';
    // seriesVs.labels.template.disabled = true;

    // For Percentages
    seriesVs.ticks.template.disabled = true;
    seriesVs.alignLabels = false;
    seriesVs.labels.template.text = '{value.percent.formatNumber(\'#.0\')}%';
    seriesVs.labels.template.radius = am4core.percent(-40);
    seriesVs.labels.template.fill = am4core.color('white');
    seriesVs.labels.template.relativeRotation = 90;

    // Enable export
    donutchart.exporting.menu = new am4core.ExportMenu();
    let title = donutchart.titles.create();
    title.text = 'Individual Recruiter Performance';

  }
}
