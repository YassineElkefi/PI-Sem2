import { RouterModule, Routes } from "@angular/router";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";

const authRoutes: Routes = [
 { path: 'register', component: RegisterComponent },
 { path: 'login', component: LoginComponent}
];

export const authRouting = RouterModule.forChild(authRoutes);