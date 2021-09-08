import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { NgSelectModule } from '@ng-select/ng-select';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/multiselect.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { RouterModule, Routes } from '@angular/router';
import { EmployeelistComponent } from './employeelist/employeelist.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
const appRoutes: Routes = [
  {
    path: '',
    component: EmployeelistComponent
  },
  {
    path: 'dashboard',
    component: EmployeeDashboardComponent
  },

];
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([]),
    FormsModule,
    NgxSpinnerModule,
    SimpleNotificationsModule.forRoot(),
    NgSelectModule,
    AngularMultiSelectModule,
    NgMultiSelectDropDownModule.forRoot(),
    RouterModule.forChild(appRoutes)
  ],
  declarations: [EmployeelistComponent,EmployeeDashboardComponent],
  exports:[EmployeeDashboardComponent]
})
export class EmployeeModule { }
