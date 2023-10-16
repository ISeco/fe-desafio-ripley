import { Injectable, computed, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PasswordSecurityService {

  public showPassword: boolean = false;

  constructor() { }

  public readonly regExp = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;

  onShowPassword() {
    this.showPassword = !this.showPassword;
  }

  hasUpperCase(password: string) {
    return /[A-Z]/.test(password);
  }

  hasLowerCase(password: string) {
    return /[a-z]/.test(password);
  }

  hasNumber(password: string) {
    return /\d/.test(password);
  }

  hasSpecialCharacter(password: string) {
    return /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);
  }

  hasMinLength(password: string) {
    return password.length >= 8;
  }

  validatePassword(password: string) {
    return this.regExp.test(password);
  }
}
