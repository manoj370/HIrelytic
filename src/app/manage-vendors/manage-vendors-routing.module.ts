import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InviteVendorComponent } from './invite-vendor/invite-vendor.component';
import { ViewvendorComponent } from './viewvendor/viewvendor.component';
import { VendorDashboardComponent } from './vendor-dashboard/vendor-dashboard.component';

const routes: Routes = [
  {
    path: 'manageVendors', component: InviteVendorComponent
  },
  {
    path: 'viewVendor', component: ViewvendorComponent
  },
  {
    path: 'vendor-dashboard', component: VendorDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageVendorsRoutingModule { }
