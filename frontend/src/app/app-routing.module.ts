import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { CarpoolingHomeComponent } from './carpooling/carpooling-home/carpooling-home.component';
import { CarpoolingFiltersComponent } from './carpooling/carpooling-filters/carpooling-filters.component';
import { DeliveryHomeComponent } from './delivery/delivery-home/delivery-home.component';

const routes: Routes = [
    {path:'', component:HomeComponent},
    {path:'About-us', component:AboutUsComponent},
    {path: 'Carpooling', component: CarpoolingHomeComponent},
    {path: 'delivery', component: DeliveryHomeComponent},
    {path: 'Auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
