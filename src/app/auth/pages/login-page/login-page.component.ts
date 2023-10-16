import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  public myform: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  login() {
    const email = this.myform.value.email;
    const password = this.myform.value.password;
    this.authService.login(email, password).subscribe({
      next: () => this.router.navigate(['/home']),
      error: (message) => {
        Swal.fire('Error', message, 'error');
      },
    });
  }
}
