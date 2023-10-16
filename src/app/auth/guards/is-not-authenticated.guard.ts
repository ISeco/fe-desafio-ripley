import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStatus } from '../interfaces';

export const isNotAuthenticatedGuard: CanActivateFn = (_route, __state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (authService.authStatus() === AuthStatus.Authenticated) {
    router.navigateByUrl('/home');
    return false;
  }

  return true;
};
