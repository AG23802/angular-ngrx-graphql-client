import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { API_URL } from '../../core/tokens/api-url.token';  // Import your token here
import { Store } from '@ngrx/store';
import * as AuthActions from '../../auth/store/auth.actions';
import { isAuthenticated } from '../../auth/store/auth.selectors';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  providers: [
    { provide: API_URL, useValue: 'https://my-custom-api.com' } // Providing the token with a custom value
  ]
})
export class HomeComponent {
  get isLoggedIn$() {
    return this.store.select(isAuthenticated);
  }

  users: any[] = [];

  apiURL = inject(API_URL);

  constructor(
    private store: Store,
    private http: HttpClient
  ) { }

  ngOnInit() {
    console.log('API URL:', this.apiURL);  // Log the injected API URL
  }

  login() {
    this.store.dispatch(
      AuthActions.login({ username: 'admin', password: '123456' })
    );
  }

  logout() {
    this.store.dispatch(
      AuthActions.logout()
    );
  }

  getData() {
    this.http.get('http://localhost:8080/protected/data').subscribe(
      (data) => {
        // Handle successful login
        console.log(data);
      },
      (error) => {
        // Handle error, e.g. show an error message
        console.error("Login failed", error);
      })
  }
}
