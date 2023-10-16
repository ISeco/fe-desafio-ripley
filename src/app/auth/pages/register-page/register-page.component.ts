import { Router } from '@angular/router';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';
import { PasswordSecurityService } from '../../services/password-security.service';

@Component({
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private passwordSecurityService = inject(PasswordSecurityService);

  public myform: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(this.passwordSecurityService.regExp)]],
  });

  showPassword () {
    this.passwordSecurityService.onShowPassword();
  }

  currentCheckColor(validExp: boolean): string {
    if (validExp) return "color: #2ECC71;";
    return "color: gray;";
  }

  hasUpperCase(): string {
    const validExp = this.passwordSecurityService.hasUpperCase(this.myform.value.password);
    return this.currentCheckColor(validExp);
  }

  hasLowerCase(): string {
    const validExp = this.passwordSecurityService.hasLowerCase(this.myform.value.password);
    return this.currentCheckColor(validExp);
  }

  hasNumber(): string {
    const validExp = this.passwordSecurityService.hasNumber(this.myform.value.password);
    return this.currentCheckColor(validExp);
  }

  hasSpecialCharacter(): string {
    const validExp = this.passwordSecurityService.hasSpecialCharacter(this.myform.value.password);
    return this.currentCheckColor(validExp);
  }

  hasMinLength(): string {
    const validExp = this.passwordSecurityService.hasMinLength(this.myform.value.password);
    return this.currentCheckColor(validExp);
  }

  register() {
    const name = this.myform.value.name;
    const email = this.myform.value.email;
    const password = this.myform.value.password;
    this.authService.register(name, email, password).subscribe({
      next: () => {
        Swal.fire('Success', 'User created successfully', 'success')
          .then(() => this.router.navigate(['/auth/login']));
      },
      error: (message) => {
        Swal.fire('Error', message, 'error');
      },
    });
  }
}
