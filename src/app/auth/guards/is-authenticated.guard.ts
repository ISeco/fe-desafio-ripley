import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces';

export const isAuthenticatedGuard: CanActivateFn = (_route, __state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (authService.authStatus() === AuthStatus.Authenticated) return true;

  if (authService.authStatus() === AuthStatus.Checking) return false;

  // const url = state.url;
  // localStorage.setItem('url', url);
  router.navigateByUrl('/auth/login');
  return false;
};
