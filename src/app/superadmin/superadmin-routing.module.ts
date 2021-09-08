import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { SuperAdminComponent } from './super-admin/super-admin.component';
// import { ProfileComponent } from './profile/profile.component';
import { ManagedemosComponent } from './managedemos/managedemos.component';
import { UpdateTenantComponent } from './update-tenant/update-tenant.component';
import { FullComponent } from '../layouts/full/full.component';

export const SuperAdminroutes: Routes = [
    { path: 'Tenants', component: SuperAdminComponent },
    { path: 'managedemos', component: ManagedemosComponent },
    { path: 'updateSubscription', component: UpdateTenantComponent },
    // { path: 'profile', component: ProfileComponent }

];
@NgModule({
    imports: [RouterModule.forChild(SuperAdminroutes)],
    exports: [RouterModule]
})
export class SuperAdminRoutingModule { }
export const superAdminroutingComp = [SuperAdminComponent, ManagedemosComponent, UpdateTenantComponent
]
