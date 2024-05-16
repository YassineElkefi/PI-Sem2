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
    
    return true;
  }else{
    router.navigate(['/auth/login']);
    return false;
  }
}

export const authGuard3: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (authService.isAuthenticated()) {
    const userData = authService.getUser(); // Directly get the user data object
    console.log("userData:", userData);

    if (userData) {
      const { cin } = userData; // Assuming "cin" is a direct property of userData
      if (cin === "00000000") {
        return true; // Allow access to the admin dashboard
      } else {
        router.navigate(['/']); // Redirect to another page if "cin" is not "00000000"
        return false;
      }
    } else {
      router.navigate(['/']); // Redirect to another page if userData is empty
      return false;
    }
  } else {
    router.navigate(['/auth/login']); // Redirect to the login page if not authenticated
    return false;
  }
}
