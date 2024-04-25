import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarpoolingHomeComponent } from './carpooling/carpooling-home/carpooling-home.component';
import { CarpoolingFiltersComponent } from './carpooling/carpooling-filters/carpooling-filters.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  {path: 'Carpooling', component: CarpoolingHomeComponent, canActivate: [authGuard]},
  {path: 'Auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
