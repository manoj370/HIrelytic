
import { ReferJobComponent } from './refer-job.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { FileUploadComponent } from './fileupload.component'
import { NgxSpinnerModule } from 'ngx-spinner';
import { AgGridModule } from 'ag-grid-angular';
import { EmployeeModule } from '../employee/employee.module';

// import { SimpleNotificationsModule } from 'angular2-notifications';

const routes: Routes = [
  {
    path: '',
    component: ReferJobComponent
  }
];

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgxSpinnerModule,
    // SimpleNotificationsModule.forRoot(),
    RouterModule.forChild(routes),
    AgGridModule.withComponents([]),
    EmployeeModule
  ],
  declarations: [ReferJobComponent, FileUploadComponent]
})
export class ReferJobModule { }
