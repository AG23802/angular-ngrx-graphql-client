import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private fullUrl = environment.apiBaseUrl;
  private httpClient = inject(HttpClient);

  login(username: string, password: string): Observable<any> {
    return this.httpClient
      .post(`${this.fullUrl}/api/v1/auth/login`, { username, password });
  }

  refreshToken(refreshToken: string): Observable<any> {
    return this.httpClient.post(`${this.fullUrl}/api/v1/auth/refresh`, { refreshToken });
  }
}
