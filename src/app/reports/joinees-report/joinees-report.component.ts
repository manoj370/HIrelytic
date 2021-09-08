import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserService } from '../../services/user.service';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
@Component({
  selector: 'app-joinees-report',
  templateUrl: './joinees-report.component.html',
  styleUrls: ['./joinees-report.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class JoineesReportComponent implements OnInit {
  months = [
    { month: 'January' },
    { month: 'February' },
    { month: 'March' },
    { month: 'April' },
    { month: 'May' },
    { month: 'June' },
    { month: 'July' },
    { month: 'August' },
    { month: 'September' },
    { month: 'October' },
    { month: 'November' },
    { month: 'December' },
  ];
  // dateform: FormGroup;
  month: any;
  enterdate: any;
  joineesReport: any = [];
  date: any;
  currentmonth: number;
  noData: string;
  joineeArray: any[];
  fromdate: string;
  todate: string;
  selectedValue: string;
  constructor( private userService: UserService) {
    // this.dateform = new FormGroup({
    //   date: new FormControl('', Validators.compose([Validators.pattern(/^[^-\s][0-9 ]*$/)])),
    // });
  }
  ngOnInit() {
    //     this.dateform = this.fb.group({
    // date : ['', Validators.compose([Validators.pattern(/^[^-\s][0-9 ]*$/)])]
    //     });
    this.defaultReport();
  }
  defaultReport() {
    // this.date = new Date().getFullYear();
    // this.enterdate = this.date;
    // this.month = '';
    const roleName = sessionStorage.getItem('userRoles');
    if (roleName === 'ADMIN') {
      // this.Conditions();
      // this.fromdate = '2019-4-01';
      // this.todate = '2020-3-31';
      const d = new Date();
      const month = d.getMonth();
      const year = d.getFullYear();
      const date = d.getDate();
      // 1 year back
      this.fromdate = (year - 1) + '-' + (month + 2) + '-' + (date - 18);
      console.log(this.fromdate);
      // current date
      this.todate = year + '-' + (month + 1) + '-' + date;
      console.log(this.todate);
      this.joineeAdminReport();
    } else {
      // this.Conditions();
      const d = new Date();
      const month = d.getMonth();
      const year = d.getFullYear();
      const date = d.getDate();
      // 1 year back
      this.fromdate = (year - 1) + '-' + (month + 2) + '-' + (date - 18);
      console.log(this.fromdate);
      // current date
      this.todate = year + '-' + (month + 1) + '-' + date;
      console.log(this.todate);
      this.joineeIndividualReport();
    }
  }
  monthEvent(event) {
    this.month = event;
    const roleName = sessionStorage.getItem('userRoles');
    if (roleName === 'ADMIN') {
      this.Conditions();
    } else {
      this.Conditions();
    }
  }
  enterdatee(event) {
    this.enterdate = event;
    const roleName = sessionStorage.getItem('userRoles');
    if (roleName === 'ADMIN') {
      this.Conditions();
    } else {
      this.Conditions();
    }
  }
  Conditions() {
    const roleName = sessionStorage.getItem('userRoles');
    if (roleName === 'ADMIN') {
      if ((this.enterdate !== null) && (this.month !== '')) {
        this.joineeAdminReport();
      } else if ((this.enterdate !== null) && (this.month === '')) {
        this.joineeAdminReport();
      }
    } else {
      debugger
      if ((this.enterdate !== '') && (this.month !== '')) {
        this.joineeIndividualReport();
      } else if ((this.enterdate !== '') && (this.month === '')) {
        this.joineeIndividualReport();
      } else if ((this.enterdate === '') && (this.month !== '')) {
        this.defaultReport();
      }
    }
  }
  monthList() {
    this.months = [
      { month: 'January' },
      { month: 'February' },
      { month: 'March' },
      { month: 'April' },
      { month: 'May' },
      { month: 'June' },
      { month: 'July' },
      { month: 'August' },
      { month: 'September' },
      { month: 'October' },
      { month: 'November' },
      { month: 'December' },
    ];
    console.log(this.months);
  }
  reset() {
    this.defaultReport();
    // this.dateform.reset();
    // this.resetFields();
    this.monthList();
  }
  // resetFields() {
  //   var inputArray = document.querySelectorAll('input');
  //   inputArray.forEach(function (input) {
  //     input.value = '';
  //   });
  //   var select = document.querySelectorAll('select');
  //   select.forEach(function (select) {
  //     select.innerHTML = '';
  //   });
  // }
  joineePie() {
    const barchart = am4core.create('chartdiv', am4charts.PieChart);
    // Add and configure Series
    const pieSeries = barchart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = 'joinees';
    pieSeries.dataFields.category = 'Month';

    barchart.legend = new am4charts.Legend();
    barchart.legend.position = "bottom";
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
    pieSeries.labels.template.text = '{value.percent.formatNumber(\'#.0\')}%';
    pieSeries.labels.template.radius = am4core.percent(-40);
    pieSeries.labels.template.fill = am4core.color('white');
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
    this.joineeArray = [];
    this.joineesReport.forEach(ele => {
      const monthobj = {
        Month: ele.Month,
        joinees: ele.joinees,

      };
      this.joineeArray.push(monthobj);
      console.log(this.joineeArray);
    });
    barchart.data = this.joineeArray;
    // Enable export
    barchart.exporting.menu = new am4core.ExportMenu();
    let title = barchart.titles.create();
    title.text = 'Joinees Report(Month Wise)';
  }
  // Allow Numbers only
  numberOnly(event): boolean {
    // console.log(event)
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
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
        this.joineeAdminReport();
      } else {
        this.joineeIndividualReport();
      }
    }
  }
  joineeAdminReport() {
    this.userService.joineesAdminReport(this.fromdate, this.todate).subscribe(res => {
      console.log(res);
      this.joineesReport = res;
      if (this.joineesReport !== 0) {
        this.joineePie();
      } else {
        this.noData = 'No Available Data to Preview';
      }
    }, error => {
      console.log(error);
    });
  }
  joineeIndividualReport() {
    this.userService.joineesIndividualReport(this.fromdate, this.todate).subscribe(res => {
      console.log(res);
      this.joineesReport = res;
      if (this.joineesReport !== 0) {
        this.joineePie();
      }
    }, error => {
      console.log(error);
    });
  }
}
