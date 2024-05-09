import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { CarpoolingHomeComponent } from './carpooling/carpooling-home/carpooling-home.component';
import { authGuard } from './auth.guard';
import { DeliveryHomeComponent } from './delivery/delivery-home/delivery-home.component';
import { ProfileManagementComponent } from './profile-management/profile-management.component';

const routes: Routes = [
  {path: 'carpooling', component: CarpoolingHomeComponent,},
  {path: 'profile/:_id', component: ProfileManagementComponent, canActivate: [authGuard]},
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)},
  {path:'', component:HomeComponent},
  {path:'delivery', component:DeliveryHomeComponent},
  {path:'about-us', component:AboutUsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
