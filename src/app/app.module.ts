import * as $ from 'jquery';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  CommonModule,
  LocationStrategy,
  HashLocationStrategy
} from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { routingComp, AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { JobPostingService } from './services/jobposting.service';
import { TenantService } from './services/tenant.service';
import { UserService } from './services/user.service';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
// import { MatRadioModule } from '@angular/material/radio';
import { PagerService } from './services/pagerService';
import { AgGridModule } from 'ag-grid-angular';
import { A11yModule } from '@angular/cdk/a11y';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { QuestionBankService } from './services/questionbankservice';
import { ToastrModule } from 'ng6-toastr-notifications';
import {
  SimpleNotificationsModule,
  NotificationsService
} from 'angular2-notifications';
import { AuthGuard } from './auth.guard';
import { ScriptLoaderService } from './_services/script-loader.service';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { ExcelService } from './services/excel.service';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel';
import { SlideshowModule } from 'ng-simple-slideshow';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { VendorService } from './services/vendor.service';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { NewServiceService } from './services/new-service.service';
import { CustomInterceptor } from './interceptors/httpinterceptor';
import { ReportsService } from './services/reports.service';
// import { SidebarComponent } from './shared/sidebar/sidebar.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 2,
  wheelPropagation: true
};
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { AvatarModule } from 'ngx-avatar';
import { RefferalUpdateComponent } from './refferal-update/refferal-update.component';
import { EmployeeModule } from './employee/employee.module';
import { ManageVendorsModule } from './manage-vendors/manage-vendors.module';

@NgModule({
  declarations: [routingComp, AppComponent, RefferalUpdateComponent],
  imports: [
    AvatarModule,
    RxReactiveFormsModule,
    AvatarModule,
    AgGridModule.withComponents([]),
    ShowHidePasswordModule.forRoot(),
    SimpleNotificationsModule.forRoot(),
    AngularMultiSelectModule,
    NgMultiSelectDropDownModule.forRoot(),
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    NgxSpinnerModule,
    SelectDropDownModule,
    // NgbModule.forRoot(),
    AppRoutingModule,
    PerfectScrollbarModule,
    ToastrModule.forRoot(),
    SlideshowModule,
    NgxPageScrollCoreModule,
    NgxPageScrollModule,
    NgxDaterangepickerMd.forRoot(),
    A11yModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    PortalModule,
    ScrollingModule,
    EmployeeModule,
    ManageVendorsModule
  ],
  providers: [
    AuthGuard,
    ScriptLoaderService,
    JobPostingService,
    TenantService,
    UserService,
    VendorService,
    NotificationsService,
    QuestionBankService,
    PagerService,
    ExcelService,
    NewServiceService,
    ReportsService,
    CustomInterceptor,
    // SidebarComponent,

    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomInterceptor,
      multi: true
    },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },

    { provide: Window, useValue: window },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent],
  exports: [routingComp]
})
export class AppModule {}
