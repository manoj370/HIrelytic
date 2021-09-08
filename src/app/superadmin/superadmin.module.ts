import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SuperAdminRoutingModule, superAdminroutingComp } from './superadmin-routing.module';


@NgModule({
    imports: [
        ReactiveFormsModule,
        AgGridModule.withComponents([]),
        FormsModule,
        CommonModule,
        SuperAdminRoutingModule,
        CommonModule,
       
    ],
    providers: [
    ],
    declarations: [superAdminroutingComp],
})
export class SuperAdminModule { }
