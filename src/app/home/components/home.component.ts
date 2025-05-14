import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../auth/store/auth.actions';
import { isAuthenticated } from '../../auth/store/auth.selectors';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  users: any[] = [];

  get isLoggedIn$() {
    return this.store.select(isAuthenticated);
  }

  constructor(private store: Store, private http: HttpClient) {}

  login() {
    this.store.dispatch(
      AuthActions.login({ username: 'admin', password: '123456' })
    );
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }

  getData() {
    this.http.get('http://localhost:8080/protected/data').subscribe(
      (data) => {
        // Handle successful login
        console.log(data);
      },
      (error) => {
        // Handle error, e.g. show an error message
        console.error('Login failed', error);
      }
    );
  }
}
