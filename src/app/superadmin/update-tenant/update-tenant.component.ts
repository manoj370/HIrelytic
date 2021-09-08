import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  OnDestroy
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NewServiceService } from '../../services/new-service.service';

import { NotificationMessageService } from '../../services/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TenantService } from '../../services/tenant.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-update-tenant',
  templateUrl: './update-tenant.component.html',
  styleUrls: ['./update-tenant.component.css']
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateTenantComponent implements OnInit, OnDestroy {
  @ViewChild('modalForchangeStatus') modalForchangeStatus: ElementRef;
  tenanatId: any;
  tenanatDetails: any;
  countryList = [];
  tenanatData = [];
  newTenatData = [];
  rowselectstatus: string;
  selectedStatus: boolean;
  obj: any;
  selectedTenantId: any;
  tenanatModules: any = [];
  subscribe: Subject<any> = new Subject<any>();
  today: string;
  plusToday: any;
  checkedValue = false;
  orgName: string;
  orgEmailId: string;
  orgGst: string;
  orgPhone: any;
  subscrptionDate: any;
  constructor(
    private activateroute: ActivatedRoute,
    private newService: NewServiceService,
    private router: Router,
    private _notificationsService: NotificationMessageService,
    private spin: NgxSpinnerService,
    private _TenantService: TenantService
  ) {}

  ngOnInit() {
    const d = new Date();
    this.today = this.formatDate(d);
    const year = d.getFullYear();
    const month = d.getMonth();
    const day = d.getDate();
    console.log(this.formatDate(d));
    const c = new Date(year + 1, month, day);
    this.plusToday = this.formatDate(c);
    this.formatDate(c);
    // this.getData();
    this.getModulesList();

    this.activateroute.params.subscribe(
      (params: Params) => (this.tenanatId = params['id'])
    );
    this.activateroute.params.subscribe((params: Params) =>
      console.log(params['status'])
    );
    this.newService
      .getTenatData(this.tenanatId)
      .pipe(takeUntil(this.subscribe))
      .subscribe(
        (data: any) => {
          if (data !== undefined) {
            this.tenanatDetails = data;
            console.log(this.tenanatDetails);
              if (this.tenanatDetails.status === 2) {
                this.tenanatDetails.status = 'Pending';
              } else if (this.tenanatDetails.status === 1) {
                this.tenanatDetails.status = 'Active';
              } else {
                this.tenanatDetails.status = 'InActive';
              }
            this.newTenatData = this.tenanatDetails.applicationModule.setOfSubscriptions;
            console.log(this.tenanatData);
            this.tenanatData.forEach(value => {
              const element = this.newTenatData.find(x => x.value === value);
              if (element) {
                element.checked = true;
              }
            });

            this.newTenatData.forEach((element: any) => {
              this.checked(element.moduleName);
              console.log(element.moduleName);
              const newObj = {
                moduleName: element.moduleName,
                subscriptionDate: this.today,
                subscriptionEndDate: this.plusToday
              };
              this.tenanatModules.push(newObj);
            });

            console.log(this.tenanatModules);
            this.selectedTenantId = this.tenanatDetails.tenantId;
          }
        },
        errror => {
          console.log(errror);
        }
      );
    this.countryData();
  }
  getModulesList() {
    this.newService
      .getModulesList()
      .pipe(takeUntil(this.subscribe))
      .subscribe(
        (data: any) => {
          console.log(data);
          this.tenanatData = data;
          console.log(this.tenanatData);
        },
        error => {
          console.log(error);
        }
      );
  }

  checked(data: any) {
    return this.newTenatData.some(item => item.moduleName === data);
  }

  changeEvent(event) {
    console.log(event);
    if (event.target.checked === true) {
      const newObj = {
        moduleName: event.target.value,
        subscriptionDate: this.today,
        subscriptionEndDate: this.plusToday
      };
      this.tenanatModules.push(newObj);
      console.log(this.tenanatModules);
    } else {
      for (let index = 0; index < this.tenanatModules.length; index++) {
        const element = this.tenanatModules[index].moduleName;
        if (element === event.target.value) {
          this.tenanatModules.splice(index, 1);
          index = this.tenanatModules.length;
        }
      }
    }
  }

  formatDate(date) {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }
  countryData() {
    this.newService
      .countriesList()
      .pipe(takeUntil(this.subscribe))
      .subscribe(
        data => {
          this.countryList = data;
          console.log(this.countryList);
        },
        error => {
          console.log(error);
        }
      );
  }

  // CHANGE TENANT STATUS
  changeTenantStatus(status: string) {
    this.rowselectstatus = status;
    console.log(this.rowselectstatus);
    this.modalForchangeStatus.nativeElement.click();
  }

  updateModulesList() {
    console.log(this.tenanatDetails);
    console.log(this.tenanatModules);
    this.tenanatDetails.applicationModule.setOfSubscriptions = this.tenanatModules;
    const defaultObj = {
      moduleName: 'RECRUITMENT',
      subscriptionDate: this.today,
      subscriptionEndDate: this.plusToday
    };
    this.tenanatModules.push(defaultObj);
    console.log(this.tenanatDetails);
    const updateObj = {
      applicationId: this.tenanatDetails.applicationModule.applicationId,
      organizationId: this.tenanatDetails.tenantId,
      setOfSubscriptions: this.tenanatModules
    };

    console.log(updateObj);
    this.newService.updateModulesList(updateObj).subscribe(
      res => {
        console.log(res);
        this._notificationsService.showSuccessNotif(
          'Updated',
          this.orgName + 'Modules Updated'
        );
      },
      error => {
        console.log(error);
      }
    );
  }
  //  Changing the status
  submitStatus() {
    this.spin.show();
    if (this.rowselectstatus === 'Activate') {
      this.selectedStatus = true;
    } else if (this.rowselectstatus === 'Deactivate') {
      this.selectedStatus = false;
    }
    this._TenantService
      .changeStatus(this.selectedTenantId, this.selectedStatus, this.obj)
      .pipe(takeUntil(this.subscribe))
      .subscribe(
        res => {
          this.spin.hide();
          this._notificationsService.showSuccessNotif(
            'Success',
            'Tenant status update successfully'
          );
          this.router.navigate(['/superAdmin/Tenants']);
        },
        error => {
          this.spin.hide();
          this._notificationsService.showErrorNotif(
            'Failed',
            'Failed to update tenant status'
          );
        }
      );
  }

  // destroy the subscription
  ngOnDestroy() {
    this.subscribe.next();
    this.subscribe.complete();
  }
}
