import { Component, OnInit, OnDestroy } from '@angular/core';
import { JobPostingService } from '../services/jobposting.service';
import { UserService } from './../services/user.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import { Subject } from 'rxjs';
import { NewServiceService } from '../services/new-service.service';
import am4themes_kelly from '@amcharts/amcharts4/themes/kelly';
import am4themes_material from '@amcharts/amcharts4/themes/material';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { takeUntil } from 'rxjs/operators';
// am4core.useTheme(am4themes_animated);
am4core.useTheme(am4themes_kelly);
am4core.useTheme(am4themes_animated);
am4core.useTheme(am4themes_material);
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  datePickerForm: FormGroup;
  candidates: any = [];
  dashboarddata: any;
  candidateStatus: any;
  jobStatusData: any;
  assigneddata: any = [];
  approveddata: any = [];
  opendata: any = [];
  onholddata: any = [];
  rejectedData: any = [];
  closedData: any = [];
  dropdownListRecruiter: any = [];
  assignJobForm: FormGroup;
  recrutersData: any = [];
  accountMngData: any = [];
  dataProvider: any = [];
  recruterDataProvider: any = [];
  rolesData: any = [];
  mngDataProvider: any = [];
  noData: string;
  selectedValue = '1 year';
  fromdate: any;
  todate: any;
  recruterId: any;
  mangerId: any;
  updatedRecruterId: any;
  defaultId: any;
  dropdownListAccount: any;
  filterName: string;
  recruterNodata = '';
  showContent = false;
  showrecruterPie = false;
  showaccount = false;
  showCandidate = false;
  showBar = false;
  cardData: any = [];
  isAdmin = true;
  subscribe: Subject<any> = new Subject<any>();
  isrec = true;
  accountmanager = true;
  vendor = true;
  selectedUser: any;
  selectedManager: any;
  nocardData: string;
  candidateNodata: string;
  gridApi: any;
  isVendor:boolean = true;
  vendorId: string;
  vendorcardData: any = [];
  public pageid: any = 0;
  public rowid: any = 15;
  vendordashboardjobdata: any = [];
  disableNextButton: boolean = false;
  disablePreviousButton: boolean = true;
  responsePageCount: number = 0;
  pageCount: number = 1;
  totalcount: any;
  clientCardData: any;

  constructor(
    private _jobpostingService: JobPostingService,
    private fb: FormBuilder,
    private newService: NewServiceService,
    private _userService: UserService
  ) {}

  ngOnInit() {
    this.getprevilizes();
    this.assignJobForm = this.fb.group({
      userRole: ['']
    });
  }
  // Column headers to resumes table
  // tslint:disable-next-line: member-ordering
  columnDefs = [
    {
      headerName: 'First Name',
      field: 'firstName',
      width: 120,
      rowSelection: 'multiple',
      minWidth: 100,
      cellStyle: { 'text-transform': 'capitalize', 'font-size': '12px' },
      unSortIcon: true
    },
    {
      headerName: 'Last Name',
      field: 'lastName',
      width: 120,
      rowSelection: 'multiple',
      minWidth: 80,
      cellStyle: { 'text-transform': 'capitalize', 'font-size': '12px' },
      unSortIcon: true
    },
    {
      headerName: 'Email Id',
      field: 'emailId',
      width: 120,
      rowSelection: 'multiple',
      minWidth: 80,
      cellStyle: { 'text-transform': 'capitalize', 'font-size': '12px' },
      unSortIcon: true
    },
    {
      headerName: 'Phone Number',
      field: 'phoneNumber',
      width: 120,
      rowSelection: 'multiple',
      minWidth: 80,
      cellStyle: { 'text-transform': 'capitalize', 'font-size': '12px' },
      unSortIcon: true
    }
  ];
  // tslint:disable-next-line: member-ordering
  columnDefsJobs = [
    {
      headerName: 'Job Code',
      cellStyle: { 'text-transform': 'capitalize', 'font-size': '12px' },
      field: 'jobCode',
      width: 150,
      unSortIcon: true
    },
    {
      headerName: 'Job Title',
      cellStyle: { 'text-transform': 'capitalize', 'font-size': '12px' },
      field: 'jobTitle',
      width: 150,
      unSortIcon: true
    },
    {
      headerName: 'Location',
      cellStyle: { 'text-transform': 'capitalize', 'font-size': '12px' },
      field: 'jobLocation',
      width: 150,
      unSortIcon: true
    },
    {
      headerName: 'Designation',
      cellStyle: { 'text-transform': 'capitalize', 'font-size': '12px' },
      field: 'designation',
      width: 150,
      unSortIcon: true
    },
    {
      headerName: 'Positions',
      cellStyle: { 'text-transform': 'capitalize', 'font-size': '12px' },
      field: 'noOfOpenings',
      width: 150,
      unSortIcon: true
    },
    {
      headerName: 'Referred',
      cellStyle: { 'text-transform': 'capitalize', 'font-size': '12px' },
      field: 'referredCount',
      width: 100,
      unSortIcon: true
    },
    {
      headerName: 'Selected',
      cellStyle: { 'text-transform': 'capitalize', 'font-size': '12px' },
      field: 'selectedCount',
      width: 100,
      unSortIcon: true
    },
    {
      headerName: 'Status',
      field: 'jobStatus',
      width: 150,
      rowSelection: 'multiple',
      minWidth: 150,
      unSortIcon: true,
      cellClassRules: {
        'rag-green-outer': function(params) {
          return params.value === 'ASSIGNED';
        }
      },
      cellRenderer: function(params) {
        return '<span class="rag-element">' + params.value + '</span>';
      }
    }
  ];

  // "Recruiter" "ADMIN"
  getprevilizes() {
    this.newService
      .getUserDetails()
      .pipe(takeUntil(this.subscribe))
      .subscribe(result => {
        // console.log(result, 'login');
        for (let index = 0; index < result.roles.length; index++) {
          const element = result.roles[index].roleName;
          if (element === 'ADMIN') {
            this.listOfRecruiters();
            this.listofAccountmng();
            // this.getAccountMangData();
            this.getCardData();
            // this.getRecrutersData();
            // this.yearStatusData();
            this.getCandiadateData();
            this.getClientData();
            this.isAdmin = true;
            this.isVendor = false;
          } else if (element === 'Recruiter') {
            this.isAdmin = false;
            this.isrec = false;
            this.accountmanager = false;
            // console.log('no data', result.userId);
            this.recruterId = result.userId;
            this.selectedUser = result.firstName + ' ' + result.lastName;
            this.getRecrutersData();
            this.getCardData();
            // this.yearStatusData();
            this.isVendor = false;

            // result.userId
          } else if (element === 'Account Manager') {
            this.isAdmin = false;
            this.isrec = true;
            this.accountmanager = true;
            // console.log('no data', result.userId);
            this.selectedManager = result.firstName + ' ' + result.lastName;
            // console.log(this.selectedManager);
            this.recruterId = result.userId;
            this.getAccountMangData();
            this.getCardData();
            // this.yearStatusData();
            this.isVendor = false;
          } else if (element === 'VENDOR') {
            this.isAdmin = false;
            this.isrec = true;
            this.accountmanager = false;          

            // Api calls have to change
            // this.vendorcarddata();
            // this.vendorDashboardJobs();
            // this.getAccountMangData();
          }
        }
      });
  }
  public datePicker(event) {
    const roleName = sessionStorage.getItem('userRoles');
    // console.log(roleName);

    debugger;
    if (event.startDate !== undefined) {
      const startDate = event.startDate._d;
      const endDate = event.endDate._d;
      this.todate =
        startDate.getFullYear().toString() +
        '-' +
        ('0' + (startDate.getMonth() + 1)).slice(-2) +
        '-' +
        ('0' + startDate.getDate().toString()).slice(-2);
      this.fromdate =
        endDate.getFullYear().toString() +
        '-' +
        ('0' + (endDate.getMonth() + 1)).slice(-2) +
        '-' +
        ('0' + endDate.getDate().toString()).slice(-2);
      // console.log(this.fromdate);
      // console.log(this.todate);
      // filterName.value = ''
      this.selectedValue = 'notSelected';
      if (roleName === 'ADMIN') {
        this.getAccountMangData();
        this.getCardData();
        this.getRecrutersData();
        // this.yearStatusData();
        this.getCandiadateData();
      } else if (roleName === 'Recruiter') {
        this.recruterId = sessionStorage.getItem('userId');
        // console.log(this.recruterId);
        this.getCardData();
        this.getRecrutersData();
      } else if (roleName === 'Account Manager') {
        this.mangerId = sessionStorage.getItem('userId');
        this.getCardData();
        this.getAccountMangData();
      } else if (roleName === 'VENDOR') {
        this.vendorId = sessionStorage.getItem('userId');
        // this.vendorcarddata();
        this.vendorDashboardJobs();
        // this.getAccountMangData();
      }
    } else {
      // console.log('select date');
    }
  }
  public dateOption(eventValue) {
    // console.log(eventValue);
    const roleName = sessionStorage.getItem('userRoles');
    debugger;
    if (
      eventValue === '1 Month' ||
      eventValue === '3 Months' ||
      eventValue === '6 Months'
    ) {
      this.fromdate = null;
      this.todate = null;
      this.selectedValue = eventValue;

      if (roleName === 'ADMIN') {
        this.getAccountMangData();
        this.getCardData();
        this.getRecrutersData();
        // this.yearStatusData();
        this.getClientData();
        this.getCandiadateData();
        this.filterName = '';
      } else if (roleName === 'Recruiter') {
        this.recruterId = sessionStorage.getItem('userId');
        // console.log(this.recruterId);
        this.getCardData();
        this.getRecrutersData();
      } else if (roleName === 'Account Manager') {
        this.mangerId = sessionStorage.getItem('userId');
        this.getCardData();
        this.getAccountMangData();
      } else if (roleName === 'VENDOR') {
        this.vendorId = sessionStorage.getItem('userId');
        // this.vendorcarddata();
        this.vendorDashboardJobs();
        // this.getAccountMangData();
      }
    }
    // else if (((eventValue) === '1 Year') && (roleName === 'VENDOR')) {

    //   this.selectedValue = eventValue;
    // }
    else if (eventValue === 'Date Range') {
      // console.log(eventValue);
      this.datePicker(event);
    } else {
      debugger;
      this.fromdate = null;
      this.todate = null;
      this.selectedValue = eventValue;
      this.getAccountMangData();
      this.getCardData();
      this.getRecrutersData();
      // this.yearStatusData();
      this.getCandiadateData();
      // this.vendorcarddata();
      // this.vendorDashboardJobs();
      // new change
      if (roleName === 'VENDOR') {
        // this.vendorcarddata();
        this.vendorDashboardJobs();
      }
      // new change
    }
  }
  // get All Data For Dashboard
  getCardData() {
    this._userService
      .getDashboarddata(this.fromdate, this.todate, this.selectedValue)
      .pipe(takeUntil(this.subscribe))
      .subscribe(
        data => {
          console.log(data);
          this.cardData = data;
          if (this.cardData.length > 0) {
            this.dashboarddata = this.cardData[0];
            this.showContent = false;
          } else {
            this.showContent = true;
            this.nocardData = 'No Available Data to Preview';
            // console.log(this.nocardData);
          }
        },
        error => {
          console.log(error);
        }
      );
  }
  getClientData() {
    this._userService
      .getClientdata(this.fromdate, this.todate, this.selectedValue)
      .pipe(takeUntil(this.subscribe))
      .subscribe(
        data => {
          console.log(data);
          this.clientCardData = data;
          console.log(this.clientCardData);

          // if (this.clientCardData.length > 0) {
          //   this.dashboarddata = this.clientCardData[0];
          //   this.showContent = false;
          // } else {
          //   this.showContent = true;
          //   this.nocardData = 'No Available Data to Preview';
          //   // console.log(this.nocardData);
          // }
        },
        error => {
          console.log(error);
        }
      );
  }
  // get Candidate Status Data
  getCandiadateData() {
    this._userService
      .getCandidateData(this.fromdate, this.todate, this.selectedValue)
      .pipe(takeUntil(this.subscribe))
      .subscribe(
        candiadte => {
          this.candidates = candiadte;
          if (candiadte) {
            this.candidateChart();
          } else {
            this.candidateNodata = 'No Available Data to Preview';
          }
        },
        error => {
          console.log(error);
        }
      );
  }
  // Recruters Data getRecruters bsed On Role Id "3d4a6bb0830f4e968a6bb0830fde960d"
  getRecrutersData() {
    this._userService
      .getRecruters(
        this.recruterId,
        this.fromdate,
        this.todate,
        this.selectedValue
      )
      .pipe(takeUntil(this.subscribe))
      .subscribe(
        (rtecrutersData: any) => {
          this.recrutersData = rtecrutersData;
          console.log(rtecrutersData);
          if (rtecrutersData) {
            this.recruterPie();
          } else {
            this.recruterNodata =
              'No Available Data for' + ' ' + this.selectedUser;
          }
        },
        error => {
          console.log(error);
        }
      );
  }

  // account Manger Data
  getAccountMangData() {
    this._userService
      .getMangersData(
        this.mangerId,
        this.fromdate,
        this.todate,
        this.selectedValue
      )
      .pipe(takeUntil(this.subscribe))
      .subscribe(
        accountMagData => {
          // console.log(accountMagData);
          this.accountMngData = accountMagData;
          if (accountMagData) {
            this.accountMangerPie();
          } else {
            this.noData = 'No Available Data for' + ' ' + this.selectedManager;
          }
        },
        error => {
          console.log(error);
        }
      );
  }
  // bar chart
  // yearStatusData() {
  //   this._userService.getBarchartData(this.fromdate, this.todate, this.selectedValue)
  //     .pipe(takeUntil(this.subscribe))
  //     .subscribe(jobstatus => {
  //       // console.log(jobstatus);
  //       this.jobStatusData = jobstatus;
  //       if (jobstatus) {
  //         for (let i = 0; i < this.jobStatusData.length; i++) {
  //           if (this.jobStatusData[i].status === 'ASSIGNED') {
  //             this.assigneddata.push(this.jobStatusData[i]);
  //           } else if (this.jobStatusData[i].status === 'APPROVED') {
  //             this.approveddata.push(this.jobStatusData[i]);
  //           } else if (this.jobStatusData[i].status === 'Open') {
  //             this.opendata.push(this.jobStatusData[i]);
  //           } else if (this.jobStatusData[i].status === 'ONHOLD') {
  //             this.onholddata.push(this.jobStatusData[i]);
  //           } else if (this.jobStatusData[i].status === 'REJECTED') {
  //             this.rejectedData.push(this.jobStatusData[i]);
  //           } else if (this.jobStatusData[i].status === 'CLOSED') {
  //             this.closedData.push(this.jobStatusData[i]);
  //           }
  //         }
  //         this.jobStatus();

  //       }
  //     }, error => {
  //       console.log(error);
  //     });
  // }
  // get list of recruters
  listOfRecruiters() {
    this._userService
      .getrecrutersNames('Recruiter')
      .pipe(takeUntil(this.subscribe))
      .subscribe(
        res => {
          // console.log(res);
          this.dropdownListRecruiter = res;
          if (this.dropdownListRecruiter.length > 0) {
            this.recruterId = this.dropdownListRecruiter[0].userId;
            this.getRecrutersData();
            this.selectedUser =
              this.dropdownListRecruiter[0].firstName +
              ' ' +
              this.dropdownListRecruiter[0].lastName;
          } else {
            this.recruterNodata =
              'No Available Data for' + ' ' + this.selectedUser;
          }
        },
        error => {
          console.log(error);
        }
      );
  }
  // get list of accont managers
  listofAccountmng() {
    this._userService
      .getrecrutersNames('Account Manager')
      .pipe(takeUntil(this.subscribe))
      .subscribe(
        res => {
          this.dropdownListAccount = res;
          // console.log(res);
          if (this.dropdownListAccount.length > 0) {
            this.mangerId = this.dropdownListAccount[0].userId;
            this.getAccountMangData();
            this.selectedManager =
              this.dropdownListAccount[0].firstName +
              ' ' +
              this.dropdownListAccount[0].lastName;
          } else {
            this.noData = 'No Available Data for' + ' ' + this.selectedManager;
          }
        },
        error => {
          console.log(error);
        }
      );
  }
  // select mangers from drop dowwn
  selectedMng(event) {
    this.selectedManager = event.target.selectedOptions[0].label;
    this.mangerId = event.target.value;
    this.recruterId = this.mangerId;
    this.getAccountMangData();
  }
  // select recruters drom list
  selecteValue(event) {
    this.selectedUser = event.target.selectedOptions[0].label;
    this.updatedRecruterId = event.target.value;
    this.recruterId = this.updatedRecruterId;
    this.getRecrutersData();
  }
  //  candidate chart
  candidateChart() {
    const barchart = am4core.create('barchart', am4charts.PieChart);
    // Add and configure Series
    const pieSeries = barchart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = 'Data';
    pieSeries.dataFields.category = 'Heading';

    // Let's cut a hole in our Pie chart the size of 30% the radius
    barchart.innerRadius = am4core.percent(10);

    // Put a thick white border around each Slice
    pieSeries.slices.template.stroke = am4core.color('#fff');
    pieSeries.slices.template.strokeWidth = 1;
    pieSeries.slices.template.strokeOpacity = 1;
    // change the cursor on hover to make it apparent the object can be interacted with
    pieSeries.slices.template.cursorOverStyle = [
      {
        property: 'cursor',
        value: 'pointer'
      }
    ];

    pieSeries.labels.template.disabled = true;
    pieSeries.labels.template.bent = true;
    pieSeries.labels.template.radius = 3;
    pieSeries.labels.template.padding(0, 0, 0, 0);

    pieSeries.ticks.template.disabled = true;

    // Create a base filter effect (as if it's not there) for the hover to return to
    const shadow = pieSeries.slices.template.filters.push(
      new am4core.DropShadowFilter()
    );
    shadow.opacity = 0;

    // Create hover state
    const hoverState = pieSeries.slices.template.states.getKey('hover');
    // normally we have to create the hover state, in this case it already exists

    // Slightly shift the shadow and make it more prominent on hover
    const hoverShadow = hoverState.filters.push(new am4core.DropShadowFilter());
    hoverShadow.opacity = 0.7;
    hoverShadow.blur = 5;
    this.dataProvider = [];
    console.log(this.candidates);
    // tslint:disable-next-line: forin
    for (const key in this.candidates[0]) {
      this.dataProvider.push({
        Heading: key,
        Data: this.candidates[0][key]
      });
    }
    for (let i = 0; i <= this.dataProvider.length; i++) {
      if (this.dataProvider[i].Heading === 'recruiter') {
        this.dataProvider.splice(i, 1);
        i = this.dataProvider.length;
      }
    }

    const val = this.dataProvider.reduce(function(previousValue, currentValue) {
      return {
        Data: previousValue.Data + currentValue.Data
      };
    });
    if (val.Data !== 0) {
      this.candidateNodata = '';
      const newArr = [];
      this.dataProvider.forEach(element => {
        if (
          element.Heading === 'JOINED' ||
          element.Heading === 'OFFERED' ||
          element.Heading === 'DROP_OUT' ||
          element.Heading === 'SHORTLISTED'
        ) {
          newArr.push(element);
          console.log(newArr);
        }
      });
      barchart.data = newArr;
    } else {
      this.candidateNodata = 'No Available Data to Preview';
    }
  }
  //  Year status Bar Chart
  // jobStatus() {
  //   // Create chart instance
  //   const barchart2 = am4core.create('barchart2', am4charts.XYChart);
  //   // Add data
  //   barchart2.data = [
  //     {
  //       'Month': 'January',
  //       'Open': this.opendata[0].January,
  //       'Closed': this.closedData[0].January,
  //       'Approved': this.approveddata[0].January,
  //       'Onhold': this.onholddata[0].January,
  //       'Rejected': this.rejectedData[0].January,
  //       'Assigned': this.assigneddata[0].January,
  //     },
  //     {
  //       'Month': 'February',
  //       'Open': this.opendata[0].February,
  //       'Closed': this.closedData[0].February,
  //       'Approved': this.approveddata[0].February,
  //       'Onhold': this.onholddata[0].February,
  //       'Rejected': this.rejectedData[0].February,
  //       'Assigned': this.assigneddata[0].February,
  //     },
  //     {
  //       'Month': 'March',
  //       'Open': this.opendata[0].March,
  //       'Closed': this.closedData[0].March,
  //       'Approved': this.approveddata[0].March,
  //       'Onhold': this.onholddata[0].March,
  //       'Rejected': this.rejectedData[0].March,
  //       'Assigned': this.assigneddata[0].March,
  //     },
  //     {
  //       'Month': 'April',
  //       'Open': this.opendata[0].April,
  //       'Closed': this.closedData[0].April,
  //       'Approved': this.approveddata[0].April,
  //       'Onhold': this.onholddata[0].April,
  //       'Rejected': this.rejectedData[0].April,
  //       'Assigned': this.assigneddata[0].April,
  //     },
  //     {
  //       'Month': 'May',
  //       'Open': this.opendata[0].May,
  //       'Closed': this.closedData[0].May,
  //       'Approved': this.approveddata[0].May,
  //       'Onhold': this.onholddata[0].May,
  //       'Rejected': this.rejectedData[0].May,
  //       'Assigned': this.assigneddata[0].May,
  //     },
  //     {
  //       'Month': 'June',
  //       'Open': this.opendata[0].June,
  //       'Closed': this.closedData[0].June,
  //       'Approved': this.approveddata[0].June,
  //       'Onhold': this.onholddata[0].June,
  //       'Rejected': this.rejectedData[0].June,
  //       'Assigned': this.assigneddata[0].June,
  //     },

  //     {
  //       'Month': 'July',
  //       'Open': this.opendata[0].July,
  //       'Closed': this.closedData[0].July,
  //       'Approved': this.approveddata[0].July,
  //       'Onhold': this.onholddata[0].July,
  //       'Rejected': this.rejectedData[0].July,
  //       'Assigned': this.assigneddata[0].July,
  //     },
  //     {
  //       'Month': 'August',
  //       'Open': this.opendata[0].August,
  //       'Closed': this.closedData[0].August,
  //       'Approved': this.approveddata[0].August,
  //       'Onhold': this.onholddata[0].August,
  //       'Rejected': this.rejectedData[0].August,
  //       'Assigned': this.assigneddata[0].August,
  //     },
  //     {
  //       'Month': 'September',
  //       'Open': this.opendata[0].September,
  //       'Closed': this.closedData[0].September,
  //       'Approved': this.approveddata[0].September,
  //       'Onhold': this.onholddata[0].September,
  //       'Rejected': this.rejectedData[0].September,
  //       'Assigned': this.assigneddata[0].September,
  //     },
  //     {
  //       'Month': 'October',
  //       'Open': this.opendata[0].October,
  //       'Closed': this.closedData[0].October,
  //       'Approved': this.approveddata[0].October,
  //       'Onhold': this.onholddata[0].October,
  //       'Rejected': this.rejectedData[0].October,
  //       'Assigned': this.assigneddata[0].October,
  //     },
  //     {
  //       'Month': 'November',
  //       'Open': this.opendata[0].November,
  //       'Closed': this.closedData[0].November,
  //       'Approved': this.approveddata[0].November,
  //       'Onhold': this.onholddata[0].November,
  //       'Rejected': this.rejectedData[0].November,
  //       'Assigned': this.assigneddata[0].November,
  //     },
  //     {
  //       'Month': 'Decemeber',
  //       'Open': this.opendata[0].December,
  //       'Closed': this.closedData[0].December,
  //       'Approved': this.approveddata[0].December,
  //       'Onhold': this.onholddata[0].December,
  //       'Rejected': this.rejectedData[0].December,
  //       'Assigned': this.assigneddata[0].December,
  //     },

  //   ];
  //   prepareParetoData();

  //   function prepareParetoData() {
  //     let total = 0;
  //     for (let i = 0; i < barchart2.data.length; i++) {
  //       const value = barchart2.data[i].visits;
  //       total += value;
  //     }
  //     let sum = 0;
  //     for (let i = 0; i < barchart2.data.length; i++) {
  //       const value = barchart2.data[i].visits;
  //       sum += value;
  //       barchart2.data[i].pareto = sum / total * 10;
  //     }
  //   }

  //   // Create axes
  //   const categoryAxis2 = barchart2.xAxes.push(new am4charts.CategoryAxis());
  //   categoryAxis2.dataFields.category = 'Month';
  //   categoryAxis2.title.text = 'Months';
  //   categoryAxis2.renderer.grid.template.location = 0;
  //   categoryAxis2.renderer.minGridDistance = 10;
  //   categoryAxis2.renderer.cellStartLocation = 0.1;
  //   categoryAxis2.renderer.cellEndLocation = 0.5;

  //   const valueAxis2 = barchart2.yAxes.push(new am4charts.ValueAxis());
  //   valueAxis2.min = 0;

  //   valueAxis2.title.text = 'Count';

  //   // Create series
  //   function createSeries(field, name, stacked) {
  //     const series2 = barchart2.series.push(new am4charts.ColumnSeries());
  //     series2.dataFields.valueY = field;
  //     series2.dataFields.categoryX = 'Month';
  //     series2.name = name;
  //     series2.columns.template.tooltipText = '{name}: [bold]{valueY}[/]';
  //     series2.stacked = stacked;
  //     series2.columns.template.width = am4core.percent(50);
  //   }

  //   createSeries('Open', 'Open', true);
  //   createSeries('Closed', 'Closed', true);
  //   createSeries('Approved', 'Approved', false);
  //   createSeries('Onhold', 'Onhold', true);
  //   createSeries('Rejected', 'Rejected', true);
  //   createSeries('Assigned', 'Assigned', true);

  //   // Add legend
  //   barchart2.legend = new am4charts.Legend();
  // }
  // recruiters pie chart
  recruterPie() {
    const chart = am4core.create('piechartdiv', am4charts.PieChart3D);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.legend = new am4charts.Legend();
    chart.legend.position = 'right';
    // console.log(this.recrutersData[0]);
    this.recruterDataProvider = [];
    // tslint:disable-next-line: forin
    for (const key in this.recrutersData[0]) {
      this.recruterDataProvider.push({
        Heading: key,
        Data: this.recrutersData[0][key]
      });
      console.log(this.recruterDataProvider);
    }

    for (let i = 0; i <= this.recruterDataProvider.length; i++) {
      if (this.recruterDataProvider[i].Heading === 'recruiter') {
        this.recruterDataProvider.splice(i, 1);
        // console.log(this.recruterDataProvider);
        i = this.recruterDataProvider.length;
      }
    }
    // if (this.recruterDataProvider.length > 1) {
    const val = this.recruterDataProvider.reduce(function(
      previousValue,
      currentValue
    ) {
      return {
        Data: previousValue.Data + currentValue.Data
      };
    });

    let obj = {
      Heading: 'TOTAL',
      Data: val.Data
    };
    this.recruterDataProvider.push(obj);
    if (Number(val.Data) !== 0) {
      this.recruterNodata = '';
      const newArr = [];
      this.recruterDataProvider.forEach(element => {
        console.log(this.recruterDataProvider);
        if (element.Heading === 'TOTAL' ||
          element.Heading === 'JOINED' ||
          element.Heading === 'OFFERED' ||
          element.Heading === 'DROP_OUT' ||
          element.Heading === 'ABSCONDED'
        ) {
          newArr.push(element);
          console.log(newArr);
        }
      });
      chart.data = newArr;
    } else {
      this.recruterNodata = 'No Available Data for' + ' ' + this.selectedUser;
    }
    const series = chart.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = 'Data';
    series.dataFields.category = 'Heading';
    series.labels.template.disabled = true;
  }

  // account mangers pie chart
  accountMangerPie() {
    const donutchart = am4core.create('donutchartdiv', am4charts.PieChart3D);
    donutchart.hiddenState.properties.opacity = 0; // this creates initial fade-in
    this.mngDataProvider = [];
    // donutchart.legend = new am4charts.Legend();
    donutchart.legend = new am4charts.Legend();
    donutchart.legend.position = 'right';

    // tslint:disable-next-line: forin
    for (const key in this.accountMngData[0]) {
      this.mngDataProvider.push({
        country: key,
        value: this.accountMngData[0][key]
      });
    }
    for (let i = 0; i <= this.mngDataProvider.length; i++) {
      if (this.mngDataProvider[i].country === 'recruiter') {
        this.mngDataProvider.splice(i, 1);
        i = this.mngDataProvider.length;
      }
      // this.list1.some(element => element.authorityId === data.authorityId)
    }
    console.log(this.mngDataProvider);
    const val = this.mngDataProvider.reduce(function(
      previousValue,
      currentValue
    ) {
      return {
        value: previousValue.value + currentValue.value
      };
    });
    console.log(val);
    let obj = {
      country: 'TOTAL',
      value: val.value
    };
    this.mngDataProvider.push(obj);
    if (val.value !== 0) {
      this.noData = '';
      const newArr = [];
      this.mngDataProvider.forEach(element => {
        if (
          element.country === 'TOTAL' ||
          element.country === 'JOINED' ||
          element.country === 'OFFERED' ||
          element.country === 'DROP_OUT' ||
          element.country === 'ABSCONDED'
        ) {
          newArr.push(element);
          console.log(newArr);
        }
      });
      donutchart.data = newArr;
    } else {
      this.noData = 'No Available Data for' + ' ' + this.selectedManager;
    }
    donutchart.innerRadius = 60;
    const seriesVs = donutchart.series.push(new am4charts.PieSeries3D());
    seriesVs.dataFields.value = 'value';
    seriesVs.dataFields.category = 'country';
    seriesVs.labels.template.disabled = true;
  }

  ngOnDestroy() {
    this.subscribe.next();
    this.subscribe.complete();
  }

  onGridReady(params) {
    this.gridApi = params.api;
  }
  // vendor cards data
 
  // vendorSuccessChart

  // vendor dashboard jobs
  vendorDashboardJobs() {
    this._userService
      .vendorDashboardJobs(
        this.todate,
        this.fromdate,
        this.selectedValue,
        this.pageid,
        this.rowid
      )
      .pipe(takeUntil(this.subscribe))
      .subscribe(
        res => {
          console.log(res);
          this.vendordashboardjobdata = res;
          this.responsePageCount = this.vendordashboardjobdata[0].pageCount;
          console.log(this.responsePageCount);
          this.totalcount = this.vendordashboardjobdata[0].jobCount;
          // this.vendordashboardjobdata.forEach(element => {
          //   if (element.jobStatus === 'Inactive') {
          //     element.jobStatus = 'InActive';
          //   } else {
          //     element.jobStatus = 'Active';
          //   }
          // });
        },
        error => {
          console.log(error);
        }
      );
  }
  // For Pagiantions
  onBtNext() {
    debugger;
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
    this.vendordashboardjobdata = [];
    console.log('onPaginationPageLoaded', event);
    this.pageid = this.pageid + 1;
    this.vendorDashboardJobs();
  }
  onBtPrevious() {
    this.disableNextButton = false;
    this.pageCount--;
    if (this.pageCount === 1) {
      this.disablePreviousButton = true;
    } else {
      this.disablePreviousButton = false;
    }
    this.vendordashboardjobdata = [];
    console.log('onPaginationPageLoaded', event);
    this.pageid = this.pageid - 1;
    this.vendorDashboardJobs();
  }
}
