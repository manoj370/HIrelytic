import { Component, AfterViewInit, OnInit } from '@angular/core';
// import { NgbModal, ModalDismissReasons, NgbPanelChangeEvent, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { AppComponent } from '../../app.component';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder
} from '@angular/forms';
import { TenantService } from '../../services/tenant.service';
import { NotificationMessageService } from '../../services/notification.service';
import { MustMatch } from '../../models/mustMatch';
import { ResetPassword } from '../../newModels/resetPassword';
import { HttpUrls } from '../HttpUrls';
import { NewServiceService } from '../../services/new-service.service';

declare var $: any;
@Component({
  selector: "[app-header]",
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  name: string;
  private userRole: any;
  private orgName: any;
  public NotificationLists = true;
  public OpenMain = false;
  public userName: any;
  profileName: any;
  userprofilePic: any;
  changePwdForm: FormGroup;
  profilePic: boolean;
  intervalId: any;
  // Creating an Object for Reset Password
  public changeObj: ResetPassword = new ResetPassword();
  obj: any;
  totalSeconds: any = 0;
  showAdminIncentives: boolean;
  candidatesDatabase: boolean;
  hideManageDemo: boolean;
  manageJobs: boolean;
  hideManageTenant: boolean;
  hideDashboard: boolean;
  manageRoles: boolean;
  manageVendor: boolean;
  reports: boolean;
  manageResume: boolean;
  getAllPrivileges: any;
  showRole: any;
  manageClient: boolean;
  UserEmailid: any;
  constructor(
    private newService: NewServiceService,
    private _notificationsService: NotificationMessageService,
    private _TenantService: TenantService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.changePwdForm = this.fb.group(
      {
        curPwd: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(16)
          ])
        ),
        newPwd: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(16)
          ])
        ),
        confirmpwd: new FormControl(
          '',
          Validators.compose([Validators.required])
        )
      },
      {
        validator: MustMatch('newPwd', 'confirmpwd')
      }
    );
  }

  ngOnInit() {
    this.startTime();
    this.checkPrevilizes();
    console.log(sessionStorage.getItem('EmailId'));
    this.UserEmailid = sessionStorage.getItem('EmailId');

    // this.checkPrivileges();
    this.newService.getUserDetails().subscribe(result => {
      console.log(result, 'login');
      if (result.profilePicPath !== null) {
        this.profilePic = true;
        this.userprofilePic =
          HttpUrls.GET_PROFILE_PIC + '?path=' + result.profilePicPath;
      } else if (result.profilePicPath === null) {
        this.profilePic = false;
        this.profileName = result.firstName + ' ' + result.lastName;
      }

      for (let index = 0; index < result.roles.length; index++) {
        const element = result.roles[index].roleName;
        console.log(element);
        if (element !== null) {
          this.userRole = element;
        }
      }
    });

    if (this.userRole == null) {
    }
    if (this.userRole === 'ADMIN') {
      sessionStorage.setItem('userRoles', this.userRole);
    }
    this.orgName = sessionStorage.getItem('organizationName');
  }

  checkPrevilizes() {
    this.newService.getUserDetails().subscribe(result => {
      this.getAllPrivileges = [
        ...result.roles[0].authorities,
        ...result.roles[1].authorities
      ];
      for (let index = 0; index < this.getAllPrivileges.length; index++) {
        const element = this.getAllPrivileges[index].authorityName;
        if (element === 'MANAGE VENDORS' && element === 'LIST VENDORS') {
          this.manageVendor = true;
        } else if (element === 'MANAGE CLIENTS') {
          this.manageClient = true;
        } else if (element === 'MANAGE CANDIDATES') {
          this.manageResume = true;
        } else if (element === 'MANAGE JOBS') {
          this.manageJobs = true;
          // this.manageVendor = true;
        } else if (element === 'MANAGE REPORTS') {
          // default for all reports+ dashboard
          this.reports = true;
        } else if (element === 'MANAGE VENDORS') {
          this.manageVendor = true;
        } else if (element === 'MANAGE USERS' || element === 'MANAGE ROLES') {
          this.manageRoles = true;
          this.showRole = true;
        } else if (element === 'DASHBOARD') {
          this.hideDashboard = true;
        } else if (element === 'JOBS ASSIGNED') {
          this.manageJobs = true;
        } else if (element === 'MANAGE RECRUITERS') {
          this.manageJobs = true;
        } else if (element === 'JOBS POSTED BY ME') {
          this.manageJobs = true;
        } else if (element === 'MANAGE TENANTS') {
          this.hideManageTenant = true;
          this.hideManageDemo = true;
        } else if (
          element === 'MANAGE MY INCENTIVES' ||
          element === 'MANAGE INCENTIVES' ||
          element === 'MY PAYMENTS'
        ) {
          this.showAdminIncentives = true;
        } else if (element === 'RESUMES BANK') {
          this.candidatesDatabase = true;
        }
      }

      result.roles.map(element => {
        if (element.roleName === 'ADMIN') {
          sessionStorage.setItem('userRoles', element.roleName);
        }
        if (element.roleName === 'Recruiter') {
          sessionStorage.setItem('userRoles', element.roleName);
        }
      });
    });
  }

  logout() {
    console.log(sessionStorage.getItem('clientid'), 'clientid');
    console.log(
      sessionStorage.getItem('EmailId') +
        '|' +
        sessionStorage.getItem('tenantId'),
      'tentid'
    );
    const formData: FormData = new FormData();
    formData.append('clientId', sessionStorage.getItem('clientid'));
    formData.append(
      'username',
      sessionStorage.getItem('EmailId') +
        '|' +
        sessionStorage.getItem('tenantId')
    );
    console.log(formData, 'formdata');
    sessionStorage.clear();
    this.router.navigate(['/login']);
    this._notificationsService.showSuccessNotif(
      'Success',
      'You are Succesfully Sign Out'
    );
  }
  routeToProfile() {
    if (this.userRole === 'ADMIN') {
      this.router.navigate(['/tenantProfile']);
    }
  }
  get NotificationList() {
    if (AppComponent.notifications.length === 0) {
      this.NotificationLists = false;
      return AppComponent.notifications;
    } else {
      this.NotificationLists = true;
      return AppComponent.notifications;
    }
  }
  // Clicking on Notification icon, shows and hide notification dropdown//
  public OpenMainNotification(event: any) {
    this.OpenMain = true;
    this.NotificationLists = false;
    // alert(this.NotificationLists)
    event.preventDefault();
    $('#notificationTray').toggle();
    $('#FeedbackFormTray').hide();
  }
  public CloseMainNotification(event: any) {
    this.OpenMain = false;
    event.preventDefault();
    $('#notificationTray').hide();
  }
  public NotifyClose(data: any) {
    AppComponent.notifications.splice(
      AppComponent.notifications.indexOf(data),
      1
    );
  }

  changePasswordd() {
    this.changePwdForm.reset();
  }

  // reset Obj
  changePasswordObj() {
    this.changeObj.newPassword = this.changePwdForm.get('newPwd').value;
    this.changeObj.currentPassword = this.changePwdForm.get('curPwd').value;
  }
  // Change Password
  changePassword() {
    this.changePasswordObj();
    this._TenantService.changeUserPassword(this.changeObj).subscribe(
      res => {
        console.log(res);
        if (res.response.respcode === 100) {
          this._notificationsService.showErrorNotif(
            'Failed',
            'You have Failed To create new password'
          );
          this.changePwdForm.reset();
        } else {
          this._notificationsService.showSuccessNotif(
            'Success',
            'You have successfully created new password'
          );
          this.changePwdForm.reset();
        }
      },
      error => {
        console.log(error);
        this._notificationsService.showErrorNotif(
          'Failed',
          'You have Failed To create new password'
        );
      }
    );
  }

  updateSeconds() {
    ++this.totalSeconds;
    //  console.log(this.totalSeconds, "this.totalSeconds")
    this.stopTime();
  }
  startTime() {
    this.updateSeconds();
    this.intervalId = setInterval(() => {
      this.updateSeconds();
    }, 1000);
  }
  stopTime() {
    if (this.totalSeconds === 3600) {
      clearInterval(this.intervalId);
      sessionStorage.removeItem('access-token');
      let formdata;
      this.newService.refreshToken(formdata).subscribe(result => {
        console.log('result', result);
        sessionStorage.setItem('access-token', result.access_token);
        sessionStorage.setItem('refresh_token', result.refresh_token);
        this.totalSeconds = 0;
        this.startTime();
      });
    }
  }
}
