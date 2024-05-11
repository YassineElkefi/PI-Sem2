import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { adminRouting } from './admin.routing';
import { UsersComplaintsComponent } from './users-complaints/users-complaints.component';
import { CardsComponent } from './cards/cards.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { ChartModule } from 'primeng/chart';
import { ComplaintDetailsComponent } from './complaint-details/complaint-details.component';
import { CardModule } from 'primeng/card';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    UsersComplaintsComponent,
    CardsComponent,
    PieChartComponent,
    ComplaintDetailsComponent,

  ],
  imports: [
    CommonModule,
    adminRouting,
    ButtonModule,
    TableModule,
    ChartModule,
    CardModule

  ]
})
export class AdminModule { }
