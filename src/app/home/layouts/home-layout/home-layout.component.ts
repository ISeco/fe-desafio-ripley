import { Component, computed, inject } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.css']
})
export class HomeLayoutComponent {

  private userService = inject(AuthService);
  public user = computed(() => this.userService.currentUser());

  logout(): void {
    this.userService.logout();
  }
}
