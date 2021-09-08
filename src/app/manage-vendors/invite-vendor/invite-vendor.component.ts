import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { element } from '@angular/core/src/render3/instructions';
import { ToastrManager } from 'ng6-toastr-notifications';
import { error } from '@angular/compiler/src/util';
import { AfterViewInit, ViewChild, ElementRef, ɵConsole } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subject } from 'rxjs';
import { EventDispatcher } from '@amcharts/amcharts4/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import { TenantDetails } from '../../models/tenantroles';
import { NewServiceService } from '../../services/new-service.service';
import { VendorService } from '../../services/vendor.service';
import { JobPostingService } from '../../services/jobposting.service';
import { NotificationMessageService } from '../../services/notification.service';
import { vendor } from '../../models/vendor';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-invite-vendor',
  templateUrl: './invite-vendor.component.html',
  styleUrls: ['./invite-vendor.component.css']
})
export class InviteVendorComponent implements OnInit, OnDestroy {
  @ViewChild('vendorBtn') vendorBtn: ElementRef;

  vendorDataColumns = [
    {
      headerName: 'Name', field: 'vendor.vendorName', width: 150, rowSelection: 'multiple',
      minWidth: 70, unSortIcon: true,
    },
    {
      headerName: 'Email', field: 'vendor.emailId', width: 150, rowSelection: 'multiple', minWidth: 85,
      tooltipField: 'emailId', unSortIcon: true,
    },
    { headerName: 'Phone', field: 'vendor.phoneNumber', width: 150, rowSelection: 'multiple', minWidth: 150, unSortIcon: true, },
    { headerName: 'Contact Person', field: 'vendor.contactPerson', width: 150, rowSelection: 'multiple', minWidth: 100, unSortIcon: true, },
    { headerName: 'State', field: 'address.state', width: 150, rowSelection: 'multiple', minWidth: 150, unSortIcon: true, },
    { headerName: 'City', field: 'address.city', width: 150, rowSelection: 'multiple', minWidth: 150, unSortIcon: true, },
    {
      headerName: 'Status', field: 'status', width: 150, rowSelection: 'multiple', minWidth: 150, unSortIcon: true,
      cellClassRules: {
        'rag-green-active': function (params) {
          return params.value === 'Active';
        },
        'rag-amber-inactive': function (params) {
          return params.value === 'InActive';
        },

      },
      cellRenderer: function (params) {
        return '<span class="rag-element">' + params.value + "</span>";
      }
    },

    {
      headerName: 'Action', width: 180, unSortIcon: true, cellRenderer: function () {
        return '<span class="editIcon"><i class="fa fa-eye viewIcon" ></span>';
      }

    },
  ];
  vendorSettingColumns = [

    {
      headerName: 'Policy Name', field: 'policyName', width: 200, rowSelection: 'multiple',
      minWidth: 100,  unSortIcon: true, checkboxSelection: true,
      cellStyle: { 'text-transform': 'capitalize', 'font-size': '12px' },
    },
    {
      headerName: 'Invoicing Days', field: 'invoiceClaimPeriod', width: 200, rowSelection: 'multiple',
      minWidth: 100,  unSortIcon: true,
      cellStyle: { 'text-transform': 'capitalize', 'font-size': '12px' },
    },

    {
      headerName: 'Payment Days', field: 'incentiveSettlementPeriod', width: 200, rowSelection: 'multiple', minWidth: 100, unSortIcon: true,
      cellStyle: { 'text-transform': 'capitalize', 'font-size': '12px' },
    },
    {
      headerName: 'Placement Fee(%)', field: 'incentivePaymentPercentage', width: 150,
      rowSelection: 'multiple', minWidth: 100, tooltipField: 'emailId', unSortIcon: true,
      cellStyle: { 'text-transform': 'capitalize', 'font-size': '12px' },
    },
    {
      headerName: 'Policy Generated', field: 'createdDate', width: 200, rowSelection: 'multiple',
      minWidth: 100,  unSortIcon: true,
      cellStyle: { 'text-transform': 'capitalize', 'font-size': '12px' },
    },
    // {
    //   headerName: 'No.of Installments', field: 'noOfInstallments', width: 100,
    //   rowSelection: 'multiple', minWidth: 100, unSortIcon: true,
    //   cellStyle: { 'text-transform': 'capitalize', 'font-size': '12px' },
    // },
    {
      headerName: 'Action', width: 250, unSortIcon: true, cellRenderer: function () {
        return '<span class="editIcon"><i class="fas fa-edit updateIcon" "  data-toggle="modal" data-target="#addPaymentModal"></i> </span>';
      }
    },
  ];

