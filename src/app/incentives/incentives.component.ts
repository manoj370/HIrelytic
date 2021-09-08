import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserService } from './../services/user.service';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { NewServiceService } from './../services/new-service.service';
import { NotificationMessageService } from '../services/notification.service';
import { RxwebValidators, ReactiveFormConfig } from '@rxweb/reactive-form-validators';
import { error } from 'protractor';
interface incetiveFrom {
  recruitesLow: number;
  recruitesHigh: number;
  incentivePayment: number;
}

@Component({
  selector: 'app-incentives',
  templateUrl: './incentives.component.html',
  styleUrls: ['./incentives.component.css']
})
export class IncentivesComponent implements OnInit, OnDestroy {
  userList: any;
  settingId: any;
  rowData: any = [];
  rowHeight: number;
  btnValues = true;
  incentiveStatusForm: FormGroup;
  incentiveForm: FormGroup;
  subscribe: Subject<any> = new Subject<any>();
  allCandidateData: any;
  JoinedCandidates: any;
  newIncentivedata: any;
  privileges: any;
  authority: string;
  showAdminIncentives = true;
  showRecruiterIncentives = true;
  showvendorpayments = true;
  public pageid: any = 0;
  public rowid: any = 10;
  disableNextButton = false;
  disablePreviousButton = true;
  responsePageCount: number;
  pageCount = 1;
  totalCount: any;
  datee: string;
  selectMethod: any;
  radioItems: any = [];
  enum_details = [
    { name: 'STEPPED' },
    { name: 'FLAT' },
  ];
  showValues = false;
  items: FormArray;
  @ViewChild('dismissModal') closeBtn: ElementRef<HTMLElement>;
  statusIncentive: any;
  incetiveFrom: incetiveFrom[] = [];
  mypaymentinfo: any = [];
  settlementData: any;
  statusList: any;
  itemsData: any;
  constructor(private fb: FormBuilder, private _notificationsService: NotificationMessageService,
    private newServices: NewServiceService, private userSer: UserService) {
    this.rowHeight = 30;
    this.radioItems = ['STEPPED', 'FLAT'];
  }

  ngOnInit() {
    this.checkPrivileges();
    ReactiveFormConfig.set({ 'validationMessage': { 'unique': 'Enter unique value to the' } });
    // ReactiveFormConfig.set({ 'validationMessage': { 'greaterThan': 'Input should be greater than ' } });
    ReactiveFormConfig.set({ 'validationMessage': { 'lessThan': 'Input should be lessThan ' } });

    this.incentiveForm = this.fb.group({
      incentiverName: ['', Validators.required],
      incentiveMode: ['FLAT', Validators.required],
      incentiveAmount: ['', [Validators.required, Validators.maxLength(5)]],
      incentivePeriod: ['', [Validators.required, Validators.maxLength(3)]],
      items: this.fb.array([this.createItem(this.incetiveFrom)])
    });
    this.incentiveStatusForm = this.fb.group({
      incetiveStatus: ['', Validators.required],
    });
  }

  selecetdValue(data: any) {
    this.selectMethod = data;
    if ((this.selectMethod.includes('STEPPED'))) {
      this.showValues = false;
    } else {
      this.showValues = true;
    }
  }

  createItem(incetiveFrom): FormGroup {
    return this.fb.group({
      recruitesLow: [incetiveFrom.recruitesLow, [RxwebValidators.unique(), RxwebValidators.lessThan({ fieldName: 'recruitesHigh' })]],
      recruitesHigh: [incetiveFrom.recruitesHigh, [RxwebValidators.unique(), RxwebValidators.greaterThan({ fieldName: 'recruitesLow' })]],
      incentivePayment: [incetiveFrom.incentivePayment, [RxwebValidators.unique(), Validators.maxLength(5)]]
    });
  }
  addItem(): void {
    this.items = this.incentiveForm.get('items') as FormArray;
    this.items.push(this.createItem(this.incetiveFrom));
  }
  deleteFieldValue(i: any) {
    console.log(this.items);
    const incentiveItemsData = this.incentiveForm.get('items') as FormArray;
    incentiveItemsData.removeAt(i);
  }
  get f() { return this.incentiveForm.controls; }  // controls
  get g() { return this.incentiveStatusForm.controls; }  // controls



  public checkPrivileges() {
    const privileges = JSON.parse(sessionStorage.getItem('Privileges'));
    privileges.forEach(element => {
      this.privileges = element.authorities;
      this.privileges.forEach((elementt: any) => {
        this.authority = elementt.authorityName;
        // console.log(this.authority, sessionStorage.getItem('userRoles'));
        if ((this.authority === 'MANAGE MY INCENTIVES') && (sessionStorage.getItem('userRoles') === 'Recruiter')) {
          this.showAdminIncentives = false;
          this.showRecruiterIncentives = true;
          this.showvendorpayments = false;
          this.getJoinedCandidates();
          for (let index = 0; index < this.getallCandidateJoinedcolumnDef.length; index++) {
            const element = this.getallCandidateJoinedcolumnDef[index];
            if (element.headerName === 'Action') {
              this.getallCandidateJoinedcolumnDef.splice(index, 1);
              index = this.getallCandidateJoinedcolumnDef.length;
            }
          }
          // this.getallCandidateJoinedcolumnDef.forEach((element) => {
          //   var elemntObj=element;
          //   if (element.headerName === 'Action') {
          //     this.getallCandidateJoinedcolumnDef.splice(elemntObj, 1)
          //   }
          // });
        } else if ((this.authority === 'MY PAYMENTS') && (sessionStorage.getItem('userRoles') === 'VENDOR')) {
          this.showAdminIncentives = false;
          this.showRecruiterIncentives = true;
          this.showvendorpayments = true;
          this.getMyPaymentsForCandidatesJoinedInfo();

        } else if (this.authority === 'MANAGE INCENTIVES') {
          this.getallIncentives();
          this.getStatusList();
          this.getallCandidateJoined();
          this.getuser('MANAGE MY INCENTIVES');
          this.showRecruiterIncentives = false;
          this.showvendorpayments = false;
          this.showAdminIncentives = true;
          console.log(this.getallCandidateJoinedcolumnDef);
        }
      });
    });
  }

  // tslint:disable-next-line: member-ordering
  columnDefs = [
    {
      headerName: 'Incentiver Role',
      cellStyle: { 'text-transform': 'capitalize', 'font-size': '12px' },
      field: 'incentiveType', width: 200, unSortIcon: true
    },
    {
      headerName: 'Incentive Amount', cellStyle: { 'text-transform': 'capitalize', 'font-size': '12px', 'text-align': 'center' },
      field: 'incentivePayment', width: 200,
      rowSelection: 'multiple', unSortIcon: true
    },
    {
      headerName: 'Incentive Period', cellStyle: { 'text-transform': 'capitalize', 'font-size': '12px', 'text-align': 'center' },
      field: 'incentiveSettlementPeriod', width: 200,
      rowSelection: 'multiple', unSortIcon: true
    },
    {
      headerName: 'Incentive Type', field: 'incentiveMode', width: 200, unSortIcon: true,
      cellClassRules: {
        'rag-green-closed': function (params) {
          return params.value === 'FLAT';
        },
        'rag-amber-outer': function (params) {
          return params.value === 'STEPPED';
        },
      },
      cellRenderer: function (params) {
        return '<span class="rag-element">' + params.value + '</span>';
      }
    },
    {
      headerName: 'Action', width: 100, cellRenderer: function () {
        return '<span class="editIcon"><i class="fas fa-edit updateIcon"  data-toggle="modal" data-target="#Incentive" ></i> </span>';
      }
    },

  ];
  // tslint:disable-next-line: member-ordering
  getallCandidateJoinedcolumnDef = [
    {
      headerName: 'Candidate',
      cellStyle: { 'text-transform': 'capitalize', 'font-size': '12px' },
      field: 'candidateName', width: 170, unSortIcon: true
    },
    {
      headerName: 'Date of Join', cellStyle: { 'text-transform': 'capitalize', 'font-size': '12px', 'text-align': 'center' },
      field: 'dateOfJoin', width: 170,
      rowSelection: 'multiple', unSortIcon: true
    },
    {
      headerName: 'Account Manager',
      cellStyle: { 'text-transform': 'capitalize', 'font-size': '12px' },
      field: 'accountMananagerName', width: 170, unSortIcon: true
    },
    {
      headerName: 'Manager Inective', cellStyle: { 'text-transform': 'capitalize', 'font-size': '12px', 'text-align': 'center' },
      field: 'accountMananagerIncentiveAmount', width: 170,
      rowSelection: 'multiple', unSortIcon: true
    },

    {
      headerName: 'Due Date', cellStyle: { 'text-transform': 'capitalize', 'font-size': '12px', 'text-align': 'center' },
      field: 'settlementDate', width: 170,
      rowSelection: 'multiple', unSortIcon: true
    },
    {
      headerName: 'Recruiter', cellStyle: { 'text-transform': 'capitalize', 'font-size': '12px', 'text-align': 'center' },
      field: 'recruiterName', width: 170,
      rowSelection: 'multiple', unSortIcon: true
    },
    {
      headerName: 'Incentive', cellStyle: { 'text-transform': 'capitalize', 'font-size': '12px', 'text-align': 'center' },
      field: 'incentiveAmount', width: 170,
      rowSelection: 'multiple', unSortIcon: true
    },
    {
      headerName: 'Status', field: 'paymentStatus', width: 150,
    },
    {
      headerName: 'Action', width: 100, cellRenderer: function () {
        return '<span class="editIcon"><i class="fas fa-edit updateIcon"  data-toggle="modal" data-target="#incentiveStatus" ></i> </span>';
      }
    },
    // settlementDate
  ];

