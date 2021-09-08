import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { updateVendor } from '../../models/updateVendors';
import { VendorService } from '../../services/vendor.service';
import { JobPostingService } from '../../services/jobposting.service';
import { NewServiceService } from '../../services/new-service.service';
import { UserService } from '../../services/user.service';
import { NotificationMessageService } from '../../services/notification.service';

@Component({
  selector: 'app-viewvendor',
  templateUrl: './viewvendor.component.html',
  styleUrls: ['./viewvendor.component.css']
})
export class ViewvendorComponent implements OnInit, OnDestroy {
  @ViewChild('modalForchangeStatus') modalForchangeStatus: ElementRef;
  vendorId: any;
  routedVendorId: any;
  viewVendors: any;
  vendorEditForm: FormGroup;
  countryList: any;
  countryCode: string;
  totalCount: any;
  stateList: any;
  updateVendorObj: updateVendor = new updateVendor();
  editbtnInView: boolean = false;
  obj: any;
  statuses: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  selectedstatus: boolean;
  privileges: any = [];
  authority: any;
  manageVendors = false;
  dropdownListVendors: any = [];
  vendorJobForm: FormGroup;
  rowselectstatus: any;
  GridApi: any;
  pageid: any = 0;
  rowid: any = 15;
  disableNextButton: boolean = false;
  disablePreviousButton: boolean = true;
  responsePageCount: number = 0;
  pageCount: number = 1;
  paymentdetails: any = [];
  datee: string;
  allPaymentStatuses: any = [];
  disabledpaymentStatus: boolean = true;
  paymentId: any;
  show: boolean = false;
  constructor(private _vendorService: VendorService, private _jobpostingService: JobPostingService,
    private VendorServices: VendorService, private activatedRoute: ActivatedRoute,
    private route: Router, private newService: NewServiceService,
    private _UserService: UserService, private spin: NgxSpinnerService, private _notificationsService: NotificationMessageService) {
    // this.vendorobj = new vendor();
    this.activatedRoute.params.subscribe((params: Params) => this.routedVendorId = params['id']);
    console.log(this.routedVendorId, 'this.routedVendorId')
    this.activatedRoute.params.subscribe((params: Params) => this.statuses = params['status']);
    console.log(this.statuses);
  }
  colDefspayment = [
    {
      headerName: 'Candidate Name', checkboxSelection: true,
      cellStyle: { 'text-transform': 'capitalize', 'font-size': '12px' },
      field: 'Candidate Name', width: 200, unSortIcon: true
    },
    {
      headerName: 'Date Of Join', cellStyle: { 'text-transform': 'capitalize', 'font-size': '12px', 'text-align': 'center' },
      field: 'Date Of Join', width: 200,
      rowSelection: 'multiple', unSortIcon: true
    },
    {
      headerName: 'Percentage', cellStyle: { 'text-transform': 'capitalize', 'font-size': '12px', 'text-align': 'center' },
      field: 'Percentage', width: 200,
      rowSelection: 'multiple', unSortIcon: true
    },
    {
      headerName: 'Settlement Date', cellStyle: { 'text-transform': 'capitalize', 'font-size': '12px', 'text-align': 'center' },
      field: 'Settlement Date', width: 200,
      rowSelection: 'multiple', unSortIcon: true
    },
    {
      headerName: 'Initiated By', cellStyle: { 'text-transform': 'capitalize', 'font-size': '12px', 'text-align': 'center' },
      field: 'Initiated By', width: 200,
      rowSelection: 'multiple', unSortIcon: true
    },
    {
      headerName: 'Status', cellStyle: { 'text-transform': 'capitalize', 'font-size': '12px', 'text-align': 'center' },
      field: 'Status', width: 200,
      rowSelection: 'multiple', unSortIcon: true
    }
    // settlementDate
  ];
  ngOnInit() {
    this.vendorEditForm = new FormGroup({
      vendorName: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^[^-\s][a-zA-Z ]*$/)])),
      gsTNumber: new FormControl('',
        Validators.compose([Validators.required, Validators.pattern(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/)])),
      tanNumber: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^([A-Z]){4}([0-9]){5}([A-Z]){1}?$/)])),
      emailId: new FormControl(''),
      contactPerson: new FormControl('',
        Validators.compose([Validators.required, Validators.pattern(/^([\w.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)])),
      firstName: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^[^-\s][a-zA-Z ]*$/)])),
      lastName: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^[^-\s][a-zA-Z ]*$/)])),
      phoneNumber: new FormControl('',
        Validators.compose([Validators.required,
        Validators.maxLength(10), Validators.minLength(10), Validators.pattern(/^[^-\s][0-9 ]*$/)])),
      alternateNumber: new FormControl('',
        Validators.compose([Validators.maxLength(10), Validators.minLength(10)])),
      address1: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^[^-\s][a-zA-Z[0-9:;,._\s#&()-/]*$/)])),
      address2: new FormControl('', Validators.pattern(/^[a-zA-Z[0-9:;,._\s#&()-/]*$/)),
      bankAccountNumber: new FormControl('',
        Validators.compose([Validators.required, Validators.minLength(10), Validators.pattern(/^[^-\s][0-9 ]*$/)])),
      ifscCode: new FormControl('',
        Validators.compose([Validators.required, Validators.pattern(/^[A-Za-z]{4}[a-zA-Z0-9]{7}$/)])),
      bankBranchDetails: new FormControl("",
        Validators.compose([Validators.required, Validators.pattern(/^[^-\s][a-zA-Z 0-9]*$/)])),
      country: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      city: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^[^-\s][a-zA-Z\s]*$/)])),
      pincode: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.pattern(/^[0-9]*$/)])),

    });
    if (this.statuses === 'Active') {
      this.editbtnInView = false;
      this.show = false;
    } else {
      this.editbtnInView = true;
      this.show = true;
    }
    this.vendorGetData();
    this.getPrivilege();
    this.getVendorPaymentStatuses();
  }
  // VENDOR DETAILS BY ID
  vendorGetData() {
    this.VendorServices.getViewOfVendor(this.routedVendorId).takeUntil(this.destroy$)
      .subscribe(res => {
        console.log(res, 'VendorTab');
        this.viewVendors = res;
        this.updateVendorObj.vendorId = this.viewVendors.vendor.vendorId;
      }, error => {
        console.log(error);
      });
  }
  // UPDATE STATUS
  onChangeStatus(status: any) {
    console.log(status);
    this.rowselectstatus = status;
    console.log(this.rowselectstatus);
    this.modalForchangeStatus.nativeElement.click();
  }
  //  Changing the status
  submitStatus() {
    if (this.rowselectstatus === '1') {
      const username = this.viewVendors.vendor.emailId + '|' + sessionStorage.getItem('tenantId');
      let obj = {
        username: username,
        enabled: false
      };
      console.log(obj);
      this.VendorServices.updateVendorStatus(obj).subscribe(res => {
        console.log(res);
        this.route.navigate(['manage-vendors/manageVendors']);
        this._notificationsService.showSuccessNotif('Success', 'Status Changed Successfully');
      }, error => {
        console.log(error);
        this._notificationsService.showErrorNotif('Failed', 'Status Changed Failed');
      });
    } else {
      const username = this.viewVendors.vendor.emailId + '|' + sessionStorage.getItem('tenantId');
      let obj = {
        username: username,
        enabled: true
      };
      this.VendorServices.updateVendorStatus(obj).subscribe(res => {
        console.log(res);
        this.route.navigate(['manage-vendors/manageVendors']);
        this._notificationsService.showSuccessNotif('Success', 'Status Changed Successfully');
      }, error => {
        console.log(error);
        this._notificationsService.showErrorNotif('Failed', 'Status Changed Failed');
      });
    }
  }
  // BACK TO VENDOR
  backToVendor() {
    this.route.navigate(['manage-vendors/manageVendors']);
  }
  setFormValues() {
    this.getAllCountries();
    this.onCountryChange(this.viewVendors.address.country);
    console.log(this.viewVendors.vendor.vendorName);
    this.vendorEditForm.patchValue({
      vendorName: this.viewVendors.vendor.vendorName,
      tanNumber: this.viewVendors.vendor.tanNumber,
      phoneNumber: this.viewVendors.vendor.phoneNumber,
      alternateNumber: this.viewVendors.vendor.alternateNumber,
      emailId: this.viewVendors.vendor.emailId,
      gsTNumber: this.viewVendors.vendor.taxId,
      address1: this.viewVendors.address.line1,
      address2: this.viewVendors.address.line2,
      country: this.viewVendors.address.country,
      state: this.viewVendors.address.state,
      city: this.viewVendors.address.city,
      pincode: this.viewVendors.address.zipCode,
      bankAccountNumber: this.viewVendors.vendor.bankAccountNumber,
      ifscCode: this.viewVendors.vendor.ifscCode,
      bankBranchDetails: this.viewVendors.vendor.bankBranchDetails,
      contactPerson: this.viewVendors.vendor.contactPerson,
      firstName: this.viewVendors.firstName,
      lastName: this.viewVendors.lastName,
    });
  }
  // update vendor details
  updateVendor() {
    this.spin.show();
    const vendorDetails = {
      vendorId: this.viewVendors.vendor.vendorId,
      vendorName: this.vendorEditForm.get('vendorName').value,
      emailId: this.vendorEditForm.get('emailId').value,
      phoneNumber: this.vendorEditForm.get('phoneNumber').value,
      alternateNumber: this.vendorEditForm.get('alternateNumber').value,
      contactPerson: this.vendorEditForm.get('contactPerson').value,
      taxId: this.vendorEditForm.get('gsTNumber').value,
      tanNumber: this.vendorEditForm.get('tanNumber').value,
      bankAccountNumber: this.vendorEditForm.get('bankAccountNumber').value,
      ifscCode: this.vendorEditForm.get('ifscCode').value,
      bankBranchDetails: this.vendorEditForm.get('bankBranchDetails').value,
      tenantId: sessionStorage.getItem('tenantId'),
      'user': {
        'userId': sessionStorage.getItem('userId'),
        'firstName': this.vendorEditForm.get('firstName').value,
        'lastName': this.vendorEditForm.get('lastName').value,
        'phoneNumber': this.vendorEditForm.get('phoneNumber').value,
        'emailId': this.vendorEditForm.get('emailId').value,
        'address': {
          'addressId': this.viewVendors.address.addressId,
          'line1': this.vendorEditForm.get('address1').value,
          'line2': this.vendorEditForm.get('address2').value,
          'city': this.vendorEditForm.get('city').value,
          'state': this.vendorEditForm.get('state').value,
          'country': this.vendorEditForm.get('country').value,
          'zipCode': this.vendorEditForm.get('pincode').value,
          'landmark': ''
        }
      }
    };
    this.VendorServices.updateEditVendor(vendorDetails).takeUntil(this.destroy$).subscribe(result => {
      console.log(result);
      if (result.response.respcode == "SUCCESS") {
        this.spin.hide();
        this._notificationsService.showSuccessNotif('Success', 'Vendor details updated successfully');
      } else {
        this._notificationsService.showErrorNotif('Success', 'Failed to update vendor details');
      }
      this.vendorGetData();
    },
      error => {
        this.spin.hide();
        this._notificationsService.showErrorNotif('Success', 'Failed to update vendor details');
      }
    );
  }
  //to get all countries
  private getAllCountries() {
    this.newService.countriesList().subscribe(res => {
      this.countryList = res;
      console.log(this.countryList, 'countrylist');
    });
  }
  // on selecting a country
  onCountryChange(countryId: any) {
    this.newService.stateslistttt(countryId).subscribe(res => {
      this.stateList = res;
      console.log(this.stateList, 'states');
    });
  }
  keyPress(event: any) {
    const pattern = /^[0-9.]*$/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  // For Unsunscribing the api 
  ngOnDestroy() {
    this.destroy$.unsubscribe();
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
        if (this.authority === 'MANAGE VENDORS') {
          this.manageVendors = true;
        }

      });
    });
  }
  // Grid for payment details for vendor
  public onGridReady(param): void {
    this.GridApi = param.api;
    this.GridApi.sizeColumnsToFit();
    window.onresize = () => {
      this.GridApi.sizeColumnsToFit();
    };
  }
  // Payment Details
  paymentDetails() {
    if (this.manageVendors = true) {
      this._vendorService.paymentDetailsBasedonVendorId
        (this.routedVendorId, this.pageid, this.rowid).takeUntil(this.destroy$).subscribe(res => {
          console.log(res[0].pageCount);
          this.paymentdetails = res;
          this.responsePageCount = this.paymentdetails[0].pageCount;
          this.paymentId = this.paymentdetails[0].paymentId;
          console.log(this.paymentId);
        }, error => {
          console.log(error);
        });
    }
  }
  // For Pagiantions
  onBtNext() {
    this.disablePreviousButton = false;
    this.disableNextButton = true;
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
    this.paymentdetails = [];
    this.pageid = this.pageid + 1;
    console.log('onPaginationPageLoaded', event);
    this.paymentDetails();
  }
  onBtPrevious() {
    this.disableNextButton = false;
    this.pageCount--;
    if (this.pageCount === 1) {
      this.disablePreviousButton = true;
    } else {
      this.disablePreviousButton = false;
    }
    this.paymentdetails = [];
    this.pageid = this.pageid - 1;
    console.log('onPaginationPageLoaded', event);
    this.paymentDetails();
  }
  // pdfs and excels for payment details
  downloadPaymentPdf() {
    if (this.manageVendors === true) {
      let date: Date = new Date();
      this.datee = date.getFullYear().toString()
        + '-' + ('0' + (date.getMonth() + 1).toString()).slice(-2) +
        '-' + ('0' + (date.getDate()).toString()).slice(-2);
      console.log(this.datee);
      this._vendorService.downloadPaymentPdf(this.routedVendorId).takeUntil(this.destroy$).subscribe(res => {
        let blob = res;
        let a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'paymentdue.pdf' + ' ' + this.datee + '.pdf';
        document.body.appendChild(a);
        a.click();
      });
    }
  }
  downloadPaymentExcel() {
    if (this.manageVendors === true) {
      let date: Date = new Date();
      this.datee = date.getFullYear().toString()
        + '-' + ('0' + (date.getMonth() + 1).toString()).slice(-2) +
        '-' + ('0' + (date.getDate()).toString()).slice(-2);
      console.log(this.datee);
      this._vendorService.downloadPaymentExcel(this.routedVendorId).takeUntil(this.destroy$).subscribe(res => {
        let blob = res;
        let a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'paymentdue.xls' + ' ' + this.datee + '.xls';
        document.body.appendChild(a);
        a.click();
      });
    }
  }
  // GETLIST OF VENODR PAYMENT STATUSES
  getVendorPaymentStatuses() {
    this._vendorService.getVendorPaymentStatus().takeUntil(this.destroy$).subscribe(res => {
      console.log(res);
      this.allPaymentStatuses = res;
    }, error => {
      console.log(error);
    });
  }
  // onselectionchanged
  onSelectionChanged() {
    const selectedrows = this.GridApi.getSelectedRows();
    console.log(selectedrows[0]);
    if (selectedrows.length > 0) {
      this.disabledpaymentStatus = false;
    } else {
      this.disabledpaymentStatus = true;
    }
  }
  // changing payment status
  PaymentChangeStatus(event) {
    console.log(event);
    this._vendorService.changeVendorPaymentStatus(this.paymentId, event).takeUntil(this.destroy$).subscribe(res => {
      console.log(res);
      this.paymentDetails();
      this._notificationsService.showSuccessNotif('Success', 'Payment Status Changed Successfuly');
    }, error => {
      console.log(error);
      this._notificationsService.showErrorNotif('Failed', 'Payment Status Changed Failed');
    });
    this.allPaymentStatuses = [];
    this.getVendorPaymentStatuses();
  }
}

