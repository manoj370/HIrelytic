import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientcreationComponent } from './clientcreation/clientcreation.component';
import { AddClientComponent } from './add-client/add-client.component';
import { ViewClientComponent } from './view-client/view-client.component';


const routes: Routes = [
  { path: 'manageClients', component: ClientcreationComponent },
  { path: 'addClient', component: AddClientComponent },
  {path : 'viewClient', component : ViewClientComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageClientsRoutingModule { }
