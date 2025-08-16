import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import * as AuthActions from './auth/store/auth.actions';
import { isAuthenticated } from './auth/store/auth.selectors';
import { UserService } from './core/services/user.service';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { debounceTime, delay, map, of } from 'rxjs';
import { ReversePipe } from './pipes/reverse/reverse.pipe';
import { HighlightDirective } from './directives/highlight/highlight.directive';
import { Apollo } from 'apollo-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    ReactiveFormsModule,
    ReversePipe,
    HighlightDirective,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private fb = inject(FormBuilder);
  public loginForm!: FormGroup;
  private store = inject(Store);
  private userService = inject(UserService);
  private apollo = inject(Apollo);

  get isLoggedIn$() {
    return this.store.select(isAuthenticated);
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [
        'admin',
        [Validators.required],
        [this.usernameASYNCValidator()],
      ],
      password: ['123456', [Validators.required]],
    });
  }

  usernameASYNCValidator(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      const forbiddenUsernames = ['test', 'root'];

      return of(control.value).pipe(
        debounceTime(300),
        delay(1000),
        map((username) => {
          return forbiddenUsernames.includes(username)
            ? { usernameTaken: true }
            : null;
        })
      );
    };
  }

  login() {
    this.store.dispatch(AuthActions.login(this.loginForm.value));
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
