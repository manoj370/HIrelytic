import { Component, OnInit } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, Route, ActivatedRoute } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TenantService } from '../services/tenant.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms'; //This is for Model driven form form
import { NotificationMessageService } from '../services/notification.service';
import { AppComponent } from '../app.component';
import { NewServiceService } from '../services/new-service.service';
import { RegisterUser } from '../newModels/registerUser';
export class tenant {
  tenantId: any;
}
export class roles {
  roleId: any
}
declare var jquery: any;
declare var $: any;
declare var swal: any;
@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  model: any = {};
  roles: roles = new roles();
  tenantid: tenant = new tenant();
  rolesdata = [];
  tenantformdata: any = {};
  display: boolean;
  DesignationList: any = [];
  public passerror: boolean = false;
  firstform: boolean;
  selectedValue: string = '';
  password: any;
  passerrorMsg = '';
  confirmPassword: any;
  error: boolean;
  errorMsg = '';
  userDetails: any = [];
  countryList: any;
  stateList: any;
  address1: any;
  address2: any;
  country: any;
  state: any;
  city: any;
  zipCode: any;
  emaiValue: any;
  private DepartmentList: any = [];
  private userRegisterForm: FormGroup;


  // Creating an object for the form
  public registrationobj: RegisterUser = new RegisterUser();
  countries = [
    { code: '+1', name: 'United States of America' },
    { code: '+91', name: 'India' },
  ];
  countryCode = '+91';
  organizationId: any;
  constructor(public toastr: ToastrManager, private _notificationsService: NotificationMessageService,
    private _UserService: UserService, private userService: UserService, private newService: NewServiceService,
    private spin: NgxSpinnerService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log(window.location, 'userRegistration');      // let paramsUserId = window.location.href.split('/');
      // /^[a-zA-Z ]*$/;
      // console.log('params', atob(params.email));
      // this.userRegisterForm.value.emailId.setvalue(atob(params.email));
      this.emaiValue = atob(params.email);
      console.log(this.emaiValue);
      this.roles.roleId = params['role'];
      this.rolesdata.push(this.roles);
      this.tenantid.tenantId = params['tenantId'];
      this.organizationId = atob(params['organizationId']);
      this.model.roles = this.rolesdata;
      this.model.tenant = this.tenantid;
    });
    // this.model.emailId='s@rest.com';
    this.userRegisterForm = new FormGroup({
      firstName: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)])),
      lastName: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)])),
      phoneNumber: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(10), Validators.minLength(10)])),
      emailId: new FormControl(this.emaiValue),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(16)])),
      cnfPassword: new FormControl('', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(16)])),
      // dept: new FormControl('', Validators.required),
      // designation: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)])),
      country: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      city: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]*$/)])),
      zipCode: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^[0-9]*$/)])),
      address1: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z[0-9:;,._\s#&()-/]*$/)])),
      address2: new FormControl('', Validators.pattern(/^[a-zA-Z[0-9:;,._\s#&()-]*$/)),
      // aboutCompany: new FormControl('', Validators.compose([Validators.required, Validators.minLength(50)])),
    });
    this.getAllDepts();
    this.getAllCountries();
    this.selectedValue = '+91';
    this.display = true;

    this.GetDataInputValues();
  }
  // save(sample: User) {
  //   console.log(sample);
  //   this.model.firstName = sample.firstName;
  //   this.model.lastName = sample.lastName;
  //   this.model.password = sample.password;
  //   this.password = sample.password;
  //   this.confirmPassword = sample.cnfPassword;
  //   this.model.confirmpassword = sample.cnfPassword;
  //   this.model.emailId = sample.emailId;
  //   this.model.phoneNumber = sample.phoneNumber;
  //   this.model.address1 = sample.address1;
  //   this.model.address2 = sample.address2;
  //   this.model.country = sample.country;
  //   this.model.state = sample.state;
  //   this.model.city = sample.city;
  //   this.model.pincode = sample.zipCode;
  //   this.model.designation = sample.designation;
  //   console.log(this.model.password);
  //   console.log(this.model.confirmpassword);
  //   if (this.model.firstName == null || this.model.lastName == null || this.model.emailId == null || this.model.password == null || this.model.confirmpassword == null || this.model.phoneNumber == null) {
  //     swal('Sorry', 'Please Enter required data', 'warning');
  //   } else {
  //     console.log(this.model);
  //   }
  // }

  GetDataInputValues() {
    this.userService.getDesignation().forEach(area => {
      for (const e of area) {
        this.DesignationList.push({ label: e.designationName.toString(), value: e.designationId });
      }
    });
  }


  keyPress(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  // to get all countries
  private getAllCountries() {
    this._UserService.getAllCountries().subscribe(res => {
      console.log('countries', res);
      this.countryList = res;
    })
  }

  // on selecting a country

  // on selecting a country
  // on selecting a country
  onCountryChange(countryId: any) {
    this.newService.stateslistttt(countryId).subscribe(res => {
      this.stateList = res;
      console.log(this.stateList, 'states');
    })
  }
  // for populating depatments
  getAllDepts() {
    this.userService.getDepartment().forEach(area => {
      for (const e of area) {
        this.DepartmentList.push({ label: e.departmentName.toString(), value: e.departmentId });
      }
    });
  }

  // check password and updated 
  checkPasswords() {
    debugger
    if (this.model.password != this.model.confirmpassword) {
      this.passerror = true;
      this.passerrorMsg = 'Password  Mismatch';
    } else {
      this.passerror = false;
      this.passerrorMsg = '';
    }

  }

  //Setting Values to an Object
  createRegisterForm() {
    debugger
    this.registrationobj.firstName = this.userRegisterForm.get('firstName').value;
    this.registrationobj.lastName = this.userRegisterForm.get('lastName').value;
    this.registrationobj.emailId = this.userRegisterForm.get('emailId').value;
    this.registrationobj.phoneNumber = this.userRegisterForm.get('phoneNumber').value;
    this.registrationobj.passWord = this.userRegisterForm.get('password').value;
    this.registrationobj.address.line1 = this.userRegisterForm.get('address1').value;
    this.registrationobj.address.line2 = this.userRegisterForm.get('address2').value;
    this.registrationobj.address.city = this.userRegisterForm.get('city').value;
    this.registrationobj.address.state = this.userRegisterForm.get('state').value;
    this.registrationobj.address.country = this.userRegisterForm.get('country').value;
    this.registrationobj.address.zipCode = this.userRegisterForm.get('zipCode').value;
    this.registrationobj.organization.tenantId = this.organizationId;
  }

  // For confirming deatils
  // public registerDetails() {
  //   debugger
  //   this.createRegisterForm();
  // }
  // user Registration
  public submit() {
    this.createRegisterForm();
    this.newService.createUser(this.registrationobj).subscribe(res => {
      this._notificationsService.showSuccessNotif('', 'Invite User, Login with your registered email id');
      this.router.navigate(['/login']);
      this.userRegisterForm.reset();
    })
  }
}
