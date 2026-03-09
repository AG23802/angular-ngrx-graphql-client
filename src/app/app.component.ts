import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
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
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { debounceTime, delay, map, of, Subject, switchMap, tap } from 'rxjs';
import { ReversePipe } from './pipes/reverse/reverse.pipe';
import { HighlightDirective } from './directives/highlight/highlight.directive';
import { Apollo } from 'apollo-angular';
import { Observable } from '@apollo/client/utilities';

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

  searchContorl = this.fb.control('');

  public val = signal(10);

  get isLoggedIn$() {
    return this.store.select(isAuthenticated);
  }

  myEff = effect(() => {
    // console.log('Current val signal value:', this.val());
  });

  ngOnInit(): void {
    this.searchContorl.valueChanges
      .pipe(
        debounceTime(300),
        tap((value) => console.log('Debounced Value:', value)),
        switchMap((value) =>
          of(value).pipe(
            delay(2000) // Simulate async operation like an HTTP request
          )
        )
      )
      .subscribe({
        next: (finalValue) =>
          console.log('Final Value after async operation:', finalValue),
        error: (err) =>
          console.error('Error in search control valueChanges:', err),
        complete: () =>
          console.log('Completed processing search control valueChanges'),
      });

    this.loginForm = this.fb.group({
      username: [
        'admin',
        [Validators.required, this.noSpaceValidator],
        [this.usernameASYNCValidator()],
      ],
      password: ['123456', [Validators.required]],
    });
  }

  noSpaceValidator(control: AbstractControl): ValidationErrors | null {
    if (control.value && control.value.indexOf(' ') >= 0) {
      return { noSpace: true };
    }

    return null;
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

  async getData() {
    const result = await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('Promise Resolved!');
      }, 1500);

      // reject('Promise Rejected!');
    });

    // console.log(result);

    // const myPromise = new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve('Promise Resolved!');
    //   }, 1500);

    //   // reject('Promise Rejected!');
    // });

    // myPromise.then(
    //   (res) => console.log(res),
    //   (err) => console.error(err)
    // );

    this.val.update((v) => v + 1);

    // this.userService.getData().subscribe(
    //   (data) => {
    //     // Handle successful login
    //     console.log(data);
    //   },
    //   (error) => {
    //     // Handle error, e.g. show an error message
    //     console.error('Login failed', error);
    //   }
    // );

    const obs$ = new Observable((sub) => {
      console.log('Observable executed');
      sub.next(Math.random());
    });

    // obs$.subscribe((val) => console.log('Sub1:', val));
    // obs$.subscribe((val) => console.log('Sub2:', val));




const subject = new Subject<number>();

subject.subscribe(val => console.log('Sub1:', val));
subject.subscribe(val => console.log('Sub2:', val));

subject.next(1);
subject.next(2);
  }
}
