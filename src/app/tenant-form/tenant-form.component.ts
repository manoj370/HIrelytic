import { Component, NgZone, ViewChild, OnInit, Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, Route, ActivatedRoute, Params } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { NotificationMessageService } from '../services/notification.service';
import { NewServiceService } from '../services/new-service.service';
import { RegisterFormModel } from '../newModels/register';
import { UserService } from '../services/user.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
declare var jquery: any;
declare var $: any;
declare var swal: any;
@Component({
  selector: 'app-tenant-form',
  templateUrl: './tenant-form.component.html',
  styleUrls: ['./tenant-form.component.css']
})
export class TenantFormComponent implements OnInit {
  registerForm: FormGroup;
  public tenantPassword: string;
  public tenantConfirmPassword: string;
  tenantform: boolean;
  tenantformdata: any;
  passerrorMsg = '';
  public passerror: boolean;
  private countryList: any;
  private stateList: any;
  tenanatData: any = [];
  tenanatModules = [];
  today: any;
  plusToday: any;
  subscribe: Subject<any> = new Subject<any>();

  countries = [
    { code: 'US', name: 'United States of America' },
    { code: 'IN', name: 'India' },
  ];
  // countryCode: string = '+91';
  superadminid: any;
  organisationName: string;
  email: string;
  // Creating an object for the form
  public registrationobj: RegisterFormModel = new RegisterFormModel();
  modulesList: any;

  mnageList: any;
  constructor(private newService: NewServiceService,private userService:UserService, private _notificationsService: NotificationMessageService, private formBuilder: FormBuilder, private router: Router, private spin: NgxSpinnerService, private route: ActivatedRoute, private zone: NgZone) {

  }
  pattern = '^([0]{1}[1-9]{1}|[1-2]{1}[0-9]{1}|[3]{1}[0-7]{1})([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$'
  ngOnInit() {
    this.userService.allModuleRoles()
    .pipe(takeUntil(this.subscribe))
    .subscribe((result: any) => {
      this.modulesList = result;
      this.mnageList = result['USER MANAGEMENT'];
      console.log(this.mnageList, 'All Roles');
      console.log(result, 'All Roles');

    }, error => {
      console.log(error);
    });
    const d = new Date();
    this.today = this.formatDate(d);
    const year = d.getFullYear();
    const month = d.getMonth();
    const day = d.getDate();
    console.log(this.formatDate(d));
    const c = new Date(year + 1, month, day);
    this.formatDate(c);
    this.plusToday = this.formatDate(c);
    console.log(this.formatDate(c));
    this.newService.getModulesList().subscribe((data: any) => {
      console.log(data);
      this.tenanatData = data;
      this.tenanatData.forEach(element => {
        if (element.moduleType === 'default') {
          const Obj = {
            moduleName: element.moduleName,
            subscriptionDate: this.today,
            subscriptionEndDate: this.plusToday
          };
          this.tenanatModules.push(Obj);
        }
        console.log(this.tenanatModules);
      });
    }, error => {
      console.log(error);

    });


    // Capturing the id's from url and binding to tenant form
    this.route.queryParams.subscribe(params => {
      console.log(params);
      this.organisationName = atob(params['organizationName']);
      this.email = atob(params['email']);
      console.log(this.email);
      console.log(this.organisationName);
    })
    this.getAllCountries();

    // Validations
    this.registerForm = new FormGroup({
      companyCode: new FormControl(''),
      orgId: new FormControl('', [Validators.maxLength(20), Validators.pattern(/^[A-Za-z0-9- ]+$/)]),
      phone: new FormControl('', Validators.compose([Validators.required, Validators.minLength(10)])),
      url: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z.0-9 ]*$/)])),
      aboutCompany: new FormControl('', Validators.compose([Validators.required, Validators.minLength(50)])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(16)])),
      confirmpassword: new FormControl('', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(16)])),
      emailId: new FormControl(this.email),
      gSTNumber: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/)])),
      orgName: new FormControl(this.organisationName),
      address1: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z[0-9:;,._\s#&()-/]*$/)])),
      address2: new FormControl('', Validators.compose([Validators.pattern(/^[a-zA-Z[0-9:;,._\s#&()-/]*$/)])),
      city: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z0-9.\s]*$/)])),
      ZipCode: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^[0-9]*$/)])),
      country: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
    });
  }

  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }
  // For binding url we use ngmodel
  onBlurMethod() {
    if (this.tenantformdata === null || this.tenantformdata === '') {
      this.tenantformdata.nativeElement.focus();
    } else {
      if (this.tenantformdata.includes('.hirelytic.com')) {
        this.tenantformdata = this.tenantformdata.replace('.hirelytic.com', '');
        this.tenantformdata = this.tenantformdata + '.hirelytic.com';
      } else {
        this.tenantformdata = this.tenantformdata + '.hirelytic.com';
      }
    }
  }

  changeEvent(event) {
    if (event.target.checked === true) {
      const newObj = {
        moduleName: event.target.value,
        subscriptionDate: this.today,
        subscriptionEndDate: this.plusToday
      };
      this.tenanatModules.push(newObj);
      console.log(this.tenanatModules);
    } else {
      this.tenanatModules.forEach(element => {
        if (element.moduleName === event.target.value) {
          this.tenanatModules.splice(element.moduleName, 1);
        }
        console.log(this.tenanatModules);
      });
    }

  }
  // For password mismatch
  checkPasswords() {
    if (this.tenantPassword !== this.tenantConfirmPassword) {
      this.passerror = true;
      this.passerrorMsg = 'Password  Mismatch';
    } else {
      this.passerror = false;
      this.passerrorMsg = '';
    }
  }
  // to get all countries
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
  // Validation Purpose
  keyPress(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }


  // Setting Values to an Object
  createRegisterForm() {
    console.log(this.tenanatModules);
    const obj = {
      organizationId: sessionStorage.getItem('tenantId'),
      setOfSubscriptions: this.tenanatModules
    };
    this.registrationobj.aboutCompany = this.registerForm.get('aboutCompany').value;
    this.registrationobj.emailId = this.registerForm.get('emailId').value;
    this.registrationobj.password = this.registerForm.get('password').value;
    this.registrationobj.phone = this.registerForm.get('phone').value;
    this.registrationobj.url = this.registerForm.get('url').value;
    this.registrationobj.baseUrl = '/#/login';
    this.registrationobj.gstNumber = this.registerForm.get('gSTNumber').value;
    this.registrationobj.orgName = this.registerForm.get('orgName').value;
    this.registrationobj.applicationModule = obj;
    this.registrationobj.organizationAddress.city = this.registerForm.get('city').value;
    this.registrationobj.organizationAddress.country = this.registerForm.get('country').value;
    this.registrationobj.organizationAddress.isPrimary = true;
    this.registrationobj.organizationAddress.line1 = this.registerForm.get('address1').value;
    this.registrationobj.organizationAddress.state = this.registerForm.get('state').value;
    this.registrationobj.organizationAddress.zipCode = this.registerForm.get('ZipCode').value;
    console.log(this.registrationobj);
  }

  // For confirming deatils
  registerDetails() {
    this.createRegisterForm();
  }
  // activating Ogrganisation

  submit() {
    this.createRegisterForm();
    console.log(this.registrationobj);
    this.newService.activatingOrganisation(this.registrationobj).subscribe(res => {
      sessionStorage.setItem('aboutCompany', res.aboutCompany);
      this._notificationsService.showSuccessNotif('', 'Registered successfully, Login with your registered email id');
      this.registerForm.reset();
      this.router.navigate(['/home']);
    }, error => {
      console.log(error);
    });
  }
}
