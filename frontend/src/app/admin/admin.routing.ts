import { RouterModule, Routes } from "@angular/router";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";

const authRoutes: Routes = [
 { path: 'admin-dashboard', component: AdminDashboardComponent }
];

export const adminRouting = RouterModule.forChild(authRoutes);