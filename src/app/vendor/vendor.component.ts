import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { VendorService } from '../services/vendor.service';
import { vendor } from '../models/vendor';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, Route, ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { NotificationMessageService } from '../../app/services/notification.service';
import { NewServiceService } from '../services/new-service.service';


@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})

export class VendorComponent implements OnInit {
  model: any = {};

  rolesdata = [];
  vendorRegisterForm: FormGroup;
  public vendorObj: vendor;
  public vendorPassword: string;
  public vendorConfirmPassword: string;
  passerrorMsg = '';
  public passerror: boolean;

  userDetails: any = [];
  selectedValue: string = '';
  countries = [
    { code: "+1", name: "United States of America" },
    { code: "+91", name: "India" },
  ];
  countryCode: string = '+91';
  countryList: any;
  stateList: any;
  spin: any;
  paramsUserID: string;
  organisationName: string;
  email: string;
  tenantId: any;
  constructor(private newService: NewServiceService, private router: Router, private route: ActivatedRoute,
    private _notificationsService: NotificationMessageService, private _UserService: UserService, private _VendorService: VendorService) {
    this.vendorObj = new vendor();
  }

  ngOnInit() {
    this.getAllCountries();
    // this.selectedValue = '+91';
    this.route.queryParams.subscribe(params => {
      console.log(params);
      this.email = atob(params['email']);
      this.tenantId = atob(params['requestId'])
      console.log(this.email);
    })
    this.vendorRegisterForm = new FormGroup({
      vendorName: new FormControl("", Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)])),
      tanNumber: new FormControl("", Validators.compose
        ([Validators.required, Validators.pattern(/^([a-zA-Z]){4}([0-9]){5}([a-zA-Z]){1}?$/)])),
      firstName: new FormControl("", Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)])),
      lastName: new FormControl("", Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)])),
      phoneNumber: new FormControl("", Validators.compose([Validators.required, , Validators.maxLength(18), Validators.minLength(8)])),
      alternateNumber: new FormControl("", Validators.compose([Validators.maxLength(10), Validators.minLength(10)])),
      emailId: new FormControl(this.email),
      password: new FormControl("", Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(16)])),
      cnfPassword: new FormControl("", Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(16)])),
      gsTNumber: new FormControl('',
        Validators.compose([Validators.required, Validators.pattern(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/)])),
      address1: new FormControl("", Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z[0-9:;,._\s#&()-/]*$/)])),
      address2: new FormControl("", Validators.pattern(/^[a-zA-Z[0-9:;,._\s#&()-/]*$/)),
      country: new FormControl("", Validators.required),
      state: new FormControl("", Validators.required),
      city: new FormControl("", Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]*$/)])),
      pincode: new FormControl("", Validators.compose([Validators.required, Validators.pattern(/^[0-9]*$/)])),
      contactPerson: new FormControl("", Validators.compose([Validators.required, Validators.pattern(/^([\w.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)])),
      bankAccountNumber: new FormControl("", Validators.compose([Validators.required, Validators.maxLength(18), Validators.minLength(10)])),
      ifscCode: new FormControl("", Validators.compose([Validators.required, Validators.pattern(/^[A-Za-z]{4}[a-zA-Z0-9]{7}$/)])),
      bankBranchDetails: new FormControl("", Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z 0-9]*$/)]))
    });
  }

  checkPasswords() {
    if (this.vendorPassword != this.vendorConfirmPassword) {
      this.passerror = true;
      this.passerrorMsg = "Password  Mismatch";
    }
    else {
      this.passerror = false;
      this.passerrorMsg = "";
    }

  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  // VENDOR REGISTRATION FORM SUBMISSION
  onSubmit() {
    const formModel = this.vendorRegisterForm.value;
    const vendorDetails =
    {
      'passWord': formModel.password,
      'firstName': formModel.firstName,
      'lastName': formModel.lastName,
      'emailId': formModel.emailId,
      'phoneNumber': formModel.phoneNumber,
      'address': {
        'line1': formModel.address1,
        'city': formModel.address2,
        'state': formModel.state,
        'country': formModel.country,
        'zipCode': formModel.pincode
      },
      'vendor': {
        'vendorName': formModel.vendorName,
        'emailId': formModel.emailId,
        'phoneNumber': formModel.phoneNumber,
        'tanNumber': formModel.tanNumber,
        'bankAccountNumber': formModel.bankAccountNumber,
        'ifscCode': formModel.ifscCode,
        'bankBranchDetails': formModel.bankBranchDetails,
        'taxId': formModel.gsTNumber,
        'tenantId': this.tenantId,
        'alternateNumber': formModel.alternateNumber,
        'contactPerson': formModel.contactPerson
      }
    };
    this._VendorService.addVendor(vendorDetails).subscribe(res => {
      console.log('vendorDetails', res);
      this._notificationsService.showSuccessNotif('', 'Registered successfully, Login with your registered email id');
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1500);
    }, error => {
      this._notificationsService.showErrorNotif('Vendor Registration', 'Failed');
    });
  }
  //to get all countries
  private getAllCountries() {
    this.newService.countriesList().subscribe(res => {
      this.countryList = res;
      console.log(this.countryList, 'countrylist');
    }, error => {
      console.log(error);
    });
  }
  // on selecting a country
  onCountryChange(countryId: any) {
    this.newService.stateslistttt(countryId).subscribe(res => {
      this.stateList = res;
      console.log(this.stateList, 'states');
    }, error => {
      console.log(error);
    });
  }
}

