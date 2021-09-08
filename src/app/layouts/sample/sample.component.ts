import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewServiceService } from '../../services/new-service.service';
import { NotificationMessageService } from '../../services/notification.service';
import { SignUp } from '../../newModels/signup';
@Component({
  selector: "sample-layout",
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.css']
})
export class SampleComponent implements OnInit {
  requestDemoForm: FormGroup;
  public signup: SignUp = new SignUp();
  @ViewChild('dismissModal') closeBtn: ElementRef<HTMLElement>;
  @ViewChild('demoDissMiodal') demoDismis: ElementRef<HTMLElement>;


  signupForm: FormGroup;
  countryList: any = [];
  constructor(
    private fb: FormBuilder,
    private newService: NewServiceService,
    private _notifService: NotificationMessageService
  ) {}

  ngOnInit() {
    this.getAllCountries();
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    this.requestDemoForm = this.fb.group({
      name: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.pattern(emailregex)]],
      phoneNumber: ['', [Validators.required, Validators.minLength(10)]],
      companyName: ['', Validators.required],
      companySize: ['', Validators.required],
      country: [null, Validators.required]
    });

    this.signupForm = this.fb.group({
      orgEmailId: ['', [Validators.required, Validators.pattern(emailregex)]],
      orgName: ['', Validators.required]
    });
  }
  get f() {
    return this.requestDemoForm.controls;
  } // controls patter
  get g() {
    return this.signupForm.controls;
  } // controls pattern
  private getAllCountries() {
    this.newService.countriesList().subscribe(res => {
      this.countryList = res;
      console.log(this.countryList, 'countrylist');
    });
  }

  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  Submit() {
    console.log('test');
    const obj = {
      requesterName: this.requestDemoForm.value.name,
      requesterEmailId: this.requestDemoForm.value.emailId,
      contactNumber: this.requestDemoForm.value.phoneNumber,
      tenantName: this.requestDemoForm.value.companyName,
      tenantSize: this.requestDemoForm.value.companySize,
      country: this.requestDemoForm.value.country
    };
    this.newService.RequestDemo(obj).subscribe(
      data => {
        console.log(data);
        this._notifService.showSuccessNotif(
          'Success',
          'Requested Successfully'
        );
        this.clearValidations();
        this.demoDismis.nativeElement.click();
      },
      error => {
        console.log(error);
        this.clearValidations();
        this.demoDismis.nativeElement.click();
      }
    );
  }
  createOrg() {
    console.log(this.signupForm.value);
    const obj = {
      invitee: this.signupForm.value.orgName,
      emailId: this.signupForm.value.orgEmailId,
      type: 'NEW ORGANIZATION INVITATION'
    };
    console.log(obj);
    if (this.signupForm.valid) {
      this.newService.orginizationSignup(obj).subscribe(
        res => {
          console.log(res, 'orgsignup');
          this.closeBtn.nativeElement.click();
          this.clearValidations();
          this._notifService.showSuccessNotif(
            'SignUp Successfully',
            'Registration link has been sent to your registered Email Id'
          );
          this.signupForm.reset();
        },
        error => {
          console.log(error);
          this.closeBtn.nativeElement.click();
          this.clearValidations();
        }
      );
    }
  }
  onBlurMethod() {
    this.newService.checkOrganisation(this.signupForm.value.orgName).subscribe(
      res => {
        console.log(res);
        if (res === true) {
          this._notifService.showWarnNotif(
            'Check',
            'Organization Name already Exist'
          );
          this.clearValidations();
          this.closeBtn.nativeElement.click();
        }
      },
      error => {
        console.log(error);
        this.clearValidations();
        this.closeBtn.nativeElement.click();
      }
    );
  }
  clearValidations() {
    this.signupForm.reset();
    this.requestDemoForm.reset();
  }
}