  // tslint:disable-next-line: member-ordering
  myPaymentsForCandidatesJoined = [
    {
      headerName: 'Candidate Name',
      cellStyle: { 'text-transform': 'capitalize', 'font-size': '12px' },
      field: 'Candidate Name', width: 200, unSortIcon: true
    },
    {
      headerName: 'Date of Join', cellStyle: { 'text-transform': 'capitalize', 'font-size': '12px', 'text-align': 'center' },
      field: 'Date Of Join', width: 200,
      rowSelection: 'multiple', unSortIcon: true
    },
    {
      headerName: 'Payment (%)', cellStyle: { 'text-transform': 'capitalize', 'font-size': '12px', 'text-align': 'center' },
      field: 'Percentage', width: 200,
      rowSelection: 'multiple', unSortIcon: true
    },
    {
      headerName: 'Due Date', cellStyle: { 'text-transform': 'capitalize', 'font-size': '12px', 'text-align': 'center' },
      field: 'Settlement Date', width: 200,
      rowSelection: 'multiple', unSortIcon: true
    },
    {
      headerName: 'Initiated By', cellStyle: { 'text-transform': 'capitalize', 'font-size': '12px', 'text-align': 'center' },
      field: 'Initiated By', width: 200,
      rowSelection: 'multiple', unSortIcon: true
    },
    {
      headerName: 'Status', field: 'Status', width: 150,
      cellClassRules: {
        'rag-green-outer': function (params) {
          return params.value === 'PROCESSED';
        },
      },

      cellRenderer: function (params) {
        return '<span class="rag-element">' + params.value + '</span>';
      }
    }
    // settlementDate
  ];

  // Get Call
  getallIncentives() {
    this.newServices.ghetAllIncentives().pipe(takeUntil(this.subscribe)).subscribe(allIncentives => {
      console.log(allIncentives);
      this.rowData = allIncentives;
      this.rowData.forEach(element => {
        if (element.status === 1) {
          element.status = 'PROCESSED';
        } else if (element.status === 0) {
          element.status = 'ASSIGNED';
        }
      });
    }, (error: any) => {
      console.log(error.message);
    });
  }
  getallCandidateJoined() {
    this.newServices.getallCandidateJoined(this.pageid, this.rowid).pipe(takeUntil(this.subscribe)).subscribe(allCandidateJoined => {
      console.log(allCandidateJoined);
      this.allCandidateData = allCandidateJoined;
      if (this.allCandidateData.length !== 0) {
        this.totalCount = this.allCandidateData[0].jobCount;
      }
    }, error => {
      console.log(error);
    });
  }
  getJoinedCandidates() {
    const userIdValue = sessionStorage.getItem('userId');
    this.newServices.getJoinedCandidates(userIdValue, this.pageid, this.rowid)
      .pipe(takeUntil(this.subscribe)).subscribe(JoinedCandidates => {
        console.log(JoinedCandidates);
        this.JoinedCandidates = JoinedCandidates;
        this.totalCount = this.JoinedCandidates[0].jobCount;
      }, error => {
        console.log(error);
      });
  }

