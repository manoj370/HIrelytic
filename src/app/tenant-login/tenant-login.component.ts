
import { Router } from '@angular/router';
import { Injectable, OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NewServiceService } from '../services/new-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationMessageService } from '../../app/services/notification.service';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms'; //This is for Model driven form form
import { HttpUrls } from '../shared/HttpUrls';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TenantService } from '../services/tenant.service';

@Component({
  selector: 'app-tenant-login',
  templateUrl: './tenant-login.component.html',
  styleUrls: ['./tenant-login.component.css']


})
export class TenantLoginComponent implements OnInit, OnDestroy {
  showLoginForm = true;
  showForgotPwdForm = false;
  organisationUrl: string;
  username: any;
  userId: string;
  loginForm: FormGroup;
  forgotPasswordForm: FormGroup;
  subDomainPlaceHolder: string;
  privileges: any;
  totalSeconds: number = 0;
  intervalId: NodeJS.Timer;
  tenantLogo: any;
  userRoles: any;
  subscribe: Subject<any> = new Subject<any>();
  hostName: string;

  constructor(private _notificationsService: NotificationMessageService,
    public router: Router, private spin: NgxSpinnerService, private _tenantService: TenantService,
    private newService: NewServiceService) { }

  ngOnInit() {
    this.hostName = window.location.hostname;
    console.log(window.location.hostname === 'hirelytic.com');
    this.getFindOrganisationByUrl();

    this.loginForm = new FormGroup({
      username: new FormControl("", Validators.compose([Validators.required, Validators.pattern(/^([\w.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)])),
      password: new FormControl("", Validators.compose([Validators.required])),
    });
    this.forgotPasswordForm = new FormGroup({

      emailId: new FormControl("", Validators.compose([Validators.required, Validators.pattern(/^([\w.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)])),

    });


    // Find by organisation uRl
    // console.log(window.location.hostname);
    this.organisationUrl = window.location.hostname;
    const response = this.organisationUrl.split('.');
    this.subDomainPlaceHolder = response[0];
    this.userId = sessionStorage.getItem('userId');
  }


  goback() {
    this.showLoginForm = true;
    this.showForgotPwdForm = false;
  }
  forgotPwd(data: any) {
    if (data === 'forgot') {
      this.showLoginForm = false;
      this.showForgotPwdForm = true;
    } else {
      this.showLoginForm = true;
      this.showForgotPwdForm = false;
    }
  }
  // OUATH TOKEN BASED LOGIN
  public Submit(loginForm: NgForm): void {

    if (loginForm['emailId'] === undefined) {
      this.newService.orgSignIn(loginForm).subscribe(res => {
        sessionStorage.setItem('EmailId', this.loginForm.value.username);
        sessionStorage.setItem('access-token', res.access_token);
        sessionStorage.setItem('refresh_token', res.refresh_token);
        sessionStorage.setItem('expires_in', res.expires_in);
        this._notificationsService.showSuccessNotif('Success', 'You are successfully Sign In');
        this.loginForm.reset();
        this.getUser();
      });
    } else {
      console.log('test');
      this.newService.forgotPassword(loginForm['emailId'], null).subscribe(res => {
        console.log(res);
        this._notificationsService.showSuccessNotif('Success', 'Link for generating Password has been send to your registered Email Id');
        this.forgotPasswordForm.reset();
        this.router.navigate(['/login']);
      }, error => {
        console.log(error);
      })
    }

  }
  // For getting privileges userdetails and role getlogged in user details
  public getUser(): any {
    this.newService.getUserDetails()
      .pipe(takeUntil(this.subscribe))
      .subscribe(result => {
        console.log(result.roles, 'login');
        this.username = result.firstName;
        for (const item of result.roles) {
          console.log(item.roleName);
        }

        result.roles.map(element => {
          // console.log(element, 'element')
          if (element.roleName === 'ADMIN') {
            sessionStorage.setItem('userRoles', element.roleName);
            // console.log(element.roleName, 'Rolename1');
          }
          if (element.roleName === 'Recruiter') {
            sessionStorage.setItem('userRoles', element.roleName);
            // console.log(element.roleName, 'Rolename');
          }
          if (element.roleName === 'Account Manager') {
            sessionStorage.setItem('userRoles', element.roleName);
            // console.log(element.roleName, 'Rolename');
          }
          if (element.roleName === 'SUPER ADMIN') {
            sessionStorage.setItem('userRoles', element.roleName);
            // console.log(element.roleName, 'Rolename');
          }
          if (element.roleName === 'VENDOR') {
            sessionStorage.setItem('userRoles', element.roleName);
            // console.log(element.roleName, 'Rolename');
          }
          if (element.roleName === 'EMPLOYEE') {
            sessionStorage.setItem('userRoles', element.roleName);
            // console.log(element.roleName, 'Rolename');
          }
          sessionStorage.setItem('roleId', element.roleId);
        });
        sessionStorage.setItem('Privileges', JSON.stringify(result.roles));
        sessionStorage.setItem('pic_profile', result.profilePicPath);
        sessionStorage.setItem('pic_logo', result.organization.tenantLogoPath);
        sessionStorage.setItem('pic_profile_user', result.profilePicPath);
        sessionStorage.setItem('userName', this.username);
        sessionStorage.setItem('userId', result.userId);
        if (sessionStorage.getItem('userRoles') === 'SUPER ADMIN') {
          this.router.navigate(['/superAdmin/Tenants']);
        } else if(sessionStorage.getItem('userRoles') === 'EMPLOYEE'){
          this.router.navigate(['/manageCandidates']);
        }   else {
          this.router.navigate(['/dashboard']);
        }
      }, error => {
        console.log(error);
      });
  }
  getFindOrganisationByUrl() {
    this._tenantService.checkUrl(window.location.hostname)
      .pipe(takeUntil(this.subscribe))
      .subscribe(res => {
        // console.log(res);
        sessionStorage.setItem('organizationName', res.orgName);
        sessionStorage.setItem('clientid', res.clientId);
        sessionStorage.setItem('clientSecret', res.clientSecret);
        sessionStorage.setItem('tenantId', res.tenantId);
        sessionStorage.setItem('pic_logo', res.tenantLogoPath);
        this.getLogo();
      });

  }


  getLogo() {
    if (sessionStorage.getItem('pic_logo') !== null) {
      this.tenantLogo = HttpUrls.GET_TENANT_LOGO + '?path=' + sessionStorage.getItem('pic_logo')
      console.log(this.tenantLogo, 'this.urllogo');
      console.log(sessionStorage.getItem('pic_logo'), 'this.urllogo');
    } else {

      console.log('error');
    }
  }

  ngOnDestroy() {
    this.subscribe.next();
    this.subscribe.complete();
  }

}

