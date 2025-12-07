import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8081/api';
  private tokenKey = 'admin_auth_token';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/auth/login`, credentials).pipe(
      tap(response => {
        if (response && response.jwt) {
          localStorage.setItem(this.tokenKey, response.jwt);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  getConnectedUser(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/admins/me`, { headers: this.getAuthHeaders() });
  }

  changePassword(passwordData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/change-password`, passwordData, { headers: this.getAuthHeaders() });
  }

  updateAdmin(id: number, adminData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/admins/${id}`, adminData, { headers: this.getAuthHeaders() });
  }
}
