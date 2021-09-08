import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { JoblistComponent } from './joblist.component';
import { TagInputModule } from 'ngx-chips';
import { SimpleTinyComponent } from './tiny.component';
import { UpdateJoblistComponent } from '../joblist/updateJobPost/updatejob.component';
import { OrderModule } from 'ngx-order-pipe';
import { NgSelectModule } from '@ng-select/ng-select';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AgGridModule } from 'ag-grid-angular';
import { NgxSpinnerModule } from 'ngx-spinner';

import { SimpleNotificationsModule } from 'angular2-notifications';
import { ApprovedComponent } from './approved/approved.component';
import { RejectedComponent } from './rejected/rejected.component';
import { ClosedComponent } from './closed/closed.component';
import { HoldComponent } from './hold/hold.component';
import { JobPostingComponent } from './job-posting/job-posting.component';
// import { AppModule } from '../app.module';
const appRoutes: Routes = [
	{
		path: 'all',
		component: JoblistComponent
	},
	{
		path: 'approved',
		component: ApprovedComponent
	},
	{
		path: 'rejected',
		component: RejectedComponent
	},
	{
		path: 'onhold',
		component: HoldComponent
	},
	{
		path: 'closed',
		component: ClosedComponent
	},
	{
		path: 'newPosting',
		component: JobPostingComponent
	}
];

@NgModule({
	schemas: [NO_ERRORS_SCHEMA],
	imports: [
		ReactiveFormsModule,
		AgGridModule.withComponents([]),
		FormsModule,
		NgxSpinnerModule,
		SimpleNotificationsModule.forRoot(),
		CommonModule, NgSelectModule,
		AngularMultiSelectModule,
		NgMultiSelectDropDownModule.forRoot(),
		RouterModule.forChild(appRoutes)
		// AppModule

	],
	providers: [
	],
	declarations: [JoblistComponent, SimpleTinyComponent, ApprovedComponent, RejectedComponent, ClosedComponent, HoldComponent, JobPostingComponent],
})
export class JobListModule { }
