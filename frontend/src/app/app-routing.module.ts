import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { CarpoolingHomeComponent } from './carpooling/carpooling-home/carpooling-home.component';
import { CarpoolingFiltersComponent } from './carpooling/carpooling-filters/carpooling-filters.component';

const routes: Routes = [
    {path:'Home', component:HomeComponent},
    {path:'Delivery', component:DeliveryComponent},
    {path:'About-us', component:AboutUsComponent},
    {path: 'carpoolings', component: CarpoolingHomeComponent},
    {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
