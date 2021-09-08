import { NgModule } from '@angular/core';
import { AuthGuard } from './auth.guard';
import { RolesComponent } from './roles/roles.component';
import { Routes, RouterModule } from '@angular/router';
import { ReportComponent } from './report/report.component';
import { VendorComponent } from './vendor/vendor.component';
import { FullComponent } from './layouts/full/full.component';
// import { SuccessComponent } from './success/success.component';
// import { ClosejobComponent } from './closejob/closejob.component';
import { SampleComponent } from './layouts/sample/sample.component';
import { DashboardComponent } from './dashboard/dashboard.component';
// import { ReferralComponent } from './employee/referral/referral.component';
// import { AddClientComponent } from './add-client/add-client.component';
// import { OnlineexamComponent } from './onlineexam/onlineexam.component';
// import { ViewvendorComponent } from './viewvendor/viewvendor.component';
// import { AppliedjobComponent } from './appliedjob/appliedjob.component';
import { TenantFormComponent } from './tenant-form/tenant-form.component';
// import { SuperAdminComponent } from './superadmin/super-admin/super-admin.component';
// import { ManagedemosComponent } from './superadmin/managedemos/managedemos.component';
// import { ViewClientComponent } from './view-client/view-client.component';
import { IncentivesComponent } from '../app/incentives/incentives.component';
import { TenantLoginComponent } from './tenant-login/tenant-login.component';
// import { RequestDemoComponent } from './request-demo/request-demo.component';
// import { InviteVendorComponent } from './invite-vendor/invite-vendor.component';
// import { LoginSuccessComponent } from './login-success/login-success.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { ResetPassowrdComponent } from './resetpassword/resetpassword.component';
import { ResumedetailsComponent } from './resumedetails/resumedetails.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TenantProfileComponent } from './tenant-profile/tenant-profile.component';
// import { ClientcreationComponent } from './clientcreation/clientcreation.component';
// import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
// import { TenantRegisterComponent } from './tenant-register/tenant-register.component';
// import { ApproveJobpostComponent } from './approve-jobpost/approve-jobpost.component';
// import { ScheduleinterviewComponent } from './scheduleinterview/scheduleinterview.component';
import { CandidatesdatabaseComponent } from '../app/candidatesdatabase/candidatesdatabase.component';
import { SpinnerComponent } from './shared/spinner.component';
// import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component';
// import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { NavigationComponent } from './shared/header-navigation/navigation.component';
import { RefferalUpdateComponent } from './refferal-update/refferal-update.component';
import { ReferJobComponent } from './refer-job/refer-job.component';
import { EmployeeregisterComponent } from './employeeregister/employeeregister.component';
// import { UpdateTenantComponent } from './superadmin/update-tenant/update-tenant.component';