  createIncentive() {
    console.log(this.incentiveForm.value);
    const obj = {
      incentiveType: this.incentiveForm.value.incentiverName,
      incentiveMode: this.incentiveForm.value.incentiveMode,
      incentiveSettlementPeriod: this.incentiveForm.value.incentivePeriod,
      incentivePayment: this.incentiveForm.value.incentiveAmount,
      steppedIncentives: this.incentiveForm.value.items
    };
    console.log(obj);
    this.newServices.createIncentive(obj).pipe(takeUntil(this.subscribe)).subscribe(data => {
      console.log(data);
      this.newIncentivedata = data;
      this.getallIncentives();
      this.clearValidations();
      this._notificationsService.showSuccessNotif(data.response.respcode, data.response.message);
    }, error => {
      console.log(error.response);
      this._notificationsService.showErrorNotif('Error', 'Alreay Existes');
    });
  }


  // edit Data
  editData(event) {
    console.log(event.data);
    this.btnValues = false;
    this.statusIncentive = event.data.status;
    this.settingId = event.data.settingId;
    this.selectMethod = event.data;
    this.selecetdValue(event.data.incentiveMode);
    if (event.data.steppedIncentives !== null) {
      this.incentiveForm.setControl('items', this.setExistingIncentive(event.data.steppedIncentives));
    }
    this.incentiveForm.patchValue({
      incentiverName: event.data.incentiveType,
      incentiveAmount: event.data.incentivePayment,
      incentivePeriod: event.data.incentiveSettlementPeriod,
      incentiveMode: event.data.incentiveMode,
    });
  }
  getStatusList() {
    this.newServices.getIncetvieStatusList().subscribe((data: any) => {
      console.log(data);
      this.statusList = data;
    }, error => {
      console.log(error.message);
    })
  }
  update(event: any) {
    console.log(event.data);
    this.settlementData = event.data;
    this.incentiveStatusForm.setValue({
      incetiveStatus: event.data.paymentStatus
    });
  }
  changeStatus(data: any) {
    console.log(data);
    console.log(this.incentiveStatusForm.value);
    const obj = {
      paymentId: this.settlementData.paymentId,
      status: this.incentiveStatusForm.value.incetiveStatus
    };
    console.log(obj);
    this.newServices.updateIncetiverStatus(obj).subscribe((updateData: any) => {
      console.log(updateData);
      this._notificationsService.showSuccessNotif('Success', 'Status Updated');
      this.getallCandidateJoined();
      this.closeBtn.nativeElement.click();
    }, error => {
      console.log(error.message);
      this._notificationsService.showErrorNotif('Error', error.response.message);
      this.closeBtn.nativeElement.click();
    });
  }
  setExistingIncentive(incentiveForm): FormArray {
    const formArray = new FormArray([]);
    console.log(incentiveForm);
    incentiveForm.forEach(s => {
      formArray.push(this.fb.group
        ({
          recruitesLow: s.recruitesLow,
          recruitesHigh: s.recruitesHigh,
          incentivePayment: s.incentivePayment,
        }));
    });
    return formArray;
  }



  getuser(data: any) {
    this.userSer.getUsersRolesList(data)
      .pipe(takeUntil(this.subscribe))
      .subscribe(result => {
        this.userList = result;
        console.log(result, 'Users');
      }, error => {
        console.log(error);
      });
  }
  // update incentives
  updateIncentive() {
      console.log(this.incentiveForm.value);
      const obj = {
        settingId: this.settingId,
        incentiveType: this.incentiveForm.value.incentiverName,
        incentiveMode: this.incentiveForm.value.incentiveMode,
        incentiveSettlementPeriod: this.incentiveForm.value.incentivePeriod,
        incentivePayment: this.incentiveForm.value.incentiveAmount,
        steppedIncentives: this.incentiveForm.value.items
      };
      this.newServices.updateIncentives(obj).pipe(takeUntil(this.subscribe)).subscribe(data => {
        console.log(data);
        this.getallIncentives();
        this.clearValidations();
        this._notificationsService.showSuccessNotif(data.response.respcode, data.response.message);
      }, error => {
        console.log(error);
        this._notificationsService.showErrorNotif(error.response.respcode, error.response.message);
      });

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
  getvalue() {
    console.log(this.incentiveForm.value)
  }

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
    this.pageid = this.pageid + 1;
    this.getMyPaymentsForCandidatesJoinedInfo();
  }
  onBtPrevious() {
    this.disableNextButton = false;

    this.pageCount--;
    if (this.pageCount === 1) {
      this.disablePreviousButton = true;
    } else {
      this.disablePreviousButton = false;
    }
    this.allCandidateData = [];
    this.pageid = this.pageid - 1;
    this.getMyPaymentsForCandidatesJoinedInfo();
  }

