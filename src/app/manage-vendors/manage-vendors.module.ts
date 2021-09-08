import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageVendorsRoutingModule } from './manage-vendors-routing.module';
import { InviteVendorComponent } from './invite-vendor/invite-vendor.component';
import { SimpleNotificationsModule, NotificationsService } from 'angular2-notifications';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AgGridModule } from 'ag-grid-angular';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { ViewvendorComponent } from './viewvendor/viewvendor.component';
import { VendorDashboardComponent } from './vendor-dashboard/vendor-dashboard.component';
@NgModule({
  imports: [
    CommonModule,
    ManageVendorsRoutingModule,
    SimpleNotificationsModule,
    FormsModule,
    ReactiveFormsModule,
    SimpleNotificationsModule.forRoot(),
    NgxSpinnerModule,
    AgGridModule.withComponents([]),
    NgMultiSelectDropDownModule.forRoot(),
    NgxDaterangepickerMd.forRoot(),
  ],
  declarations: [InviteVendorComponent, ViewvendorComponent, VendorDashboardComponent],
  exports :[
    VendorDashboardComponent
  ]
})
export class ManageVendorsModule { }
