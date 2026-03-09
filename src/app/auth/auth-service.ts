import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MsalService } from '@azure/msal-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private fullUrl = environment.apiBaseUrl;
  private httpClient = inject(HttpClient);
  private msalService = inject(MsalService);

  login() {
  return this.msalService.loginPopup({
    scopes: ['api://b1e2e9be-44cb-4659-bb52-74194a2e6089']
  });
}

  refreshToken(refreshToken: string): Observable<any> {
    return this.httpClient.post(`${this.fullUrl}/api/v1/auth/refresh`, { refreshToken });
  }
}
