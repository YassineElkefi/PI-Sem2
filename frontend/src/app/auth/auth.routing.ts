import { RouterModule, Routes } from "@angular/router";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";

const authRoutes: Routes = [
 { path: 'Register', component: RegisterComponent },
 { path: 'Login', component: LoginComponent}
];

export const authRouting = RouterModule.forChild(authRoutes);