export const Approutes: Routes = [
    // {
    //     path: '',
    //     redirectTo: 'login',
    //     pathMatch: 'full'
    // },
    {
        path: 'inviteUser/UserRegister',
        component: UserRegisterComponent,
    },

    {
        path: 'resetToken/:id',
        component: ResetPassowrdComponent,
    },
    {
        path: 'inviteEmployee/EmployeeRegister',
        component: EmployeeregisterComponent,
    },
    {
        path: 'uploadResume',
        component: ResumedetailsComponent,
    },
    {
        path: 'login',
        component: TenantLoginComponent
    },
    {
        path: 'home',
        component: SampleComponent
    },
    // {
    //     path: 'tenant-register',
    //     component: TenantRegisterComponent
    // },
    {
        path: 'tenant/registration',
        component: TenantFormComponent
    },
    {
        path: 'inviteVendor/VendorRegister',
        component: VendorComponent
    },
    // {
    //     path: 'requestForDemo',
    //     component: RequestDemoComponent
    // },
    // { path: 'forgotpassword', component: ForgotpasswordComponent },


    {
        path: '',
        component: FullComponent,
        canActivate: [AuthGuard],
        children: [
            // { path: '', redirectTo: '/home', pathMatch: 'full', canActivate: [AuthGuard] },
            // { path: 'starter', loadChildren: './starter/starter.module#StarterModule', canActivate: [AuthGuard] },
            // { path: 'userDetails', loadChildren: './userdetails/userdetails.module#UserDetailsModule', canActivate: [AuthGuard] },
            // { path: 'manageCandidates', loadChildren: './refer-job/refer-job.module#ReferJobModule', canActivate: [AuthGuard] },
            { path: 'superAdmin', loadChildren: './superadmin/superadmin.module#SuperAdminModule', canActivate: [AuthGuard] },

            { path: 'manageJobs', loadChildren: './joblist/joblist.module#JobListModule', canActivate: [AuthGuard] },
            // { path: 'inviteuser', loadChildren: './inviteuser/inviteuser.module#InviteUserModule', canActivate: [AuthGuard] },
            // { path: 'component', loadChildren: './component/component.module#ComponentsModule', canActivate: [AuthGuard] },
            // { path: 'onlineTest', loadChildren: './Upload-Questions/uploadquestions.module#UploadModule', canActivate: [AuthGuard] },
            { path: 'profile', component: TenantProfileComponent, canActivate: [AuthGuard] },
            // { path: 'manageInterview', component: ScheduleinterviewComponent, canActivate: [AuthGuard] },
            { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
            { path: 'manageCandidates', component: ReferJobComponent, canActivate: [AuthGuard] },

            // { path: 'manageClients', component: ClientcreationComponent, canActivate: [AuthGuard] },
            { path: 'manageUsers', component: RolesComponent, canActivate: [AuthGuard] },
            // { path: 'addClient', component: AddClientComponent, canActivate: [AuthGuard] },
            // { path: 'viewClient', component: ViewClientComponent, canActivate: [AuthGuard] },



            {
                path: 'refer',
                loadChildren: './employee/employee.module#EmployeeModule', canActivate: [AuthGuard]
            },

            {
                path: 'referUpdate',
                component: RefferalUpdateComponent, canActivate: [AuthGuard]
            },
            {
                path: 'candidatesDatabase',
                component: CandidatesdatabaseComponent, canActivate: [AuthGuard]
            },
            {
                path: 'incentives',
                component: IncentivesComponent, canActivate: [AuthGuard]
            },
            // { path: 'manageVendors', component: InviteVendorComponent, },

            // { path: 'viewvendor', component: ViewvendorComponent, canActivate: [AuthGuard] },
            // { path: 'managetenants', component: SuperAdminComponent, canActivate: [AuthGuard] },
            // { path: 'managedemos', component: ManagedemosComponent, canActivate: [AuthGuard] },
            // { path: 'updatetenants', component: UpdateTenantComponent, canActivate: [AuthGuard] },

            {
                path: 'reports',
                component: ReportComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'manage-reports',
                loadChildren: './reports/reports.module#ReportsModule',
                canActivate: [AuthGuard]
            },
            {
                path: 'manage-clients',
                loadChildren: './manage-clients/manage-clients.module#ManageClientsModule',
                canActivate: [AuthGuard]
            },
            {
                path: 'manage-vendors',
                loadChildren: './manage-vendors/manage-vendors.module#ManageVendorsModule',
                canActivate: [AuthGuard]
            },
            {
                path: 'pagenotfound',
                component: PageNotFoundComponent, canActivate: [AuthGuard]
            },
            // { path: 'manageEvents', component: ManageEventsComponent, canActivate: [AuthGuard] },
            // { path: 'jobApprove', component: ApproveJobpostComponent, canActivate: [AuthGuard] },
            // { path: '**', redirectTo: '/home', canActivate: [AuthGuard] }
        ]
    },
    // { path: '**', redirectTo: 'login' },

];
@NgModule({
    imports: [RouterModule.forRoot(Approutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComp = [SampleComponent, UserRegisterComponent, ResetPassowrdComponent, ResumedetailsComponent,
    TenantLoginComponent,  TenantFormComponent, VendorComponent,
    TenantProfileComponent, DashboardComponent, RolesComponent,
   CandidatesdatabaseComponent,  IncentivesComponent,
     SpinnerComponent, ReferJobComponent,
    PageNotFoundComponent, FullComponent, ReportComponent,  EmployeeregisterComponent,
    NavigationComponent
]
export const routing = RouterModule.forRoot(Approutes, { scrollPositionRestoration: 'enabled' });
// AddClientComponent