  // Clear Validations
  clearValidations() {
    this.btnValues = true;
    this.incentiveForm.reset();
    this.selecetdValue('FLAT');
  }

  ngOnDestroy() {
    this.subscribe.next();
    this.subscribe.complete();
  }

  // Export as pdfs and excels
  downloadIncentiveReportPdf() {
    let date: Date = new Date();
    this.datee = date.getFullYear().toString()
      + '-' + ('0' + (date.getMonth() + 1).toString()).slice(-2) +
      '-' + ('0' + (date.getDate()).toString()).slice(-2);
    if (sessionStorage.getItem('userRoles') === 'ADMIN') {
      this.newServices.downloadIncentiveReportPdf().subscribe(res => {
        let blob = res;
        let a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'incentiveReportPdf.pdf' + ' ' + this.datee + '.pdf';
        document.body.appendChild(a);
        a.click();

      });
    }
    else if (sessionStorage.getItem('userRoles') === 'VENDOR') {
      this.newServices.downloadIncentiveReportPdf().subscribe(res => {
        let blob = res;
        let a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'paymentReportPdf.pdf' + ' ' + this.datee + '.pdf';
        document.body.appendChild(a);
        a.click();

      });
    }
    else {
      this.newServices.downloadIncentiveReportPdf().subscribe(res => {
        const blob = res;
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'incentiveReportUser.pdf' + '' + this.datee + '.pdf';
        document.body.appendChild(a);
        a.click();
      });
    }
  }


  downloadIncentiveReportExcel() {
    let date: Date = new Date();
    this.datee = date.getFullYear().toString() + '-' + ('0' + (date.getMonth() + 1).toString()).slice(-2) + '-' + ('0' + (date.getDate()).toString()).slice(-2);
    console.log(this.datee);
    debugger
    if (sessionStorage.getItem('userRoles') === 'ADMIN') {
      this.newServices.downloadIncentiveReportExcel()
        .pipe(takeUntil(this.subscribe))
        .subscribe(res => {
          let blob = res;
          let a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = 'IncentiveExcel.xls' + '' + this.datee + '.xls';
          document.body.appendChild(a);
          a.click();

        });
    }
    else if (sessionStorage.getItem('userRoles') === 'VENDOR') {
      this.newServices.downloadIncentiveReportExcel()
        .pipe(takeUntil(this.subscribe))
        .subscribe(res => {
          let blob = res;
          let a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = 'paymentExcel.xls' + '' + this.datee + '.xls';
          document.body.appendChild(a);
          a.click();

        });
    }
    else {
      this.newServices.downloadIncentiveReportExcel()
        .pipe(takeUntil(this.subscribe))
        .subscribe(res => {
          const blob = res;
          const a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = 'IncentiveExcelUser.xls' + '' + this.datee + '.xls';
          document.body.appendChild(a);
          a.click();
        });
    }
  }
  // vendor my payments information
  getMyPaymentsForCandidatesJoinedInfo() {
    if (this.showvendorpayments === true) {
      this.newServices.getPaymentsForCandidatesJoinedInfo(this.pageid, this.rowid).pipe(takeUntil(this.subscribe)).subscribe(res => {
        console.log(res);
        this.mypaymentinfo = res;
        if (this.mypaymentinfo.length > 0) {
          this.responsePageCount = this.mypaymentinfo[0].pageCount;
          console.log(this.responsePageCount);       }

        // tslint:disable-next-line: no-shadowed-variable
      }, error => {
        console.log(error);
      });
    }
  }
}
