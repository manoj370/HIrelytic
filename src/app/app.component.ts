import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { Helpers } from './helpers';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import * as $ from 'jquery';
// import { WindowService } from '@ng-select/ng-select/ng-select/window.service';
import { TenantService } from './services/tenant.service';
import { TouchSequence } from 'selenium-webdriver';
import { HttpUrls } from './shared/HttpUrls';
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'app';
  // tslint:disable-next-line: member-ordering
  public static notifications: any = [];
  userData: any;
  constructor(private _router: Router, private _tenantService: TenantService) { }
  static getNotification(status: any, title: any, msg: any, date: any) {
    if (status === 'fa fa-check-circle checkstyle') {
      var color = true;
    } else {
      color = false;
    }
    AppComponent.notifications.push({
      'icon': status,
      'title': title,
      'msg': msg,
      'time': date,
      'color': color
    });
  }

  get NotificationList() {
    return AppComponent.notifications;
  }
  ngOnInit() {
    AOS.init();

    // console.log(window.location,'routeApp')
    this.checkTenantsExistance();
    this._router.events.subscribe((route) => {

      if (route instanceof NavigationStart) {
        Helpers.setLoading(true);
        Helpers.bodyClass('fixed-navbar');
      }
      if (route instanceof NavigationEnd) {
        window.scrollTo(0, 0);
        Helpers.setLoading(false);

        // Initialize page: handlers ...
        // Helpers.initPage();
      }

    });
  }
  public OpenMainNotification(event: any) {
    event.preventDefault();
    $('#notificationTray').toggle();
  }
  public CloseMainNotification(event: any) {
    event.preventDefault();
    $('#notificationTray').hide();
  }
  public NotifyClose(data: any) {
    AppComponent.notifications.splice(AppComponent.notifications.indexOf(data), 1);
  }
  ngAfterViewInit() { }

  checkTenantsExistance() {
    this._tenantService.checkUrl(window.location.hostname).subscribe(e => {
      console.log(e, 'checkTenantUrl');
      console.log(window.location.hostname.includes('.hirelytic.com'));
      console.log(window.location.hostname);
      if (e) {
        console.log(location.origin);
        console.log((window.location.hostname.includes('.hirelytic.com')) && (location.pathname === '/'));
        console.log(location.protocol);
        if ((window.location.href.includes('tenant/registration')
          || window.location.href.includes('resetToken') ||
          window.location.href.includes('inviteUser/UserRegister') ||
          window.location.href.includes('inviteVendor/VendorRegister') ||
          window.location.href.includes('uploadResume') ||
           window.location.href.includes('inviteEmployee/EmployeeRegister') )) {
          return;
        } else if (window.location.href.includes('resetToken') ||
          window.location.href.includes('inviteUser/UserRegister') ||
          window.location.href.includes('inviteVendor/VendorRegister')) {
          return;
        } else if ((window.location.hostname.includes('hirelytic.com')) && (window.location.href.includes('tenant/registration'))) {
          return;
          // tslint:disable-next-line: max-line-length
        } else if ((location.protocol === 'https') && (window.location.hostname.includes('hirelytic.com') && window.location.hostname.includes('/#/login'))) {
          this._router.navigate(['/home']);
        } else if ((window.location.hostname.includes('.hirelytic.com'))  && (sessionStorage.getItem('roleId') === null)) {
          this._router.navigate(['/login']);
        } else if ((window.location.hostname === 'hirelytic.com')  && (sessionStorage.getItem('roleId') === null)) {
          this._router.navigate(['/home']);
        }

      }
    }, error => {
      console.log(error);
    });
  }


}
