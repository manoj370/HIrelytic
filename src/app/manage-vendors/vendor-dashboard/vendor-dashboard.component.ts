import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NewServiceService } from '../../services/new-service.service';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
@Component({
  selector: 'app-vendor-dashboard',
  templateUrl: './vendor-dashboard.component.html',
  styleUrls: ['./vendor-dashboard.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class VendorDashboardComponent implements OnInit {

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
      width: 150,
      unSortIcon: true
    },
    {
      headerName: 'Selected',
      cellStyle: { 'text-transform': 'capitalize', 'font-size': '12px' },
      field: 'selectedCount',
      width: 150,
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
        'rag-green-outer': function (params) {
          return params.value === 'ASSIGNED';
        }
      },
      cellRenderer: function (params) {
        return '<span class="rag-element">' + params.value + '</span>';
      }
    }
  ];
  todate: string;
  fromdate: string;
  selectedValue: string;
  vendorId: string;
  vendorcardData: any;
  dataProvider: any[];
  noData: string;
  vendordashboardjobdata: any = [];
  public pageid: any = 0;
  public rowid: any = 15;
  disableNextButton: boolean = false;
  disablePreviousButton: boolean = true;
  responsePageCount: number = 0;
  pageCount: number = 1;
  totalcount: any;
  constructor(private userservice: UserService, private newservice: NewServiceService) { }

  ngOnInit() {
    this.defaultVendorReport();
  }
  defaultVendorReport() {
    this.newservice
      .getUserDetails()
      .subscribe(result => {
        for (let index = 0; index < result.roles.length; index++) {
          const element = result.roles[index].roleName;
          if (element === 'VENDOR') {
            this.fromdate = null;
            this.todate = null;
            this.selectedValue = '1 Year';
            this.vendorcarddata();
            this.vendorDashboardJobs();
          }
        }
      });
  }
  public datePicker(event) {
    const roleName = sessionStorage.getItem('userRoles');
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
      this.selectedValue = 'notSelected';
      if (roleName === 'VENDOR') {
        this.vendorId = sessionStorage.getItem('userId');
        this.vendorcarddata();
        this.vendorDashboardJobs();
      }
    }
  }
  public dateOption(eventValue) {
    // console.log(eventValue);
    const roleName = sessionStorage.getItem('userRoles');
    if (
      eventValue === '1 Month' ||
      eventValue === '3 Months' ||
      eventValue === '6 Months'
    ) {
      this.fromdate = null;
      this.todate = null;
      this.selectedValue = eventValue;
      if (roleName === 'VENDOR') {
        this.vendorId = sessionStorage.getItem('userId');
        this.vendorcarddata();
        this.vendorDashboardJobs();
      }
    } else if (eventValue === 'Date Range') {
      this.datePicker(event);
    } else {
      this.fromdate = null;
      this.todate = null;
      this.selectedValue = eventValue;
      if (roleName === 'VENDOR') {
        this.vendorcarddata();
        this.vendorDashboardJobs();
      }
      // new change
    }
  }
  // vendor cards data
  vendorcarddata() {
    this.userservice
      .vendordashboardCardData(this.todate, this.fromdate, this.selectedValue)
      .subscribe(
        res => {
          this.vendorcardData = res;
          console.log(this.vendorcardData);
          if (res) {
            this.successrateChart();
          } else {
            this.noData = 'No Data';
          }
        },
        error => {
          console.log(error);
        }
      );
  }
  // vendorSuccessChart
  successrateChart() {
    // Create chart instance
    let chart = am4core.create('successrate', am4charts.PieChart);
    // Add and configure Series
    const pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = 'Data';
    pieSeries.dataFields.category = 'Heading';

    // Let's cut a hole in our Pie chart the size of 30% the radius
    chart.innerRadius = am4core.percent(10);

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
    // tslint:disable-next-line: forin
    for (const key in this.vendorcardData) {
      this.dataProvider.push({
        Heading: key,
        Data: this.vendorcardData[key]
      });
    }
    console.log(this.dataProvider);
    for (let i = 0; i <= this.dataProvider.length; i++) {
      if (this.dataProvider[i].Heading === 'assignedJobsCount') {
        this.dataProvider.splice(i, 1);
        i = this.dataProvider.length;
      }
    }
    for (let i = 0; i <= this.dataProvider.length; i++) {
      if (this.dataProvider[i].Heading === 'selectedCandidatesCount') {
        this.dataProvider.splice(i, 1);
        i = this.dataProvider.length;
      }
    }

    for (let i = 0; i <= this.dataProvider.length; i++) {
      if (this.dataProvider[i].Heading === 'paymentApprovals') {
        this.dataProvider.splice(i, 1);
        i = this.dataProvider.length;
      }
    }
    for (let i = 0; i <= this.dataProvider.length; i++) {
      if (this.dataProvider[i].Heading === 'paymentPending') {
        this.dataProvider.splice(i, 1);
        i = this.dataProvider.length;
      } 
    }
    console.log(this.dataProvider);
    chart.data = this.dataProvider;
    // if (this.dataProvider.Data !== 0) {
    //   this.noData = '';
    //   chart.data = this.dataProvider;
    // } else {
    //   this.noData = 'No Available Data to Preview';
    // }
  }
  vendorDashboardJobs() {
    this.userservice
      .vendorDashboardJobs(
        this.todate,
        this.fromdate,
        this.selectedValue,
        this.pageid,
        this.rowid
      ).subscribe(res => {
        console.log(res);
        this.vendordashboardjobdata = res;
        // this.responsePageCount = this.vendordashboardjobdata[0].pageCount;
        console.log(this.responsePageCount);
        // this.totalcount = this.vendordashboardjobdata[0].jobCount;
      },
        error => {
          console.log(error);
        }
      );
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
