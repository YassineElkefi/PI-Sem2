import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { adminRouting } from './admin.routing';
import { UsersComplaintsComponent } from './users-complaints/users-complaints.component';
import { CardComponent } from './card/card.component';
import { CardsComponent } from './cards/cards.component';



@NgModule({
  declarations: [
    AdminDashboardComponent,
    UsersComplaintsComponent,
    CardComponent,
    CardsComponent,

  ],
  imports: [
    CommonModule,
    adminRouting,

  ]
})
export class AdminModule { }
