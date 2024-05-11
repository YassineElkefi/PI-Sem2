import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

export const authGuard2: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  if (authService.isAuthenticated()) {
    router.navigate(['/']);
    return false;
  } else {
    return true;
  }
}

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (authService.isAuthenticated()){
    const userDataString = authService.getUser()
    if (userDataString){
      if (JSON.parse(userDataString).cin ="00000000"){
        router.navigate(["/admin/admin-dashboard"]);
        return false;
      }
    }
    return true;
  }else{
    router.navigate(['/auth/login']);
    return false;
  }
}
