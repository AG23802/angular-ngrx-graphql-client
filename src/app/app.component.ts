import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import * as AuthActions from './auth/store/auth.actions';
import { isAuthenticated } from './auth/store/auth.selectors';
import { UserService } from './core/services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  get isLoggedIn$() {
    return this.store.select(isAuthenticated);
  }

  constructor(private store: Store, private userService: UserService) {}

  login() {
    this.store.dispatch(
      AuthActions.login({ username: 'admin', password: '123456' })
    );
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }

  getData() {
    this.userService.getData().subscribe(
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
