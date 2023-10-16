import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, throwError, of } from 'rxjs';
import { Injectable, computed, inject, signal } from '@angular/core';

import { environments } from 'src/environments/environments';
import { AuthStatus, LoginResponse, User, CheckTokenResponse } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environments.baseUrl;
  private http = inject( HttpClient );

  private _currentUser = signal<User|null>(null);
  private _isAuthenticated = signal<AuthStatus>( AuthStatus.Checking );

  public currentUser = computed( () => this._currentUser() );
  public authStatus = computed( () => this._isAuthenticated() );

  constructor() {
    this.checkAuthStatus().subscribe();
  }

  private setAuthentication (user: User, token: string): boolean {
    this._currentUser.set(user);
    this._isAuthenticated.set(AuthStatus.Authenticated);
    localStorage.setItem('token', token);

    return true;
  }

  login(email: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/auth/login`;
    const headers = { email, password };

    return this.http.get<LoginResponse>(url, { headers })
      .pipe(
        map(({ user, token }) => this.setAuthentication(user, token)),
        catchError((err) => throwError(() => err.error.message))
      );
  }

  register(name: string, email: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/auth/register`;
    const body = { name, email, password };

    return this.http.post<LoginResponse>(url, body)
      .pipe(
        map(() => true),
        catchError((err) => throwError(() => err.error.message))
      );
  }

  checkAuthStatus(): Observable<boolean> {
    const url = `${this.baseUrl}/auth/validate`;
    const token = localStorage.getItem('token');

    if (!token) {
      this.logout();
      return of(false);
    }

    return this.http.get<CheckTokenResponse>(url, { headers: { token } })
      .pipe(
        map(({ user, token }) => this.setAuthentication(user, token)),
        catchError(() => {
          this._isAuthenticated.set(AuthStatus.NotAuthenticated);
          return of(false);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this._currentUser.set(null);
    this._isAuthenticated.set(AuthStatus.NotAuthenticated);
  }
}
