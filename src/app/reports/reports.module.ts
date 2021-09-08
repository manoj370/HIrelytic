import { NgModule } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { CommonModule } from '@angular/common';
import { ReportsRoutingModule } from './reports-routing.module';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { PerformanceMetricsComponent } from './performance-metrics/performance-metrics.component';
import { RecruitementreportsComponent } from './recruitementreports/recruitementreports.component';
import { JoineesReportComponent } from './joinees-report/joinees-report.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReportsRoutingModule,
    AgGridModule.withComponents([]),
    NgxDaterangepickerMd.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [PerformanceMetricsComponent, RecruitementreportsComponent, JoineesReportComponent]
})
export class ReportsModule { }
