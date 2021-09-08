import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerformanceMetricsComponent } from './performance-metrics/performance-metrics.component';
import { RecruitementreportsComponent } from './recruitementreports/recruitementreports.component';
import { JoineesReportComponent } from './joinees-report/joinees-report.component';

const routes: Routes = [
  {
    path: 'performance-metrics', component: PerformanceMetricsComponent
  }, {
    path: 'recruitment-reports', component: RecruitementreportsComponent
  }, {
    path: 'joinees-reports', component: JoineesReportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