  // tslint:disable-next-line: member-ordering
  getallCandidateJoinedcolumnDef = [
    {
      headerName: 'Candidate Name',
      cellStyle: { 'text-transform': 'capitalize', 'font-size': '12px' },
      field: 'candidateName', width: 200, unSortIcon: true
    },
    {
      headerName: 'Date of Join', cellStyle: { 'text-transform': 'capitalize', 'font-size': '12px', 'text-align': 'center' },
      field: 'dateOfJoin', width: 200,
      rowSelection: 'multiple', unSortIcon: true
    },
    {
      headerName: 'Incentive Amount', cellStyle: { 'text-transform': 'capitalize', 'font-size': '12px', 'text-align': 'center' },
      field: 'incentiveAmount', width: 200,
      rowSelection: 'multiple', unSortIcon: true
    },
    {
      headerName: 'Settlement Date', cellStyle: { 'text-transform': 'capitalize', 'font-size': '12px', 'text-align': 'center' },
      field: 'settlementDate', width: 200,
      rowSelection: 'multiple', unSortIcon: true
    },
    {
      headerName: 'Recruiter Name', cellStyle: { 'text-transform': 'capitalize', 'font-size': '12px', 'text-align': 'center' },
      field: 'recruiterName', width: 200,
      rowSelection: 'multiple', unSortIcon: true
    },
    {
      headerName: 'Status', field: 'paymentStatus', width: 150,
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

  colDefsVendors = [
    {
      headerName: 'Vendor Name',
      cellStyle: { 'text-transform': 'capitalize', 'font-size': '12px' },
      field: 'vendorName', width: 200, unSortIcon: true
    },
    {
      headerName: 'Email', cellStyle: { 'text-transform': 'capitalize', 'font-size': '12px', 'text-align': 'center' },
      field: 'emailId', width: 200,
      rowSelection: 'multiple', unSortIcon: true
    },
    {
      headerName: 'Contact Person', cellStyle: { 'text-transform': 'capitalize', 'font-size': '12px', 'text-align': 'center' },
      field: 'contactPerson', width: 200,
      rowSelection: 'multiple', unSortIcon: true
    },
    {
      headerName: 'Phone', cellStyle: { 'text-transform': 'capitalize', 'font-size': '12px', 'text-align': 'center' },
      field: 'phoneNumber', width: 200,
      rowSelection: 'multiple', unSortIcon: true
    }
    // settlementDate
  ];
  inviteVendorForm: FormGroup;
  vendorobj: any;
  model: TenantDetails = new TenantDetails();
  allUserRoles: any;
  vendorRoleId: string;
  vendorEmails: any = [];
  toastr: any;
  GridApi: any;
  vendorData: any;
  // gridOptions: { animate: boolean; enableColResize: boolean; columnDefs: any; rowData: any; rowHeight: number; headerHeight: number; };
  gridOptions: any;
  listOfVendors: any = [];
  public rowSelection;
  public rowSelectedId: number;
  public disabledChangeStatus: boolean = true;
  columnDefs: any;
  disableviewbtn: boolean = true;
  listOfVendorsJson: any = [];
  privileges: any = [];
  roleId: any;
  rowid: any = 15;
  pageid: any = 0;
  disableNextButton = false;
  disablePreviousButton = true;
  responsePageCount: number = 0;
  pageCount: number = 1;
  searchValue: any;
  status: any;
  totalCount: any;

  vendorEditForm: FormGroup;
  viewVendors: any;
  routedVendorId: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  countryList: any;
  stateList: any;
  addressId: any;
  manageVendors = false;
  authority: any;
  dropdownListVendors: any = [];
  vendorPaymentForm: FormGroup;
  statuses: any;
  policylist: any = [];
  editpayment: boolean = true;
  settingId: any;
  assignVendorDropdownSettings: { singleSelection: boolean; idField: string; textField: string; selectAllText: string; unSelectAllText: string; itemsShowLimit: number; allowSearchFilter: boolean; noDataAvailablePlaceholderText: string; };
  vendorJobForm: FormGroup;
  vendorIds: any;
  assignVendorIds: any = [];
  gridApi: any;
  assignPaymentButton: boolean = true;
  showvendorPayments = true;
  vendorlist: any = [];
  vendornames: any = [];
  todate: string;
  fromdate: string;
  selectedValue: string;
  admindashboarddetails: any = [];
  dataProvider: any[];
  noData: string;
  vendorid: any;
  vendorId: any;
  vendorstatisticsdata: any = [];
  vendorchangeid: any;
  constructor(private route: Router, private newService: NewServiceService, private _jobpostingService: JobPostingService,
    private _VendorService: VendorService, private userService: UserService, private router: Router, private _notificationsService: NotificationMessageService, private spin: NgxSpinnerService) {
    this.vendorobj = new vendor();


  }
  private closeModal(): void {
    this.vendorBtn.nativeElement.click();
  }
  ngOnInit() {

    // Vendor Edit form validations

    this.vendorEditForm = new FormGroup({
      vendorName: new FormControl("", Validators.compose([Validators.required, Validators.pattern(/^[^-\s][a-zA-Z ]*$/)])),
      tanNumber: new FormControl("", Validators.compose([Validators.required, Validators.pattern(/^([A-Z]){4}([0-9]){5}([A-Z]){1}?$/)])),
      firstName: new FormControl("", Validators.compose([Validators.required, Validators.pattern(/^[^-\s][a-zA-Z ]*$/)])),
      lastName: new FormControl("", Validators.compose([Validators.required, Validators.pattern(/^[^-\s][a-zA-Z ]*$/)])),
      phoneNumber: new FormControl("",
        Validators.compose([Validators.required,
        Validators.maxLength(10), Validators.minLength(10), Validators.pattern(/^[^-\s][0-9 ]*$/)])),
      alternateNumber: new FormControl("",
        Validators.compose([Validators.maxLength(10), Validators.minLength(10)])),
      emailId: new FormControl(""),
      gsTNumber: new FormControl('',
        Validators.compose([Validators.required, Validators.pattern(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/)])),
      address1: new FormControl("", Validators.compose([Validators.required, Validators.pattern(/^[^-\s][a-zA-Z[0-9:;,._\s#&()-/]*$/)])),
      address2: new FormControl("", Validators.pattern(/^[a-zA-Z[0-9:;,._\s#&()-/]*$/)),
      country: new FormControl("", Validators.required),
      state: new FormControl("", Validators.required),
      city: new FormControl("", Validators.compose([Validators.required, Validators.pattern(/^[^-\s][a-zA-Z0-9\s]*$/)])),
      pincode: new FormControl("", Validators.compose([Validators.required, Validators.minLength(6), Validators.pattern(/^[0-9]*$/)])),
      contactPerson: new FormControl("",
        Validators.compose([Validators.required, Validators.pattern(/^([\w.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)])),
      bankAccountNumber: new FormControl("",
        Validators.compose([Validators.required, Validators.maxLength(16), Validators.minLength(10), Validators.pattern(/^[^-\s][0-9 ]*$/)])),
      ifscCode: new FormControl("",
        Validators.compose([Validators.required, Validators.pattern(/^[A-Za-z]{4}[a-zA-Z0-9]{7}$/)])),
      bankBranchDetails: new FormControl("",
        Validators.compose([Validators.required, Validators.pattern(/^[^-\s][a-zA-Z 0-9]*$/)]))
    });

    this.getRoleId();
    this.getListOfVendorDetails();
    this.getPrivilege();
    this.getListOfVendorsForAdminDashboard();
    debugger
    this.checkRoles();

    this.inviteVendorForm = new FormGroup({
      emailId: new FormControl("", Validators.compose([Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)])),
      // vendorName: new FormControl("", Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)])),
    });
    // PAYMENT VALIDATIONS
    this.vendorPaymentForm = new FormGroup({
      policyname: new FormControl("", Validators.compose([Validators.required, Validators.pattern(/^[^-\s][a-zA-Z0-9 ]*$/)])),
      paymentperiod: new FormControl("", Validators.compose([Validators.required, Validators.pattern('^[0-9]+[0-9]+')])),
      paymentsettlementperiod: new FormControl("", Validators.compose([Validators.required, Validators.pattern('^[0-9]+[0-9]+')])),
      paymentamount: new FormControl("", Validators.compose([Validators.required, Validators.pattern(/^[^-\s][0-9.% ]*$/)])),
      // installments: new FormControl("", Validators.compose([Validators.required, Validators.pattern(/^[^-\s][0-9 ]*$/)])),
    });


    this.gridOptions = {
      enableColResize: true,
      columnDefs: this.columnDefs,
      rowData: null,
      rowHeight: 35,
      headerHeight: 35,
    }
    this.gridOptions.rowStyle = { background: '#FFFFFF' };
    this.gridOptions.getRowStyle = function (params) {
      if (params.node.rowIndex % 2 === 0) {
        return { background: '#F8F8F8' };
      }
    };
    this.assignVendorDropdownSettings = {
      singleSelection: false,
      idField: 'vendorId',
      textField: 'vendorName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true,
      noDataAvailablePlaceholderText: 'No data found',
    };
    this.vendorJobForm = new FormGroup({
      vendorNames: new FormControl('', Validators.required),
    });

  }
  // INVITE VENDOR 
  inviteVendor(vendorFormDetails) {
    const formdetails =
    {
      'emailId': this.inviteVendorForm.get('emailId').value,
    }
    this._VendorService.inviteVendor(formdetails).subscribe(res => {
      console.log(res);
      debugger
      if (res.startsWith('User already exist ')) {
        this._notificationsService.showWarnNotif('Warning', 'Vendor already exist with this mail');
        this.inviteVendorForm.reset();
      }
      else {
        this._notificationsService.showSuccessNotif('Success', 'Invitation mail sent successfully For Vendor');
        this.inviteVendorForm.reset();
      }

    }, error => {
      console.log(error);
      this._notificationsService.showErrorNotif('Failed', 'Internal server error,unable to invite vendor.');
    });
  }
  // FOR GETTING ROLEID
  getRoleId() {
    this.privileges = JSON.parse(sessionStorage.getItem('Privileges'));
    console.log(this.privileges);

    for (let index = 0; index < this.privileges.length; index++) {
      const element = this.privileges[index].roleId;
      console.log(element);
      this.roleId = element;
    }
  }
  public onGridReadyList(param): void {
    this.GridApi = param.api;
    this.GridApi.sizeColumnsToFit();
    window.onresize = () => {
      this.GridApi.sizeColumnsToFit();
    }
  }
  public onGridReadySettings(param): void {
    this.gridApi = param.api;
    this.gridApi.sizeColumnsToFit();
    window.onresize = () => {
      this.gridApi.sizeColumnsToFit();
    }
  }
  getListOfVendorDetails() {
    this._VendorService.getListOfVendors(sessionStorage.getItem('tenantId'), this.rowid, this.pageid).subscribe(res => {

      this.listOfVendors = res;
      this.totalCount = res[0].jobCount;
      console.log(this.totalCount);
      console.log(this.listOfVendors[0].status);

      for (let index = 0; index < this.listOfVendors.length; index++) {
        const element = this.listOfVendors[index].status;
        console.log(element);
        debugger
        if (element == true) {
          this.listOfVendors[index].status = "Active"
        }
        else {
          this.listOfVendors[index].status = "InActive"
        }
      }
    },
    ), error => {
      console.log(error);
    };
  }
  // FOR SELECTING THE ROW BUTTON ENABLE AND DISABLING BUTTONS AND NAVIGATE TO ANOTHER COMPONENT
  public onSelectionChanged() {
    const selectedRows = this.GridApi.getSelectedRows();
    console.log(selectedRows);
    if (selectedRows.length > 0) {
      this.rowSelectedId = selectedRows[0].vendor.vendorId;
      this.status = selectedRows[0].status;
      this.disabledChangeStatus = false;
      this.disableviewbtn = false;
      this.router.navigate(['./viewvendor', { id: this.rowSelectedId, status: this.status }]);
    } else {
      this.disabledChangeStatus = true;
      this.disableviewbtn = true;
    }
  }
  // FOR ROUTING
  routeToNavigate() {
    this.router.navigate(['/viewvendor', { id: this.rowSelectedId }]);
  }
  // FOR RESETTING THE FORM
  inviteVendorReset() {
    this.inviteVendorForm.reset();
    this.vendorPaymentForm.reset();
  }
  // For Pagiantions
  onBtNext() {
    debugger
    this.disablePreviousButton = false;
    this.pageCount++;
    if (this.pageCount === this.responsePageCount) {
      this.disableNextButton = true;
      this.disablePreviousButton = false;
    }
    else if (this.pageCount >= this.responsePageCount) {
      this.pageCount--;
      this.disableNextButton = true;
      this.disablePreviousButton = true;
      this.pageid = this.pageid - 1;
    }
    else {
      this.disableNextButton = false;
      this.disablePreviousButton = false;
    }
    this.listOfVendors = [];
    console.log('onPaginationPageLoaded', event);
    this.pageid = this.pageid + 1;
    this._VendorService.getListOfVendors(sessionStorage.getItem('tenantId'), this.rowid, this.pageid).subscribe(res => {
      console.log(res);
      this.listOfVendors = res;
    });
  }
  onBtPrevious() {
    this.disableNextButton = false;
    this.pageCount--;
    if (this.pageCount === 1) {
      this.disablePreviousButton = true;
    } else {
      this.disablePreviousButton = false;
    }
    this.listOfVendors = [];
    console.log('onPaginationPageLoaded', event);
    this.pageid = this.pageid + 1;
    this._VendorService.getListOfVendors(sessionStorage.getItem('tenantId'), this.rowid, this.pageid).subscribe(res => {
      console.log(res);
      this.listOfVendors = res;
    });
  }
  // Searching Purpose
  quickSearch() {
    this.GridApi.setQuickFilter(this.searchValue);
  }
  // For Unsunscribing the api 
  ngOnDestroy() {
    this.destroy$.unsubscribe();
  }
  // For Navigating the page
  editStatus(event: any) {
    console.log(event.data.vendorId)
    this.routedVendorId = event.data.vendor.vendorId;
    this.statuses = event.data.status
    this.router.navigate(['manage-vendors/viewVendor', { id: this.routedVendorId, status: this.statuses }]);
  }

  getPrivilege() {

    let privileges = JSON.parse(sessionStorage.getItem('Privileges'))
    console.log(privileges, 'PRIVILEGES');
    privileges.forEach(element => {
      this.privileges = element.authorities;
      console.log(this.privileges, 'authorities');
      this.privileges.forEach(element => {
        this.authority = element.authorityName;
        console.log(this.authority, 'authoirithyName');
        if ((this.authority === 'VENDOR PAYMENT POLICY') && (sessionStorage.getItem('userRoles') !== 'ADMIN')) {
          this.showvendorPayments = false;
          // this.vendorPaymentList();

        } else if (this.authority === 'MANAGE VENDORS') {
          this.manageVendors = true;
          this.showvendorPayments = true;
        }

      });
    });

  }
  checkRoles() {
    debugger
    const userRoles = sessionStorage.getItem('userRoles');
    console.log(userRoles);
    if (userRoles === 'ADMIN') {
      this.fromdate = null;
      this.todate = null;
      this.selectedValue = "1 Year"
      this.vendorAdminDashboard();
      this.vendorChangeEvent(this.vendorchangeid);
      // this.vendorStatistics();

    }
  }
  getAllVendorNames() {
    if (this.manageVendors == true) {
      this._jobpostingService.getAllVendors(sessionStorage.getItem('tenantId')).takeUntil(this.destroy$).subscribe(res => {
        console.log(res, 'response for all vedors');
        this.dropdownListVendors = res;
      }, error => {
        console.log(error);
      })
    }

  }
  // submit payment details
  submitPaymentDetails() {
    debugger
    if (this.manageVendors == true) {
      const vendorpaymentdetails = {
        'incentiveSettlementPeriod': this.vendorPaymentForm.get('paymentsettlementperiod').value,
        'incentivePaymentPercentage': this.vendorPaymentForm.get('paymentamount').value,
        'invoiceClaimPeriod': this.vendorPaymentForm.get('paymentperiod').value,
        'tenantId': sessionStorage.getItem('tenantId'),
        'policyName': this.vendorPaymentForm.get('policyname').value,
        // 'noOfInstallments': this.vendorPaymentForm.get('installments').value,
      };
      this._VendorService.vendorPaymentSetting(vendorpaymentdetails).takeUntil(this.destroy$).subscribe(res => {
        console.log(res);
        this._notificationsService.showSuccessNotif('Success', 'Vendor Payments Policy Successfully Completed');
        this.vendorPaymentForm.reset();
        this.getPaymentPoliciesList();
      }, error => {
        console.log(error);
      })
    }
  }
  // Policies list
  getPaymentPoliciesList() {
    if (this.manageVendors == true) {
      this._VendorService.getPaymentPoliciesList().takeUntil(this.destroy$).subscribe(res => {
        console.log(res);
        this.policylist = res;
      }, error => {
        console.log(error);
      })
    }
  }

  // For Updating The Payment Details
  editPaymentDetails(event: any) {
    this.editpayment = false;
    console.log(event.data);
    this.settingId = event.data.settingId;
    this.vendorPaymentForm.patchValue({
      'paymentperiod': event.data.invoiceClaimPeriod,
      'paymentsettlementperiod': event.data.incentiveSettlementPeriod,
      'paymentamount': event.data.incentivePaymentPercentage,
      'installments': event.data.noOfInstallments,
      'policyname': event.data.policyName

    });

  }
  buttonupdate() {

    this.vendorPaymentForm.reset();
    this.editpayment = true;
  }
  updatePaymentPolicy() {
    if (this.manageVendors == true) {
      const vendorpaymentupdatedetails = {
        'settingId': this.settingId,
        'incentiveSettlementPeriod': this.vendorPaymentForm.get('paymentsettlementperiod').value,
        'incentivePaymentPercentage': this.vendorPaymentForm.get('paymentamount').value,
        'invoiceClaimPeriod': this.vendorPaymentForm.get('paymentperiod').value,
        'tenantId': sessionStorage.getItem('tenantId'),
        'policyName': this.vendorPaymentForm.get('policyname').value,
        // 'noOfInstallments': this.vendorPaymentForm.get('installments').value,
      }
      console.log(vendorpaymentupdatedetails);

      this._VendorService.updatePaymentPolicy(vendorpaymentupdatedetails).takeUntil(this.destroy$).subscribe(res => {
        console.log(res);
        this._notificationsService.showSuccessNotif('Success', 'Vendor Payments Policy Successfully Updated');
        this.getPaymentPoliciesList();
      }, error => {
        console.log(error);
        this._notificationsService.showErrorNotif('Success', 'Vendor Payments Policy Failed');
      });
    }
  }
  // FOR SELECTING THE ROW BUTTON ENABLE AND DISABLING BUTTONS AND NAVIGATE TO ANOTHER COMPONENT
  public onSelectionChangedSettings() {
    const selectedRows = this.gridApi.getSelectedRows();
    debugger
    if (selectedRows.length === 1) {

      this.settingId = selectedRows[0].settingId;
      this.assignPaymentButton = false;
      this.vendorPaymentList();
    } else {
      this.assignPaymentButton = true;
    }
  }
  assignPaymentPolicyToVendor() {
    if (this.manageVendors == true) {
      this.assignVendorIds = [];
      this.vendorIds.forEach(element => {
        this.assignVendorIds.push(element.vendorId);
      });
      const assigndetials = {
        'vendorIds': this.assignVendorIds,
        'paymentPolicyId': this.settingId
      }
      console.log(assigndetials);
      this._VendorService.assignPaymentPolicy(assigndetials).takeUntil(this.destroy$).subscribe(res => {
        console.log(res);
        this._notificationsService.showSuccessNotif('Success', 'PaymentPolicy  Succeesfully Created For Vendor');
        this.closeModal();
        this.vendorPaymentList();
      }, error => {
        console.log(error);
        this._notificationsService.showSuccessNotif('Success', 'PaymentPolicy   Created For Vendor Failed');
      })
    }
  }
  // vendors payments api
  vendorPaymentList() {
    this._VendorService.vendorPaymentList(this.settingId).takeUntil(this.destroy$).subscribe(res => {
      console.log(res);
      this.vendorlist = res;
    }, error => {
      console.log(error);
    });
  }
  // get all vendors(active+inactive)
  getListOfVendorsForAdminDashboard() {
    this._VendorService.listOfVendors().takeUntil(this.destroy$).subscribe(res => {

      this.vendornames = res;
      for (let index = 0; index < this.vendornames.length; index++) {
        const element = this.vendornames[index].vendorId;
        console.log(element);
        this.vendorId = element;
        console.log(this.vendorId);
      }
    }, error => {
      console.log(error);
    });
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
        this.vendorAdminDashboard();
        // this.vendorStatistics();
        this.vendorChangeEvent(this.vendorchangeid);
      } else {

      }
    }
  }
  dateOption(event) {
    console.log(event);
    const roleName = sessionStorage.getItem('userRoles');
    console.log(roleName);
    debugger
    if ((event === '1 Month') || (event === '3 Months') || (event === '6 Months')) {
      this.fromdate = null;
      this.todate = null;
      this.selectedValue = event;
      if (roleName === 'ADMIN') {
        this.vendorAdminDashboard();
        // this.vendorStatistics();
        this.vendorChangeEvent(this.vendorchangeid);
      }
    } else if (event === 'Date Range') {
      console.log(event);
      this.datePicker(event);
    }
    else {
      this.fromdate = null;
      this.todate = null;
      this.selectedValue = event;
      this.vendorAdminDashboard();
      // this.vendorStatistics();
      this.vendorChangeEvent(this.vendorchangeid);
    }

  }

  // vendoradmindashboard method
  vendorAdminDashboard() {

    this._VendorService.vendorAdminDashboard(this.fromdate, this.todate, this.selectedValue).takeUntil(this.destroy$).subscribe(res => {
      console.log(res);
      this.admindashboarddetails = res;
      console.log(this.admindashboarddetails.activeVendorCount);
      debugger
      if (res) {
        this.successrateChart();
      }
      else {
        this.noData = 'No Data'
      }
    }, error => {
      console.log(error);
    });
  }
  // vendorSuccessChart
  successrateChart() {
    // Create chart instance
    let chart = am4core.create("successrate", am4charts.PieChart);
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
    pieSeries.slices.template
      // change the cursor on hover to make it apparent the object can be interacted with
      .cursorOverStyle = [
        {
          'property': 'cursor',
          'value': 'pointer'
        }
      ];

    pieSeries.labels.template.disabled = true;
    pieSeries.labels.template.bent = true;
    pieSeries.labels.template.radius = 3;
    pieSeries.labels.template.padding(0, 0, 0, 0);

    pieSeries.ticks.template.disabled = true;

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
    this.dataProvider = [];
    // tslint:disable-next-line: forin
    for (const key in this.admindashboarddetails) {
      this.dataProvider.push({
        'Heading': key,
        'Data': this.admindashboarddetails[key],
      });
    }
    console.log(this.dataProvider);
    for (let i = 0; i <= this.dataProvider.length; i++) {
      if ((this.dataProvider[i].Heading === 'assignedJobsCount')) {
        this.dataProvider.splice(i, 1);
        i = this.dataProvider.length;
      }
    } for (let i = 0; i <= this.dataProvider.length; i++) {
      if ((this.dataProvider[i].Heading === 'selectedCandidatesCount')) {
        this.dataProvider.splice(i, 1);
        i = this.dataProvider.length;
      }
    }
    for (let i = 0; i <= this.dataProvider.length; i++) {
      if ((this.dataProvider[i].Heading === 'paymentApprovals')) {
        this.dataProvider.splice(i, 1);
        i = this.dataProvider.length;
      }
    }
    for (let i = 0; i <= this.dataProvider.length; i++) {
      if ((this.dataProvider[i].Heading === 'paymentPending')) {
        this.dataProvider.splice(i, 1);
        i = this.dataProvider.length;
      }
    }
    for (let i = 0; i <= this.dataProvider.length; i++) {
      if ((this.dataProvider[i].Heading === 'activeVendorCount')) {
        this.dataProvider.splice(i, 1);
        i = this.dataProvider.length;
      }
    }
    for (let i = 0; i <= this.dataProvider.length; i++) {
      if ((this.dataProvider[i].Heading === 'inActiveVendorCount')) {
        this.dataProvider.splice(i, 1);
        i = this.dataProvider.length;
      }
    }
    for (let i = 0; i <= this.dataProvider.length; i++) {
      if ((this.dataProvider[i].Heading === 'referredCandidates')) {
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
  // venodorStatistics Admin Dashboard
  vendorStatistics() {
    this._VendorService.vendorStatisticsAdminDashboard(this.vendorId, this.fromdate,
      this.todate, this.selectedValue).takeUntil(this.destroy$).subscribe(res => {
        console.log(res);
      }, error => {
        console.log(error);
      })
  }
  vendorChangeEvent(event) {

    this.vendorchangeid = event;
    console.log(this.vendorchangeid);
    this._VendorService.vendorStatisticsAdminDashboard(this.vendorchangeid , this.fromdate,
      this.todate, this.selectedValue).takeUntil(this.destroy$).subscribe(res => {
        console.log(res);
        this.vendorstatisticsdata = res;
        if (res) {
          this.individualStatisticsChart();
        }
        else{
          this.noData='No Available Data';
        }
      }, error => {
        console.log(error);
      })
  }
  // individual statistics chart
  individualStatisticsChart() {
    // Create chart instance
    let chart = am4core.create("piechartdiv", am4charts.PieChart);
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
    pieSeries.slices.template
      // change the cursor on hover to make it apparent the object can be interacted with
      .cursorOverStyle = [
        {
          'property': 'cursor',
          'value': 'pointer'
        }
      ];

    pieSeries.labels.template.disabled = true;
    pieSeries.labels.template.bent = true;
    pieSeries.labels.template.radius = 3;
    pieSeries.labels.template.padding(0, 0, 0, 0);

    pieSeries.ticks.template.disabled = true;

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
    this.dataProvider = [];
    // tslint:disable-next-line: forin
    for (const key in this.vendorstatisticsdata[0]) {
      this.dataProvider.push({
        'Heading': key,
        'Data': this.vendorstatisticsdata[0][key],
      });
    }
    console.log(this.dataProvider);
    for (let i = 0; i <= this.dataProvider.length; i++) {
      if (this.dataProvider[i].Heading === 'recruiter') {
        this.dataProvider.splice(i, 1);
        i = this.dataProvider.length;
      }
    }
    console.log(this.dataProvider);
    chart.data = this.dataProvider;
    console.log(chart.data );
    const val = this.dataProvider.reduce(function (previousValue, currentValue) {
      return {
        Data: previousValue.Data + currentValue.Data,
      };
    });
    console.log(val);
    if (Number(val.Data) !== 0) {
      this.noData = '';
      chart.data = this.dataProvider;
    } else {
      this.noData = 'No Available Data ';
    }
  }

}



