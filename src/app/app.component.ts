import { Router } from '@angular/router';
import { Component, computed, effect, inject } from '@angular/core';

import { AuthStatus } from './auth/interfaces';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  private router = inject( Router );
  private authService = inject( AuthService );
  
  public finishedLoading = computed<boolean>( () => {
    if ( this.authService.authStatus() ===  AuthStatus.Checking) {
      return false;
    }
    return true;
  });

  public authStatusChangeEffect = effect(() => {
    switch (this.authService.authStatus()) {
      case AuthStatus.Authenticated:
        this.router.navigateByUrl('/home');
        return;
      case AuthStatus.NotAuthenticated:
        this.router.navigateByUrl('/auth/login');
        return;
      case AuthStatus.Checking:
        return;
    }
  });
}
