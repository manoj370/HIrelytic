import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageClientsRoutingModule } from './manage-clients-routing.module';
import { SimpleNotificationsModule, NotificationsService } from 'angular2-notifications';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AgGridModule } from 'ag-grid-angular';
import { AddClientComponent } from '../manage-clients/add-client/add-client.component';
import { ClientcreationComponent } from '../../../src/app/manage-clients/clientcreation/clientcreation.component';
import { ViewClientComponent } from './view-client/view-client.component';
@NgModule({
  imports: [
    CommonModule,
    ManageClientsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SimpleNotificationsModule.forRoot(),
    NgxSpinnerModule,
    AgGridModule.withComponents([]),
  ],
  declarations: [ClientcreationComponent, AddClientComponent, ViewClientComponent]
})
export class ManageClientsModule { }
